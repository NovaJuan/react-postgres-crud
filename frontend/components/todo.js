import React,{Component} from 'react';

class Todo extends Component{
    constructor(){
        super();
    }
    
    

    render(){
        const {todo} = this.props;
        return(
            <div className='todo'>
                <div className="todo-text">
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                </div>
                <button className='delete-btn' onClick={this.props.deleteTodo}>&times;</button>
                <button className='update-btn' onClick={this.props.updateTodo}>&#x25EF;</button>
            </div>
        )
    }
}

export default Todo;