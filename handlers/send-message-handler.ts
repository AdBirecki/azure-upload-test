import { HttpResponse } from "@azure/core-http";
import { Context, HttpRequest } from "@azure/functions";
import { ServiceBusMessage } from "@azure/service-bus";
//import Context = require("applicationinsights/out/Library/Context");
import { Injectable } from "injection-js";
import { Enviroment } from "../shared/enviroment";
import { HandlerResponse } from "../shared/responses/HandlerResponse";
import { ServiceBusProvier } from "../shared/service-bus-provider";

@Injectable()
export class SendMessageHandler {
    constructor(
        private readonly env: Enviroment,
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


