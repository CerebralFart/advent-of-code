const ops: { [key: string]: (m: IntCode) => void } = {
    1: machine => machine.write(
        machine.offsetRead(3),
        machine.read(machine.offsetRead(1)) + machine.read(machine.offsetRead(2)),
    ),
    2: machine => machine.write(
        machine.offsetRead(3),
        machine.read(machine.offsetRead(1)) * machine.read(machine.offsetRead(2)),
    ),
    99: machine => machine.terminate(),
};

export default class IntCode {
    private enabledOps: string[];
    private data: number[] = [];
    private pointer = 0;
    private running = false;

    constructor(enabled: (string | number)[] = Object.keys(ops)) {
        this.enabledOps = enabled.map(v => v.toString());
    }

    execute(data: number[]): number[] {
        this.data = data;
        this.pointer = 0;
        this.running = true;

        while (this.running) {
            const opCode = this.data[this.pointer].toString();
            if (this.enabledOps.indexOf(opCode) === -1) {
                throw new Error(`Encountered unknown or disabled opcode [${opCode}]`);
            }

            ops[opCode](this);
            this.pointer += 4;
        }

        return this.data;
    }

    read(index: number): number {
        return this.data[index];
    }

    write(index: number, data: number): void {
        this.data[index] = data;
    }

    offsetRead(offset: number): number {
        return this.read(this.pointer + offset);
    }

    offsetWrite(offset: number, data: number): void {
        this.write(this.pointer + offset, data);
    }

    terminate() {
        this.running = false;
    }
}