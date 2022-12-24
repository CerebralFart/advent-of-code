export default class BitmaskFactory<T> {
    private _flags: T[];
    private _maskCount: number;

    constructor(flags: T[]) {
        this._flags = flags;
        this._maskCount = Math.ceil(flags.length / 32);
    }

    public create(flags: T[]): Bitmask<T> {
        return new Bitmask<T>(
            this._flags,
            this._maskCount,
            flags
        )
    }
}

class Bitmask<T> {
    private _all: T[];
    private _masks: number[];

    constructor(allFlags: T[], masks: number, flags: T[] = []) {
        this._all = allFlags;
        this._masks = new Array(masks).fill(0);
        for (const flag of flags) {
            this.set(flag);
        }
    }

    get flags(): T[] {
        const acc = [];
        for (let idx = 0; idx < this._all.length; idx++) {
            const [maskIdx, maskVal] = this.decomposeNumber(idx);
            if ((this._masks[maskIdx] & maskVal) != 0) {
                acc.push(this._all[idx]);
            }
        }
        return acc;
    }

    public set(flag: T, value: boolean = true): void {
        const [maskIdx, maskVal] = this.decompose(flag);
        if (value) this._masks[maskIdx] |= maskVal;
        else this._masks[maskIdx] &= ~maskVal;
    }

    public and(other: Bitmask<T>): Bitmask<T> {
        const mask = new Bitmask(this._all, this._masks.length);
        for (let i = 0; i < this._masks.length; i++) {
            mask._masks[i] = this._masks[i] & other._masks[i];
        }
        return mask;
    }

    private decompose(flag: T): [number, number] {
        return this.decomposeNumber(this._all.indexOf(flag))
    }

    private decomposeNumber(index: number): [number, number] {
        const maskIdx = index % this._masks.length
        const maskVal = 2 ** Math.floor(index / this._masks.length);
        return [maskIdx, maskVal];
    }
}