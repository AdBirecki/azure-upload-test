import { Inject, Injectable, InjectionToken } from "injection-js";
import ProcessEnv = NodeJS.ProcessEnv;

export const InjectableProcesEnv = new InjectionToken<ProcessEnv>('ProcesEnv');

@Injectable()
export class Enviroment {
    constructor(@Inject(InjectableProcesEnv) public readonly env: ProcessEnv) {
    }

    getVariable(key: string): string {
        const value = this.env[key];
        if (!value) {
            throw new Error('Configuration error: missing varaible');
        }
        return value;
    }
}