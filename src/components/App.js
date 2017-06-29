import React from 'react';
import './../App.css';
import TodoHeader from './todo-header';
import TodoList from './todo-list';
import _ from 'lodash';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [
        {
          id: 1,
          name: "todo1",
          isComplete: true
        },
        {
          id: 2,
          name: "todo2",
          isComplete: false
        },
        {
          id: 3,
          name: "todo3",
          isComplete: false
        }
      ]
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>React Todos</h2>
        </div>
        <div className="Todo-app">
          <TodoHeader createTodo={this.createSingleTodo.bind(this)} />
          <TodoList
            todos={this.state.todos}
            handleCheckBoxUpdate={this.handleCheckBoxUpdate.bind(this)}
            handleNameUpdate={this.handleNameUpdate.bind(this)}
            handleDelete={this.handleDelete.bind(this)}
          />
        </div >
      </div >
    );
  }

  handleCheckBoxUpdate(id) {
    const todos = this.state.todos;
    const todo = _.find(todos, (todo) => todo.id === id);

    console.log(todo);
    todo.isComplete = !todo.isComplete;
    this.setState({
      todos: this.state.todos
    });
  }

  handleNameUpdate(oldName, todoName) {
    const todos = this.state.todos;
    const todo = _.find(todos, (todo) => todo.name === oldName);

    console.log(todo);
    todo.name = todoName;
    this.setState({
      todos: this.state.todos
    });
  }

  handleDelete(id) {
    _.remove(this.state.todos, (todo) => todo.id === id);
    this.setState({ todos: this.state.todos });
  }

  createSingleTodo(todoName) {
    let size = this.state.todos.length;
    size = size + 1;
    console.log('in create single todo');
    this.state.todos.push(
      {
        id: size,
        name: todoName,
        isComplete: false
      }
    );

    this.setState({ todos: this.state.todos });
  }
}

export default App;
