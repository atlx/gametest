import {Color} from "./color";

export enum EntityDisplay {
    Relative,
    Absolute
}

export type EntityColor = Color | string;

export enum EntityRenderStrategy {
    Absolute,
    Smooth
}
