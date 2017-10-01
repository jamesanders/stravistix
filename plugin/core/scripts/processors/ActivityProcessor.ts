import * as _ from "lodash";
import {IActivityStatsMap, IActivityStream, IAnalysisData} from "../../../common/scripts/interfaces/IActivityData";
import {IUserSettings} from "../../../common/scripts/interfaces/IUserSettings";
import {env} from "../../config/env";
import {IAppResources} from "../interfaces/IAppResources";
import {IComputeActivityThreadMessage} from "../interfaces/IComputeActivityThreadMessage";
import {VacuumProcessor} from "./VacuumProcessor";
import {ComputeAnalysisWorker} from "./workers/ComputeAnalysisWorker";

export class ActivityProcessor {

    public static cachePrefix: string = "stravistix_activity_";
    protected appResources: IAppResources;
    protected vacuumProcessor: VacuumProcessor;
    protected zones: any;
    protected activityType: string;
    protected isTrainer: boolean;
    private computeAnalysisWorkerBlobURL: string;
    private computeAnalysisThread: Worker;
    private userSettings: IUserSettings;

    constructor(appResources: IAppResources, vacuumProcessor: VacuumProcessor, userSettings: IUserSettings) {
        this.appResources = appResources;
        this.vacuumProcessor = vacuumProcessor;
        this.userSettings = userSettings;
        this.zones = this.userSettings.zones;
    }

    public setActivityType(activityType: string): void {
        this.activityType = activityType;
    }

    public setTrainer(isTrainer: boolean): void {
        if (isTrainer) {
            if (_.isBoolean(isTrainer)) {
                this.isTrainer = isTrainer;
            } else {
                console.error("isTrainer(boolean): required boolean param");
            }
        }
    }

    public getAnalysisData(activityId: number, bounds: number[], callback: (analysisData: IAnalysisData) => void): void {

        if (!this.activityType) {
            console.error("No activity type set for ActivityProcessor");
        }

        // We are not using cache when bounds are given
        let useCache: boolean = true;
        if (!_.isEmpty(bounds)) {
            useCache = false;
        }

        if (useCache) {
            // Find in cache first is data exist
            const cacheResult: IAnalysisData = JSON.parse(localStorage.getItem(ActivityProcessor.cachePrefix + activityId)) as IAnalysisData;

            if (!_.isNull(cacheResult) && env.useActivityStreamCache) {
                console.log("Using existing activity cache mode");
                callback(cacheResult);
                return;
            }
        }

        // Else no cache... then call VacuumProcessor for getting data, compute them and cache them
        this.vacuumProcessor.getActivityStream((activityStatsMap: IActivityStatsMap, activityStream: IActivityStream, athleteWeight: number, hasPowerMeter: boolean) => { // Get stream on page

            // Compute data in a background thread to avoid UI locking
            this.computeAnalysisThroughDedicatedThread(hasPowerMeter, athleteWeight, activityStatsMap, activityStream, bounds, (resultFromThread: IAnalysisData) => {

                callback(resultFromThread);

                // Cache the result from thread to localStorage
                if (useCache) {
                    console.log("Creating activity cache");
                    try {
                        localStorage.setItem(ActivityProcessor.cachePrefix + activityId, JSON.stringify(resultFromThread)); // Cache the result to local storage
                    } catch (err) {
                        console.warn(err);
                        localStorage.clear();
                    }
                }

            });

        });
    }

    protected computeAnalysisThroughDedicatedThread(hasPowerMeter: boolean, athleteWeight: number, activityStatsMap: IActivityStatsMap, activityStream: IActivityStream, bounds: number[], callback: (analysisData: IAnalysisData) => void): void {

        // Create worker blob URL if not exist
        if (!this.computeAnalysisWorkerBlobURL) {

            // Create a blob from 'ComputeAnalysisWorker' function variable as a string
            const blob: Blob = new Blob(["(", ComputeAnalysisWorker.toString(), ")()"], {type: "application/javascript"});

            // Keep track of blob URL to reuse it
            this.computeAnalysisWorkerBlobURL = URL.createObjectURL(blob);
        }

        // Lets create that worker/thread!
        this.computeAnalysisThread = new Worker(this.computeAnalysisWorkerBlobURL);

        // Send user and activity data to the thread
        // He will compute them in the background
        const threadMessage: IComputeActivityThreadMessage = {
            activityType: this.activityType,
            isTrainer: this.isTrainer,
            appResources: this.appResources,
            userSettings: this.userSettings,
            athleteWeight,
            hasPowerMeter,
            activityStatsMap,
            activityStream,
            bounds,
            returnZones: true,
            systemJsConfig: SystemJS.getConfig(),
        };

        this.computeAnalysisThread.postMessage(threadMessage);

        // Listen messages from thread. Thread will send to us the result of computation
        this.computeAnalysisThread.onmessage = (messageFromThread: MessageEvent) => {
            callback(messageFromThread.data);
            // Finish and kill thread
            this.computeAnalysisThread.terminate();
        };
    }
}
