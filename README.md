# Todo App
Jednoduchá aplikace demonstrující implementaci todo listu v node.js.

## REST Backend
Backend tvori RESTové rozhrani pro praci s jendotlivými tásky. Tásky mohou obsahova vnořené "podtásky". 

Struktura REST API je následující:
```
    /v1.0.0:

        /task:
            put:
                accept: "application/json",
                request: { 
                                title: 'Task 1', 
                                description: 'Delší popis tasku',
                                dueDate: '2017-04-10',
                                state: 'UNFINISHED',
                                subTasks: [
                                    { ... },
                                    ...
                                ]
                            },
                produces: "application/json",
                responses: {
                    200: {
                        status: "OK",
                        item: { 
                                id: 1, 
                                title: 'Task 1', 
                                description: 'Delší popis tasku',
                                dueDate: '2017-04-10',
                                state: 'UNFINISHED',
                                created: '2017-03-15 14:00:00',
                                updated: '2017-03-15 14:00:00',
                                subTasks: [
                                    { ... },
                                    ...
                                ]
                            }                    },
                    400: {
                        status: "ERR,
                        errorText: "Bad request",
                        errors: [
                            { field: 'title', msg: 'Chyba'},
                            ...
                        ]
                    }
                    500: {
                        status: "ERR,
                        errorText: "Popis chyby"
                    }
                }

        /task/{id}:
            get:
                produces: "application/json",
                responses: {
                    200: {
                        status: "OK",
                        item: { 
                                id: 1, 
                                title: 'Task 1', 
                                description: 'Delší popis tasku',
                                created: '15. 3. 2017 14:00:00',
                                updated: '15. 3. 2017 14:00:00',
                                state: 'UNFINISHED',
                                subTasks: [
                                    { ... },
                                    ...
                                ]
                            }                    },
                    400: {
                        status: "ERR,
                        errorText: "Task nenalezen"
                    },
                    500: {
                        status: "ERR,
                        errorText: "Popis chyby"
                    }
                }

        /task:
            post:
                accept: "application/json",
                request: { 
                    list: {
                        page: 0,
                        pageSize: 10,
                        filter {
                            field: 'value'
                        }
                    }
                },
                produces: "application/json",
                responses: {
                    200: {
                        status: "OK",
                        total: 20,
                        items: [
                            { 
                                id: 1, 
                                title: 'Task 1', 
                                description: 'Delší popis tasku',
                                created: '15. 3. 2017 14:00:00',
                                updated: '15. 3. 2017 14:00:00',
                                state: 'UNFINISHED',
                                subTasks: [
                                    { ... },
                                    ...
                                ]
                            },
                            ...
                        ]
                    },
                    500: {
                        status: "ERR,
                        errorText: "Popis chyby"
                    }
                }


        /task/{id}:
            post:
                accept: "application/json",
                request: { 
                    update: {
                        id: 1,
                        title: 'Task 1', 
                        description: 'Delší popis tasku',
                        state: 'UNFINISHED',
                        subTasks: [
                            { ... },
                            ...
                        ]
                }
                produces: "application/json",
                responses: {
                    200: {
                        status: "OK",
                        item: { 
                                id: 1, 
                                title: 'Task 1', 
                                description: 'Delší popis tasku',
                                created: '15. 3. 2017 14:00:00',
                                updated: '15. 3. 2017 14:00:00',
                                state: 'UNFINISHED',
                                subTasks: [
                                    { ... },
                                    ...
                                ]
                            }                    },
                    400: {
                        status: "ERR,
                        errorText: "Bad request",
                        errors: [
                            { field: 'title', msg: 'Chyba'},
                            ...
                        ]
                    }
                    500: {
                        status: "ERR,
                        errorText: "Popis chyby"
                    }
                }

        /task/{id}:
            delete:
                produces: "application/json",
                responses: {
                    200: {
                        status: "OK",
                        item: { 
                                id: 1, 
                                title: 'Task 1', 
                                description: 'Delší popis tasku',
                                created: '15. 3. 2017 14:00:00',
                                updated: '15. 3. 2017 14:00:00',
                                state: 'UNFINISHED',
                                subTasks: [
                                    { ... },
                                    ...
                                ]
                            }                    },
                    400: {
                        status: "ERR,
                        errorText: "Bad request",
                    }
                    500: {
                        status: "ERR,
                        errorText: "Popis chyby"
                    }
                }
 
```