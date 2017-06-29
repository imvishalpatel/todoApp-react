import React from 'react';
import './../App.css';
import _ from 'lodash';
import TodoItem from './todo-item';

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }

    renderItem() {
        const props = _.omit(this.props, 'todos');

        return _.map(this.props.todos, (todo) => <TodoItem key={todo.id} {...todo} {...props} />);
    }

    render() {
        return (
            <div className="todo-header">
                <ul className="Todo-list">
                    {this.renderItem()}
                </ul>
            </div >
        );
    }
}