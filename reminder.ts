type Todo = {
    id: string;
    name: string;
    desc:string
    completed: boolean;
    date:Date,
  };

  export const todos: Todo[] = [
    { id: '1', name: 'Buy groceries',desc:'Random desc', completed: false,date:new Date() },
    { id: '2', name: 'Complete coding assignment',desc:'Random desc', completed: true,date:new Date()  },
    { id: '3', name: 'Go for a run',desc:'Random desc', completed: false,date:new Date()  },
    { id: '4', name: 'Read a book',desc:'Random desc', completed: true,date:new Date()  },
    { id: '5', name: 'Call a friend',desc:'Random desc', completed: false,date:new Date()  },
  ];
