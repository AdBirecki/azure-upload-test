import { Inject, Injectable, InjectionToken } from "injection-js";
import ProcessEnv = NodeJS.ProcessEnv;

export const InjectableProcessEnv = new InjectionToken<ProcessEnv>('ProcessEnv');

@Injectable()
export class Environment {
    constructor(@Inject(InjectableProcessEnv) public readonly env: ProcessEnv) {
    }

    getVariable(key: string): string {
        const value = this.env[key];
        if (!value) {
            throw new Error('Configuration error: missing varaible');
        }
        return value;
    }
}