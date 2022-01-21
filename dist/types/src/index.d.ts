export interface SwtfTaskAttribute {
    name?: string;
    value: string | string[];
    index: number;
}
export interface SwtfTask {
    text: string;
    attributes: SwtfTaskAttribute[];
    subTasks?: SwtfTask[];
    level: number;
}
export declare function parseAttributes(rawAttrs: string): SwtfTaskAttribute[];
export declare function parseTask(rawTask: string): SwtfTask;
export declare function parseSwtf(raw: string): SwtfTask[];
