const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};
const todos = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
];

const Lab5 = (app) => {
  app.post("/a5/todos", (req, res) => {
    const newTodo = {
      ...req.body,
      id: new Date().getTime(),
    };
    todos.push(newTodo);
    res.json(newTodo);
  });

  app.get("/a5/todos", (req, res) => {
    const { completed } = req.query;
    if (completed) {
      const comp = completed === "true";
      const t = todos.filter((todo) => todo.completed === comp);
      res.json(t);
      return;
    }

    res.json(todos);
  });

  app.get("/a5/todos/create", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  });
  app.get("/a5/todos/create/:newTitle", (req, res) => {
    const { newTitle } = req.params;
    const newTodo = {
      id: new Date().getTime(),
      title: newTitle,
      description: "",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  });
  app.get("/a5/todos/:id/title/:newTitle", (req, res) => {
    const { id, newTitle } = req.params;
    const todo = todos.find((todo) => todo.id === parseInt(id));
    if (!todo) {
      res.status(404).send("Todo not found");
      return;
    }
    todo.title = newTitle;
    res.json(todos);
  });

  app.put("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.res.status(404).json({ message:
          `Unable to update Todo with ID ${id}` });
      return;
    }
    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.due = req.body.due;
    todo.completed = req.body.completed;
    res.sendStatus(200);
  });

  // app.delete("/a5/todos/:id", (req, res) => {
  //         const { id } = req.params;
  //         const todo = todos.find((t) => t.id === parseInt(id));
  //         if (!todo) {
  //             res.res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
  //             return;
  //         }

  //         todos.splice(todos.indexOf(todo), 1);
  //         res.sendStatus(200);
  //     });
      app.delete("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const index = todos.findIndex((todo) => todo.id === parseInt(id));
        if (index === -1) {
          // res.status(404).send("Todo not found");
          res.res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
          return;
        }
        todos.splice(index, 1);
        res.json(todos);
      });

  app.get("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  });


  app.get("/a5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.title = title;
    res.json(todos);
  });

  app.get("/a5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((todo) => todo.id === parseInt(id));
    if (!todo) {
      res.status(404).send("Todo not found");
      return;
    }
    todo.completed = completed;
    res.json(todos);
  });
  app.get("/a5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((todo) => todo.id === parseInt(id));
    if (!todo) {
      res.status(404).send("Todo not found");
      return;
    }
    todo.description = description;
    res.json(todos);
  });


  app.get("/a5/todos/:id/delete", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todos.splice(todos.indexOf(todo), 1);
    res.json(todos);
  });


  app.get("/a5/assignment", (req, res) => {
    res.json(assignment);
  });
  app.get("/a5/assignment/title", (req, res) => {
    res.json(assignment.title);
  });
  app.get("/a5/assignment/title/:newTitle", (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  });

  app.get("/a5/assignment/score", (req, res) => {
    res.json(assignment.score);
  });

  app.get("/a5/assignment/score/:newScore", (req, res) => {
    const newScore = parseInt(req.params.newScore, 10);
    if (!isNaN(newScore)) {
        assignment.score = newScore;
        res.json(assignment);
    } else {
        res.status(400).send("Invalid score");
    }
});

  app.get("/a5/assignment/completed", (req, res) => {
    res.json(assignment.completed);
  });

  app.get("/a5/assignment/completed/:newCompleted", (req, res) => {
    const { newCompleted } = req.params;
    assignment.completed = newCompleted === "true";
    res.json(assignment);
  });

  const hello = (req, res) => {
    res.send("Welcome to Lab 5!");
  };

  app.get("/a5", hello);
  app.get("/a5/hello/:name", (req, res) => {
    const name = req.params.name;
    res.send(`Hello ${name}`);
  });
    app.get("/a5/welcome", (req, res) => {
      res.send("Welcome to Assignment 5");
    });
    app.get("/a5/add/:a/:b", (req, res) => {
      const { a, b } = req.params;
      const sum = parseInt(a) + parseInt(b);
      res.send(sum.toString());
    });
    app.get("/a5/subtract/:a/:b", (req, res) => {
      const { a, b } = req.params;
      const sum = parseInt(a) - parseInt(b);
      res.send(sum.toString());
    });
    
    app.get("/a5/calculator", (req, res) => {
      const { a, b, operation } = req.query;
      let result = 0;
      if (operation === "add") {
        result = parseInt(a) + parseInt(b);
      } else if (operation === "subtract") {
        result = parseInt(a) - parseInt(b);
      } else {
        result = "Invalid operation";
      }
      res.send(result.toString());
    });
  
  
  };
  export default Lab5;
  