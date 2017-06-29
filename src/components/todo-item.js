import React from 'react';
import './../App.css';

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        }
    }

    renderTodoNameAction() {
        console.log('in rendor Todo Name section');
        const { name, isComplete } = this.props;

        const nameStyle = {
            color: isComplete ? 'green' : 'red',
            cursor: 'pointer',
            textDecoration: isComplete ? 'line-through' : 'none'
        };

        if (this.state.isEditing) {
            return (
                <span>
                    <form onSubmit={this.updateTodoName.bind(this)}>
                        <input ref="editTodo" type="text" defaultValue={name} />
                    </form>
                </span>
            );
        }

        return (
            <span style={nameStyle}> {name} </span>
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
                <button onClick={this.props.handleDelete.bind(this, this.props.id)} > Delete </button>
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
            <li key={this.props.id}>
                <input type="checkbox" ref="isCompleteInput" defaultChecked={this.props.isComplete}
                    onClick={this.isCompleteClick.bind(this, this.props.id)} />
                {this.renderTodoNameAction()}
                {this.renderActionsSection()}
            </li>
        )
    }
}