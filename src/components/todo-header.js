import React from 'react';
import './../App.css';

export default class TodoHeader extends React.Component {
    constructor() {
        super();
    }

    handleSubmit(e) {
        e.preventDefault();
        const todoInput = this.refs.todoInput.value;
        if (!todoInput) {
            return null;
        }
        console.log(todoInput);
        this.props.createTodo(todoInput);
        this.refs.todoInput.value = '';
    }

    render() {
        return (
            <div className="todo-header">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" placeholder="Anything on mind?" ref="todoInput" />
                    <button> Add </button>
                </form>
            </div >
        );
    }
}