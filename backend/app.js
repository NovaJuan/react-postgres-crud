const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.set('port',process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/api/todos',require('./routes/todos.routes'));

app.use('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
});

app.listen(app.get('port'),()=>{
    console.log('Server on port',app.get('port'));
});