import '../../shared/polyfills';
import { AzureFunction, Context, HttpRequest, HttpResponse } from "@azure/functions"
import { ReflectiveInjector } from "injection-js";
import { SendMessageHandler } from "../../handlers/send-message-handler";
import { Enviroment, InjectableProcessEnv } from "../../shared/enviroment";
import { ServiceBusProvier } from '../../shared/service-bus-provider';

const injector = ReflectiveInjector.resolveAndCreate([
    SendMessageHandler,
    ServiceBusProvier,
    Enviroment,
    {
        provide: InjectableProcessEnv,
        useValue: process.env,
    }
]);

export const handlerFactory = (provider: () => SendMessageHandler) => async (context: Context, req: HttpRequest): Promise<HttpResponse> => {
    const result = await provider().handle(context, req);
    return result;
}

export function svbHandlerFactory() {
    return injector.get(SendMessageHandler);
}
export const run = handlerFactory(svbHandlerFactory)

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const res = run(context, req);
    context.res = {
        ...res
    };
};

export default httpTrigger;