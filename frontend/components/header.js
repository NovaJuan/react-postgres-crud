import React,{Component} from 'react';
import {Link,Router} from 'react-router-dom';

function Header(){
    return(
        <div className='header'>
            <h1>React | Postgres CRUD</h1>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/add'>Add</Link></li>
            </ul>
        </div>
    )
}

export default Header;