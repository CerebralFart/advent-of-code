const ops: { [key: string]: (m: IntCode) => number } = {
    1: machine => {
        machine.write(
            machine.readOffset(3),
            machine.readArgument(1) + machine.readArgument(2),
        );
        return 4;
    },
    2: machine => {
        machine.write(
            machine.readOffset(3),
            machine.readArgument(1) * machine.readArgument(2),
        );
        return 4;
    },
    3: machine => {
        machine.write(
            machine.readOffset(1),
            machine.bufferReadIn(),
        );
        return 2;
    },
    4: machine => {
        machine.bufferWriteOut(
            machine.readArgument(1),
        );
        return 2;
    },
    5: machine => {
        if (machine.readArgument(1) !== 0) {
            machine.setPointer(machine.readArgument(2));
            return 0;
        } else {
            return 3;
        }
    },
    6: machine => {
        if (machine.readArgument(1) === 0) {
            machine.setPointer(machine.readArgument(2));
            return 0;
        } else {
            return 3;
        }
    },
    7: machine => {
        machine.write(
            machine.readOffset(3),
            machine.readArgument(1) < machine.readArgument(2) ? 1 : 0,
        );
        return 4;
    },
    8: machine => {
        machine.write(
            machine.readOffset(3),
            machine.readArgument(1) === machine.readArgument(2) ? 1 : 0,
        );
        return 4;
    },
    99: machine => {
        machine.terminate();
        return 1;
    },
};

export default class IntCode {
    private enabledOps: string[];

    private data: number[] = [];
    private inBuffer: number[] = [];
    private outBuffer: number[] = [];

    private pointer = 0;
    private running = false;

    constructor(enabled: (string | number)[] = Object.keys(ops)) {
        this.enabledOps = enabled.map(v => v.toString()).filter(code => code in ops);
    }

    execute(data: number[], inBuffer: number[] = []): number[] {
        this.data = data;
        this.inBuffer = inBuffer;
        this.outBuffer = [];

        this.pointer = 0;
        this.running = true;

        while (this.running) {
            const opCode = (this.data[this.pointer] % 100).toString();
            if (this.enabledOps.indexOf(opCode) === -1) {
                throw new Error(`Encountered unknown or disabled opcode [${opCode}]`);
            }

            this.pointer += ops[opCode](this);
        }

        return this.data;
    }

    read(index: number): number {
        return this.data[index];
    }

    write(index: number, data: number): void {
        this.data[index] = data;
    }

    readOffset(offset: number): number {
        return this.read(this.pointer + offset);
    }

    writeOffset(offset: number, data: number): void {
        this.write(this.pointer + offset, data);
    }

    readArgument(argument: number): number {
        const argValue = this.readOffset(argument);
        return this.isImmediate(argument) ? argValue : this.read(argValue);
    }

    isImmediate(argument: number): boolean {
        const opFlags = Math.floor(this.data[this.pointer] / 100).toString();
        return opFlags.charAt(opFlags.length - argument) === "1";
    }

    bufferReadIn(): number {
        return this.inBuffer.shift();
    }

    bufferWriteOut(value: number): void {
        this.outBuffer.push(value);
    }

    getBufferOut(): number[] {
        return this.outBuffer;
    }

    setPointer(pointer: number): void {
        this.pointer = pointer;
    }

    terminate() {
        this.running = false;
    }
}