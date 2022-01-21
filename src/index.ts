const BEGIN_TASK_TOKEN = '- ';
const BEGIN_SUBTASK_TOKENS = ['\t', ' '];
const TASK_ATTRS_REGEX = / (\[[^\[\]]*\])+\n$/;
const ATTR_REGEX = /\[[^\[\]]*\]/g;
const END_TASK_TOKEN = '\n';
const ATTR_NAME_REGEX = /^[^\[\]]*: /;

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

export function parseAttributes(rawAttrs: string): SwtfTaskAttribute[] {
    rawAttrs = rawAttrs.trim();
    const attrs = rawAttrs.match(ATTR_REGEX);
    return attrs.map((v, i) => {
        let t = v.slice(1, v.length - 1);

        const nameMatch = t.match(ATTR_NAME_REGEX);
        let name: string = null;
        if (nameMatch) {
            name = nameMatch[0].slice(0, nameMatch[0].length - 2);
            t = t.slice(name.length + 2);
        }

        return {
            name: name,
            index: i,
            value: t.includes(',') ? t.split(',') : t
        };
    });
}

export function parseTask(rawTask: string): SwtfTask {
    let taskLevel = 0;
    const subTaskToken = BEGIN_SUBTASK_TOKENS.find(t => rawTask.startsWith(t));
    const taskLevelRegExp = new RegExp(`^${subTaskToken}+`);
    if (subTaskToken) {
        taskLevel = rawTask.match(taskLevelRegExp).pop().length;
    }

    rawTask = `${rawTask.trim()}\n`;
    if (!rawTask.startsWith(BEGIN_TASK_TOKEN)) return null;
    const task: SwtfTask = {
        text: '',
        attributes: [],
        subTasks: [],
        level: taskLevel
    };

    const rawAttrs = rawTask.match(TASK_ATTRS_REGEX) ? rawTask.match(TASK_ATTRS_REGEX)[0].trim() : null;

    if (rawAttrs) {
        task.attributes = parseAttributes(rawAttrs);
    }

    const sliceIndex = rawAttrs ? TASK_ATTRS_REGEX.exec(rawTask).index : rawTask.length - 1;
    task.text = rawTask.slice(0, sliceIndex).slice(BEGIN_TASK_TOKEN.length);

    return task;
}

export function parseSwtf(raw: string): SwtfTask[] {
    const tasks: SwtfTask[] = [];
    const stack: SwtfTask[] = [];

    raw.split(END_TASK_TOKEN).forEach(rt => {
        const task = parseTask(`${rt}\n`);
        if (!task) return;


        let parent = stack.pop();
        while (parent && parent.level >= task.level) {
            parent = stack.pop();
        }


        if (parent) {
            parent.subTasks.push(task);
            stack.push(parent);
        } else {
            task.level = 0;
            tasks.push(task);
        }

        stack.push(task);
    });

    return tasks;
}