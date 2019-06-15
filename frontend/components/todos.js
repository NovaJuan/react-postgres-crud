import React,{Component} from 'react';
import axios from 'axios';
import Todo from './todo';

class Todos extends Component{
    constructor(){
        super();
        this.state = {
            todos:[],
            error:null
        };

        this.fetchTodos = this.fetchTodos.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
    }

    componentDidMount(){
        this.fetchTodos();
    }

    fetchTodos(){
        axios.get('/api/todos/')
            .then(res => {
                if(res.error){
                    this.setState({
                        error:'Something went wrong on our Database...'
                    });
                }else{
                    if(res.data.length > 0){
                        this.setState({ 
                            todos:res.data
                        });
                    }else{
                        this.setState({ 
                            todos:null
                        });
                    }
                }
            }).catch(err =>{
                console.log(err);
                this.setState({error:'Something went wrong...'});
            });
    }

    deleteTodo(id){
        if(confirm('Sure you want to delete it?')){
            axios.delete('/api/todos/' + id)
                .then(res=>{
                    if(res.error){
                        this.setState({
                            error:'Something went wrong on our Database...'
                        });
                    }else{
                        var newTodos = this.state.todos.filter(todo=>todo.id !== id);
                        if(newTodos.length < 1){
                            this.setState({todos:null});
                        }else{
                            this.setState({todos:newTodos});
                        }
                    }
                }).catch(err =>{
                    console.log(err);
                    this.setState({error:'Something went wrong...'});
                });
        }
    }

    updateTodo(todo){
        this.props.history.push({
            pathname:'/update',
            state:{
                title:todo.title,
                description:todo.description,
                id:todo.id
            }
        });
    }


    render(){
        var todos = (this.state.todos != null) ? (this.state.todos.map(todo => (<Todo todo={todo} key={todo.id} deleteTodo={()=>{this.deleteTodo(todo.id)}} updateTodo={()=>{this.updateTodo(todo)}}/>))):(<p>No todos for you!</p>)
        return(
            <div className='todos'>
                {this.state.error ? (<p>{this.state.error}</p>):null}
                {todos}
            </div>
        )
    }
}

export default Todos;