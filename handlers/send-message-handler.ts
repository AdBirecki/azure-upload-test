import { Context, HttpRequest } from "@azure/functions";
import { ServiceBusMessage } from "@azure/service-bus";
import { Injectable } from "injection-js";
import { Environment } from "../shared/enviroment";
import { HandlerResponse } from "../shared/responses/HandlerResponse";
import { ServiceBusProvier } from "../shared/service-bus-provider";

@Injectable()
export class SendMessageHandler {
    constructor(
        private readonly env: Environment,
        private readonly svbProvider: ServiceBusProvier) {
    }
    async handle(context: Context, req: HttpRequest): Promise<HandlerResponse> {
        console.log(this.env.getVariable('ENV_VAR_MOCK'));
        const svbMessage: ServiceBusMessage = { body: req.body };
        this.svbProvider.sendMessage(svbMessage);
        return {
            status: 200,
            body: 'handler response'
        }
    }
}


