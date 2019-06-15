import React,{Component} from 'react';
import axios from 'axios';

class AddTodo extends Component{
    constructor(){
        super()
        this.state = {
            title:'',
            description:'',
            error:null
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitTodo = this.submitTodo.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.id]:e.target.value
        });
    }

    submitTodo(e){
        e.preventDefault();

        this.setState({error:null});

        if(this.state.title =='' || this.state.description ==''){
            return this.setState({error:'Please fill all fields.'});
        }

        axios.post('/api/todos',this.state)
            .then(res => {
                if(res.error){
                    this.setState({error:'Something went wrong...'});
                }else{
                    this.props.history.push('/');
                }
            }).catch(err =>{
                console.log(err);
                this.setState({error:'Something went wrong...'});
            })       
    }

    render(){
        return(
            <div className='add'>
                <h2>Add Todo</h2>
                {
                    this.state.error ? (<p className="add-error">{this.state.error}</p>):null
                }
                <form onSubmit={this.submitTodo}> 
                    <input type="text" id="title" placeholder="Title" onChange={this.handleChange} />
                    <input type="text" id="description" placeholder="Description" onChange={this.handleChange}/>
                    <button className="submit-btn">ADD</button>
                </form>
            </div>
        )
    }
}

export default AddTodo;