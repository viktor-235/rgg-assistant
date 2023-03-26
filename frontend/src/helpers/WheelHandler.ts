/**
 * WheelHandler configuration. If any optional value is not specified then default value will be used.
 * 
 * @see {@link WheelHandler.DEFAULT_CONFIG} for default values.
 * 
 * @param onScroll - onScroll callback function.
 * @param afterLastScroll - afterLastScroll callback function.
 * @param {number} [windowSize] - The count of displayed items. 
 * @param {number} [duration] - The animation duration (milliseconds). Optional.
 * @param {number} [startInterval] - The initial time interval between wheel scrolls (milliseconds). Optional.
 * @param {number} [stopInterval] - The time interval between wheel scrolls in the end of animation duration (milliseconds). Optional.
 * @param [easingFunc] - The easing function to slow down animation tick by tick. See https://easings.net/ to select suitable easing function. Optional.
 */
export type Config<ItemType> = {
    onScroll: (window: ItemType[]) => void,
    afterLastScroll: () => void,
    windowSize: number,
    duration: number,
    startInterval: number,
    stopInterval: number
    easingFunc: (x: number) => number
}

/**
 * Class to handle wheel state and animation.
 * 
 * @typeParam ItemType - Type of wheel items.
 */
export class WheelHandler<ItemType> {
    public cfg: Config<ItemType>

    private _items: ItemType[] = []
    private _itemCount: number = 0
    private _index: number = 0

    private _startTime: number = 0
    private _currentInterval: number = 0

    private _timer: NodeJS.Timer | undefined

    /**
     * Default WheelHandler configuration.
     */
    private DEFAULT_CONFIG: Config<ItemType> = {
        onScroll: function (window: ItemType[]): void {
            throw new Error("Function not implemented.")
        },
        afterLastScroll: function (): void {
            throw new Error("Function not implemented.")
        },
        windowSize: 5,
        duration: 20000 + Math.floor(Math.random() * 3000),
        startInterval: 30,
        stopInterval: 2500,
        easingFunc: EeasingFunctions.easeInQuart
    };

    /**
     * Wheel handler constructor.
     * 
     * @constructor
     * @param {Object} config - See {@link Config} diffenition.
     */
    constructor(config: Partial<Config<ItemType>>) {
        this.cfg = { ...this.DEFAULT_CONFIG, ...config }
    }

    /**
     * Starts wheel animation.
     * 
     * @param {ItemType[]} items - The list of wheel items.
     */
    start(items: ItemType[]) {
        this._items = items
        this._itemCount = items.length

        this._startTime = Date.now()
        this._currentInterval = this.cfg.startInterval

        this.cfg.onScroll(this.getWindow())

        this._timer = setInterval(() => { this.tick() }, this.currentInterval)
    }

    /**
     * Stops wheel animation.
     */
    stop() {
        clearInterval(this._timer);
    }

    /**
     * This method is called every tick of the animation.
     * 
     * This is where the new wheel window elements and the new timer interval are calculated. Also here starts a new animation loop.
     */
    private tick() {
        clearInterval(this._timer)

        if (this.isSpinning) {
            this._index = this.calcNewIndex(1)
            this.calcInterval()
            this.cfg.onScroll(this.getWindow())
            this._timer = setInterval(() => { this.tick() }, this.currentInterval); // start the setInterval()
        } else {
            this.stop()
            this.cfg.afterLastScroll()
        }
    }

    /**
     * @returns The array of the wheel elements to show in the current animation tick.
     */
    private getWindow(): ItemType[] {
        return this.getIndexWindow().map(index => this._items[index])
    }

    /**
     * @returns The array of the wheel element indices to calculate current wheel window.
     */
    private getIndexWindow(): number[] {
        var indexWindow: number[] = new Array(this.cfg.windowSize)
        var j = 0 - Math.floor(this.cfg.windowSize / 2)
        for (var i = 0; i < this.cfg.windowSize; i++) {
            indexWindow[i] = this.calcNewIndex(j++)
        }
        return indexWindow
    }

    /**
     * Calculates and returns a new index by the specified offset.
     * 
     * For example, if _index is 0 and step is -1 then function return the index of the last _items element.
     * 
     * @param {number} step - The offset to calc a neighboring index.
     */
    private calcNewIndex(step: number): number {
        var newIndex = this._index + step % this._itemCount
        if (newIndex < 0)
            return newIndex + this._itemCount
        if (newIndex >= this._itemCount)
            return newIndex - this._itemCount
        return newIndex
    }

    /**
     * Calculates a new animation timer interval.
     * Uses easing function to slow down animation tick by tick.
     */
    private calcInterval() {
        // timeFactor changes from 0 to 1 linearly. When _startTime it is 0, when _startTime + duration it is 1
        const timeFactor = Math.min((Date.now() - this._startTime) / this.cfg.duration, 1)

        // intervalFactor changes from 0 to 1 by an easing function
        const intervalFactor = this.cfg.easingFunc(timeFactor)

        this._currentInterval = Math.min(
            this.cfg.startInterval + (this.cfg.stopInterval - this.cfg.startInterval) * intervalFactor,
            this._startTime + this.cfg.duration - Date.now()
        );
    }

    // Getters

    getCurrentItem(): ItemType {
        return this._items[this._index]
    }

    get index() {
        return this._index
    }

    get isSpinning(): boolean {
        return Date.now() < this._startTime + this.cfg.duration
    }

    get currentInterval() {
        return this._currentInterval
    }
}

/**
 * This class wraps some easing functions.
 * 
 * Each function takes number from 0 to 1 as argument and returns  calculated number from 0 to 1.
 */
export class EeasingFunctions {
    /**
     * Eeasing function: https://easings.net/#easeOutCubic
     */
    public static easeOutCubic(x: number): number {
        return 1 - Math.pow(1 - x, 3);
    }

    /**
     * Eeasing function: https://easings.net/#easeOutSine
     */
    public static easeOutSine(x: number): number {
        return Math.sin((x * Math.PI) / 2);
    }

    /**
     * Eeasing function: https://easings.net/#easeInQuart
     */
    public static easeInQuart(x: number): number {
        return x * x * x * x;
    }
}
