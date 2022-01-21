# SWTF Parser

[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/swtf-parser)](https://www.npmjs.com/package/swtf-parser)
![npm type definitions](https://img.shields.io/npm/types/swtf-parser)
[![swtf](https://img.shields.io/badge/support-SWTF-brightgreen)](https://github.com/the-art-of-dev/swtf)

*Javascript library that parses SWTF into JSON*

> ⚠️ This project is created to meet the needs of our development team. Our main focus currently won't be on maintainig this project.

## Content
- [SWTF Parser](#swtf-parser)
  - [Content](#content)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Simple tasks](#simple-tasks)
    - [Tasks with attributes](#tasks-with-attributes)
    - [Simple task list](#simple-task-list)

## Installation

Install `swtf-parser` via npm:

```
npm i swtf-parser
```

## Usage

### Simple tasks

Here's an simple example:

```js
const { parseSwtf } = require('swtf-parser');

const tasks = parseSwtf('- Define format that can be so simple and used acrossed devices\n');

console.log(JSON.stringify(tasks, null, 4));
```

This code should output:

```json
[
    {
        "text": "Define format that can be so simple and used acrossed devices",
        "attributes": [],
        "subTasks": [],
        "level": 0
    }
]
```

### Tasks with attributes

Here's an example of task with attributes:

```js
const { parseSwtf } = require('swtf-parser');

const tasks = parseSwtf('- Define format that can be so simple and used acrossed devices [member: 👽][⚡]\n');

console.log(JSON.stringify(tasks, null, 4));
```

This code should output:

```json
[
    {
        "text": "Define format that can be so simple and used acrossed devices",
        "attributes": [
            {
                "name": "member",
                "index": 0,
                "value": "👽"
            },
            {
                "name": null,
                "index": 1,
                "value": "⚡"
            }
        ],
        "subTasks": [],
        "level": 0
    }
]
```

### Simple task list

An example of task list:

```js
const { parseSwtf } = require('swtf-parser');

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

const tasks = parseSwtf(rawTasks);

console.log(JSON.stringify(tasks, null, 4));
```

This code should have same output as [simple-task-list.json](./json-examples/simple-task-list.json)