import React,{Component} from 'react';
import './css/main.css';
import {Route} from 'react-router-dom';
import Header from './components/header';
import Todos from './components/todos';
import AddTodo from './components/addTodo';
import UpdateTodo from './components/updateTodo';

class App extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <div className="app">
                <div className='container'>
                    <Header/>
                    <Route path='/' exact component={Todos} />
                    <Route path='/add' exact component={AddTodo} />
                    <Route path='/update' exact component={UpdateTodo} />
                </div>
            </div>
        )
    }

}

export default App;