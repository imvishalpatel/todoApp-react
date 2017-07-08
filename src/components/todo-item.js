import React from 'react';
import './../App.css';

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        }
    }

    renderName() {
        return (
            <span className="todo-item">{this.props.name}</span>
        );
    }

    updateTodoName(e) {
        e.preventDefault();
        const oldName = this.props.name;
        const updatedName = this.refs.editTodo.value;
        this.props.handleNameUpdate(oldName, updatedName);
        this.setState({ isEditing: false });
    }

    renderActionsSection() {
        console.log('in rendor action section');
        if (this.state.isEditing) {
            return (
                <span>
                    <button onClick={this.onCancelClick.bind(this)} > Cancel </button>
                </span>
            );
        }

        return (
            <span>
                <button onClick={this.onEditClick.bind(this)}> Edit </button>
                <button> Delete </button>
            </span>
        );
    }

    onEditClick() {
        console.log('on edit click');
        this.setState({ isEditing: true });
    }

    onCancelClick() {
        console.log('on cancel click');
        this.setState({ isEditing: false });
    }

    isCompleteClick(id) {
        console.log(id);
        this.props.handleCheckBoxUpdate(id);
    }

    render() {
        return (
            <a href="#" className={
                this.props.completed === true ? "list-group-item list-group-item-success" : "list-group-item"}
                key={this.props.id}>
                <input type="checkbox" ref="isCompleteInput" defaultChecked={this.props.completed}
                    onClick={this.isCompleteClick.bind(this, this.props.id)} />
                {this.renderName()}
                <span className="badge" onClick={this.props.handleDelete.bind(this, this.props.id)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></span>
                {/*<span className="badge" >Delete</span>*/}
            </a>
        )
        {/*<li key={this.props.id} className="list-group-item">
                <input type="checkbox" ref="isCompleteInput" defaultChecked={this.props.completed}
                    onClick={this.isCompleteClick.bind(this, this.props.id)} />
                {this.renderTodoNameAction()}
                {this.renderActionsSection()}
            </li>*/
        }

    }
}