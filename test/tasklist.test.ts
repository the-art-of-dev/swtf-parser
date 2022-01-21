import { parseSwtf, SwtfTask } from '../src/index';

describe('Simple task lists', () => {
    it('examples/simpleTaskList.json', () => {
        const rawTasks = `
- Daily tasks 😐:
    - store: [borring]
        - food [😅]
        - coffee [✅]
    - work: [borring]
        - include e2e testing mechanism [p: medium][😅]
        - improve load testing [p: high][😅]
    - write today's tasks in SWTF [cool][✅]
`;
        const simpleTaskList: SwtfTask[] = require('../json-examples/simple-task-list.json');
        expect(parseSwtf(rawTasks)).toStrictEqual<SwtfTask[]>(simpleTaskList);
    });
});