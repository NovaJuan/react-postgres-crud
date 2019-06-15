import React,{Component} from 'react';
import axios from 'axios';

class UpdateTodo extends Component{
    constructor(){
        super()
        this.state = {
            title:'',
            description:'',
            id:'',
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

    componentDidMount(){
        if(!this.props.location.state){
            return this.props.history.push('/');
        }
        const {title,id,description} = this.props.location.state;
        this.setState({
            title,description,id
        });
    }

    submitTodo(e){
        e.preventDefault();

        this.setState({error:null});

        if(this.state.title =='' || this.state.description ==''){
            return this.setState({error:'Please fill all fields.'});
        }

        const {id,title,description} = this.state;

        axios.put('/api/todos/'+id,{title,description})
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
            <div className='update'>
                <h2>Update Todo</h2>
                {
                    this.state.error ? (<p className="add-error">{this.state.error}</p>):null
                }
                <form onSubmit={this.submitTodo}> 
                    <input type="text" id="title" placeholder="Title" onChange={this.handleChange} value={this.state.title}/>
                    <input type="text" id="description" placeholder="Description" onChange={this.handleChange} value={this.state.description}/>
                    <button className="submit-btn">UPDATE</button>
                </form>
            </div>
        )
    }
}

export default UpdateTodo;