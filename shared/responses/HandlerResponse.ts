import { Interface } from "readline";

export interface HandlerResponse {
    status: number;
    body: object | unknown;
}