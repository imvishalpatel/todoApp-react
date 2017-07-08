import React from 'react';
import './../App.css';

export default class TodoHeader extends React.Component {
    constructor(props) {
        super(props);
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
            <div className="row text-center">
                <form onSubmit={this.handleSubmit.bind(this)} className="form-inline">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Anything on mind???" ref="todoInput" />
                        <span className="input-group-btn"><button className="btn btn-default btn-success">Add</button></span>
                    </div>
                </form>
            </div >
        );
    }
}