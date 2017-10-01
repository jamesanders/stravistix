export class ActivityStravaMapTypeModifier implements IModifier {

    protected mapType: string;

    constructor(mapType: string) {
        this.mapType = mapType;
    }

    public modify(): void {

        if (this.mapType === "terrain") {
            return;
        }

        const mapGoal = this.mapType;

        setInterval(() => {
            $("a.map-type-selector[data-map-type-id=" + mapGoal + "]")
                .not(".once-only")
                .addClass("once-only")
                .click()
                .parents(".drop-down-menu") // Close menu
                .click();
        }, 750);
    }
}
