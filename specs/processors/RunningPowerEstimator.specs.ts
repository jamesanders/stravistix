import * as _ from "lodash";
import {RunningPowerEstimator} from "../../plugin/core/scripts/processors/RunningPowerEstimator";
import {IActivityStatsMap, IActivityStream, IAnalysisData} from "../../plugin/common/scripts/interfaces/IActivityData";
import {IUserSettings} from "../../plugin/common/scripts/interfaces/IUserSettings";
import {ActivityComputer} from "../../plugin/core/scripts/processors/ActivityComputer";
import {Helper} from "../../plugin/common/scripts/Helper";

describe("RunningPowerEstimator", () => {

    const WATTS_TOLERANCE: number = 35.5; // W

    it("estimateRunningPower should provide a consistency average power compared to " +
        "real running power meter (based on https://www.strava.com/activities/874762067)", () => {
        // Given
        const weightKg = 54.32; // Kg
        const meters = 6.9 * 1000; // 6.9 km
        const totalSeconds = Helper.HHMMSStoSeconds("00:39:48");

        const elevationGain = 25;
        const _expectedAvgPower = 151;
        let power = RunningPowerEstimator.estimateRunningPower(weightKg, meters, totalSeconds, elevationGain);

        // Then
        expect(power).toBeGreaterThanOrEqual(_expectedAvgPower - WATTS_TOLERANCE);
        expect(power).toBeLessThanOrEqual(_expectedAvgPower + WATTS_TOLERANCE);
    });

    it("estimateRunningPower should provide a consistency average power compared to " +
        "real running power meter (based on https://www.strava.com/activities/852961332)", () => {
        // Given
        const weightKg = 79.4; // Kg
        const meters = 12.8 * 1000;
        const totalSeconds = Helper.HHMMSStoSeconds("01:02:25");
        const elevationGain = 0;


        const _expectedAvgPower = 287;

        // When
        let power = RunningPowerEstimator.estimateRunningPower(weightKg, meters, totalSeconds, elevationGain);
        // Then
        expect(power).toBeGreaterThanOrEqual(_expectedAvgPower - WATTS_TOLERANCE);
        expect(power).toBeLessThanOrEqual(_expectedAvgPower + WATTS_TOLERANCE);
    });

    // When

    it("estimateRunningPower should provide a consistency average power compared to " +
        "real running power meter (based on https://www.strava.com/activities/878683797)", () => {
        // Given
        const weightKg = 79.4; // Kg
        const meters = 15.7 * 1000;
        const totalSeconds = Helper.HHMMSStoSeconds("01:14:52");
        const elevationGain = 148;

        const _expectedAvgPower = 296;

        // When
        let power = RunningPowerEstimator.estimateRunningPower(weightKg, meters, totalSeconds, elevationGain);
        // Then
        expect(power).toBeGreaterThanOrEqual(_expectedAvgPower - WATTS_TOLERANCE);
        expect(power).toBeLessThanOrEqual(_expectedAvgPower + WATTS_TOLERANCE);
    });

    it("estimateRunningPower should provide a consistency average power compared to " +
        "real running power meter (based on https://www.strava.com/activities/849522984)", () => {
        // Given
        const weightKg = 68.94; // Kg
        const meters = 5.3 * 1000;
        const totalSeconds = Helper.HHMMSStoSeconds("00:30:22");
        const elevationGain = 64;


        const _expectedAvgPower = 214;

        // When
        let power = RunningPowerEstimator.estimateRunningPower(weightKg, meters, totalSeconds, elevationGain);
        // Then
        expect(power).toBeGreaterThanOrEqual(_expectedAvgPower - WATTS_TOLERANCE);
        expect(power).toBeLessThanOrEqual(_expectedAvgPower + WATTS_TOLERANCE);
    });

    it("estimateRunningPower should provide a consistency average power compared to " +
        "real running power meter (based on https://www.strava.com/activities/862889505)", () => {
        // Given
        const weightKg = 68.94; // Kg
        const meters = 7.5 * 1000;
        const totalSeconds = Helper.HHMMSStoSeconds("00:44:23");
        const elevationGain = 56;

        const _expectedAvgPower = 215;

        // When
        let power = RunningPowerEstimator.estimateRunningPower(weightKg, meters, totalSeconds, elevationGain);
        // Then
        expect(power).toBeGreaterThanOrEqual(_expectedAvgPower - WATTS_TOLERANCE);
        expect(power).toBeLessThanOrEqual(_expectedAvgPower + WATTS_TOLERANCE);
    });

    it("estimateRunningPower should provide a consistency average power compared to " +
        "real running power meter (based on https://www.strava.com/activities/791460353)", () => {
        // Given
        const weightKg = 81.61; // Kg
        const meters = 8.8 * 1000;
        const totalSeconds = Helper.HHMMSStoSeconds("00:41:14");
        const elevationGain = 32;

        const _expectedAvgPower = 285;

        // When
        let power = RunningPowerEstimator.estimateRunningPower(weightKg, meters, totalSeconds, elevationGain);
        // Then
        expect(power).toBeGreaterThanOrEqual(_expectedAvgPower - WATTS_TOLERANCE);
        expect(power).toBeLessThanOrEqual(_expectedAvgPower + WATTS_TOLERANCE);
    });


    it("createRunningPowerEstimationStream should provide " +
        "power stats estimations near real running power meter  (based on https://www.strava.com/activities/874762067)", () => {

        // Given
        const _expectedPower = 151; // Real Running Average Power = 151 W (From power meter)
        const athleteWeight = 54.32;
        let stream: IActivityStream = window.__fixtures__["fixtures/activities/874762067/stream"]; // Mikala run sample 1/2 NCNR Run Club

        // When
        let powerArray: number[] = RunningPowerEstimator.createRunningPowerEstimationStream(athleteWeight,
            stream.distance, stream.time, stream.altitude);
        let estimatedAvgPower: number = _.mean(powerArray);

        // Then
        expect(estimatedAvgPower).not.toBeNull();
        expect(estimatedAvgPower).toBeGreaterThanOrEqual((_expectedPower - WATTS_TOLERANCE));
        expect(estimatedAvgPower).toBeLessThanOrEqual((_expectedPower + WATTS_TOLERANCE));

    });

    it("createRunningPowerEstimationStream should provide " +
        "power stats estimations near real running power meter  (based on https://www.strava.com/activities/852961332)", () => {

        // Given
        const _expectedPower = 287;
        const athleteWeight = 79.4;
        let stream: IActivityStream = window.__fixtures__["fixtures/activities/852961332/stream"]; // Stryd 3/6 lap test .... brrr

        // When
        let powerArray: number[] = RunningPowerEstimator.createRunningPowerEstimationStream(athleteWeight, stream.distance,
            stream.time, stream.altitude);

        let estimatedAvgPower: number = _.mean(powerArray);

        // Then
        expect(estimatedAvgPower).not.toBeNull();
        expect(estimatedAvgPower).toBeGreaterThanOrEqual((_expectedPower - WATTS_TOLERANCE));
        expect(estimatedAvgPower).toBeLessThanOrEqual((_expectedPower + WATTS_TOLERANCE));
    });

    it("createRunningPowerEstimationStream should provide " +
        "power stats estimations near real running power meter" +
        "based on https://www.strava.com/activities/878683797", () => {

        // Given
        const _expectedPower = 296;
        const athleteWeight = 79.4;

        // Two shooting ranges and a road dedicated to the inventor of Velcro
        let stream: IActivityStream = window.__fixtures__["fixtures/activities/878683797/stream"];

        // When
        let powerArray: number[] = RunningPowerEstimator.createRunningPowerEstimationStream(athleteWeight, stream.distance,
            stream.time, stream.altitude);

        let estimatedAvgPower: number = _.mean(powerArray);

        // Then
        expect(estimatedAvgPower).not.toBeNull();
        expect(estimatedAvgPower).toBeGreaterThanOrEqual((_expectedPower - WATTS_TOLERANCE));
        expect(estimatedAvgPower).toBeLessThanOrEqual((_expectedPower + WATTS_TOLERANCE));
    });

    it("createRunningPowerEstimationStream should provide " +
        "power stats estimations near real running power meter" +
        "based on https://www.strava.com/activities/833008371", () => {

        // Given
        const _expectedPower = 310;
        const athleteWeight = 79.4;

        let stream: IActivityStream = window.__fixtures__["fixtures/activities/833008371/stream"]; // Morning Run

        // When
        let powerArray: number[] = RunningPowerEstimator.createRunningPowerEstimationStream(athleteWeight, stream.distance,
            stream.time, stream.altitude);

        let estimatedAvgPower: number = _.mean(powerArray);

        // Then
        expect(estimatedAvgPower).not.toBeNull();
        expect(estimatedAvgPower).toBeGreaterThanOrEqual((_expectedPower - WATTS_TOLERANCE));
        expect(estimatedAvgPower).toBeLessThanOrEqual((_expectedPower + WATTS_TOLERANCE));
    });

    // Running estimation test
    it("should compute correctly '1/2 NCNR Run Club' @ https://www.strava.com/activities/874762067", () => {

        // Given
        const _expectedPower = 151;
        const athleteWeight = 54.32;

        let stream: IActivityStream = window.__fixtures__["fixtures/activities/874762067/stream"];

        // When
        let powerArray: number[] = RunningPowerEstimator.createRunningPowerEstimationStream(athleteWeight, stream.distance,
            stream.time, stream.altitude);

        let estimatedAvgPower: number = _.mean(powerArray);

        // Then
        expect(estimatedAvgPower).not.toBeNull();
        expect(estimatedAvgPower).toBeGreaterThanOrEqual((_expectedPower - WATTS_TOLERANCE));
        expect(estimatedAvgPower).toBeLessThanOrEqual((_expectedPower + WATTS_TOLERANCE));

    });

    // Running power test
    it("should compute correctly 'Begin Running Ep 1 // Stade 40min' " +
        "@ https://www.strava.com/activities/887284960", () => {

        // Given
        const activityType = "Run";
        const isTrainer = false;
        const isActivityAuthor = true;
        const hasPowerMeter = false;
        const bounds: number[] = null;
        const returnZones = true;
        let userSettingsMock: IUserSettings = window.__fixtures__["fixtures/userSettings/2470979"]; // Thomas C user settings
        let stream: IActivityStream = window.__fixtures__["fixtures/activities/887284960/stream"];
        let statsMap: IActivityStatsMap = window.__fixtures__["fixtures/activities/887284960/statsMap"];

        // When
        let activityComputer: ActivityComputer = new ActivityComputer(activityType, isTrainer, userSettingsMock, userSettingsMock.userWeight,
            isActivityAuthor, hasPowerMeter, statsMap, stream, bounds, returnZones);
        
        let result: IAnalysisData = activityComputer.compute();

        // Then
        expect(result.powerData).not.toBeNull();

    });
});