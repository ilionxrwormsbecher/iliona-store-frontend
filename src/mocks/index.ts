import { rest } from "msw";
import { worker } from "./browser";

export interface WindowMSW {
    worker: typeof worker;
    rest: typeof rest;
}

declare global {
    interface Window {
        msw: WindowMSW;
    }
}
