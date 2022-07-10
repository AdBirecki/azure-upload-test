import { ServiceBusClient, ServiceBusMessage, ServiceBusSender } from "@azure/service-bus";
import { Inject, Injectable } from "injection-js";
import { Enviroment } from "./enviroment";


@Injectable()
export class CosmosDBProvier {
    private readonly svbSender: ServiceBusSender;

    constructor(private readonly enviroment: Enviroment) {
        const SERVICE_BUS_CONNECTION = enviroment.getVariable('SERVICE_BUS_CONNECTION');
        const SERVICE_BUS_QUEUE = enviroment.getVariable('SERVICE_BUS_QUEUE_NAME');

        this.svbSender = new ServiceBusClient(SERVICE_BUS_CONNECTION).createSender(SERVICE_BUS_QUEUE);
    }

    public async sendMessage(mesage: ServiceBusMessage): Promise<void> {
        try {
            await this.svbSender.sendMessages(mesage);
        } catch (err) {
            console.log(err);
        }
    }
}