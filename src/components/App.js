import React from 'react';
import './../App.css';
import TodoHeader from './todo-header';
import TodoList from './todo-list';
import _ from 'lodash';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [{
        id: 1,
        name: 'First Item',
        completed: true
      }]
    }
  }

  componentDidMount() {
    console.log('component did mount');
    this.API_getTodoList();
  }

  API_getTodoList() {
    let todolist = [];
    fetch('http://localhost:8080/todo/list', {
      method: 'GET',
    }).then((response) => response = response.json())
      .then((response) => this.setState({ todos: response }));
  }

  render() {
    return (
      <div className="row">
        <TodoHeader createTodo={this.createSingleTodo.bind(this)} />
        <TodoList
          todos={this.state.todos}
          handleCheckBoxUpdate={this.handleCheckBoxUpdate.bind(this)}
          handleNameUpdate={this.handleNameUpdate.bind(this)}
          handleDelete={this.handleDelete.bind(this)}
        />
      </div>
    );
  }

  handleCheckBoxUpdate(id) {
    const todos = this.state.todos;
    const todo = _.find(todos, (todo) => todo.id === id);

    console.log(todo);
    todo.completed = !todo.completed;
    this.setState({
      todos: this.state.todos
    });

    this.API_UpdateTodo(todo);
  }

  API_UpdateTodo(todo) {
    console.log('in api update');
    fetch('http://localhost:8080/todo/' + todo.id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo)
    })
  }

  handleNameUpdate(oldName, todoName) {
    const todos = this.state.todos;
    const todo = _.find(todos, (todo) => todo.name === oldName);

    console.log(todo);
    todo.name = todoName;
    this.setState({
      todos: this.state.todos
    });

    this.API_UpdateTodo(todo);
  }

  handleDelete(id) {
    _.remove(this.state.todos, (todo) => todo.id === id);
    this.setState({ todos: this.state.todos });
    this.API_deleteTodo(id);
  }

  API_deleteTodo(id) {
    fetch('http://localhost:8080/todo/' + id, {
      method: 'DELETE',
      mode: 'CORS'
    });
  }
  createSingleTodo(todoName) {
    let size = this.state.todos.length;
    size = size + 1;
    console.log('in create single todo');

    const todo = {
      id: size,
      name: todoName,
      isComplete: false
    };

    // create tood in backend

    this.API_createTodo(todo);


    /// END ///

    this.state.todos.push(
      todo
    );

    this.setState({ todos: this.state.todos });
  }




  // rest api calls
  API_createTodo(todo) {
    fetch('http://localhost:8080/todo/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo)
    })
  }
}

export default App;
