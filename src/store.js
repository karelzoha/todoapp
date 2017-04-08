let taskList = [
    {
        id: 1,
        title: 'Task 1',
        description: 'Delší popis tasku',
        dueDate: '2017-04-10',
        state: 'FINISHED',
        created: '2017-03-15 14:00:00',
        updated: '2017-03-15 14:00:00',
        subTasks: [
            {
                id: 2,
                title: 'Sub Task 1',
                description: 'Delší popis sub tasku',
                dueDate: '2017-04-10',
                state: 'UNFINISHED',
                created: '2017-03-15 14:00:00',
                updated: '2017-03-15 14:00:00',
            },
        ]
    },
    {
        id: 3,
        title: 'Task 3',
        description: 'Delší popis tasku',
        dueDate: '2017-04-10',
        state: 'UNFINISHED',
        created: '2017-03-15 14:00:00',
        updated: '2017-03-15 14:00:00',
        subTasks: [
            {
                id: 4,
                title: 'Sub Task 4',
                description: 'Delší popis sub tasku',
                dueDate: '2017-04-10',
                state: 'UNFINISHED',
                created: '2017-03-15 14:00:00',
                updated: '2017-03-15 14:00:00',
            },
            {
                id: 5,
                title: 'Sub Task 5',
                description: 'Delší popis sub tasku',
                dueDate: '2017-04-10',
                state: 'UNFINISHED',
                created: '2017-03-15 14:00:00',
                updated: '2017-03-15 14:00:00',
            },
        ]
    },
    {
        id: 6,
        title: 'Task 6',
        description: 'Delší popis tasku',
        dueDate: '2017-04-10',
        state: 'UNFINISHED',
        created: '2017-03-15 14:00:00',
        updated: '2017-03-15 14:00:00',
        subTasks: [
            {
                id: 7,
                title: 'Sub Task 7',
                description: 'Delší popis sub tasku',
                dueDate: '2017-04-10',
                state: 'UNFINISHED',
                created: '2017-03-15 14:00:00',
                updated: '2017-03-15 14:00:00',
            },
        ]
    },
]

export default {
    getTask: (id) => {
        const tasks = taskList.filter((_) => _.id === id)
        return tasks.length > 0 ? tasks[0] : {}
    },
    addTask: (task) => (taskList.push(task)),
    deleteTask: (id) => {
        taskList = taskList.filter((_) => (_.id !== id))
    },
    updateTask: (id, newTask) => {
        taskList = taskList.map((_) => (_.id === id ? newTask : _))
    },
    listTasks: ({ page, pageSize, filter}) => {
        const tasks = filter ? taskList.filter((_) => {
            let isOk = false
            Object.keys(filter).forEach((key) => {
                if (_[key] === filter[key]) {
                    isOk = true
                } else {
                    isOk = false
                }
            })
            return isOk
        }) : taskList
        const begin = page * pageSize
        const end = begin + pageSize
        return {
            total: taskList.length,
            tasks: tasks.slice(begin, end)
        }
    },
}