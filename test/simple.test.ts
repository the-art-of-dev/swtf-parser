import { parseSwtf, SwtfTask } from '../src/index';

describe('Simple tests', () => {
    it('Fake task', () => {
        expect(parseSwtf('My first task written in one line of SWTF\n'))
            .toStrictEqual<SwtfTask[]>([]);
    });

    it('Task without attributes', () => {
        expect(parseSwtf('- Define format that can be so simple and used acrossed devices\n'))
            .toStrictEqual<SwtfTask[]>([
                {
                    text: 'Define format that can be so simple and used acrossed devices',
                    attributes: [],
                    level: 0,
                    subTasks: []
                }
            ]);
    });

    it('Task with wrong attributes', () => {
        expect(parseSwtf('- My first task written in one line of SWTF[this are][not attributes]\n'))
            .toStrictEqual<SwtfTask[]>([
                {
                    text: 'My first task written in one line of SWTF[this are][not attributes]',
                    attributes: [],
                    level: 0,
                    subTasks: []
                }
            ]);
    });

    it('Task with attributes', () => {
        expect(parseSwtf('- My first task written in one line of SWTF [this are][not attributes]\n'))
            .toStrictEqual<SwtfTask[]>([
                {
                    text: 'My first task written in one line of SWTF',
                    attributes: [
                        {
                            index: 0,
                            name: null,
                            value: 'this are'
                        },
                        {
                            index: 1,
                            name: null,
                            value: 'not attributes'
                        }
                    ],
                    level: 0,
                    subTasks: []
                }
            ]);
    });
});
