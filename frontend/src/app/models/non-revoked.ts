export class NonRevoked {

    from: Date | null = null;

    to: Date | null = null;

    constructor() {
    }

    get fromEpoch(): number | null {
        return this.from ? this.from.valueOf() : null;
    }

    get toEpoch(): number | null {
        return this.to ? this.to.valueOf() : null;
    }

    get isDefine(): boolean {
        return this.from !== null || this.to !== null;
    }

    static fromPlainObject(value: any): NonRevoked {
        return new NonRevoked();
    } 

    toPlainObject(): any {
        const plainObject: any = {};
        if (this.from) plainObject['from'] = this.fromEpoch;
        if (this.to) plainObject['to'] = this.toEpoch;
        return plainObject;
    } 
    
}