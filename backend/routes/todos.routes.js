const {Router} = require('express');
const router = Router();

const {conn} = require('../db_sql');

router.get('/',async(req,res)=>{
    try {
        const todos = await conn.query('SELECT * FROM todos ORDER BY id DESC');
        res.json(todos.rows);
    } catch (e) {
        console.log(e);
        res.send('Something went wrong.');
    }
});

router.get('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const todos = await conn.query('SELECT * FROM todos WHERE id=$1',[id]);
        res.json(todos.rows[0]);
    } catch (e) {
        console.log(e);
        res.send('Something went wrong.');
    }
});

router.post('/',async(req,res)=>{
    try {
        const {title,description} = req.body;

        await conn.query('INSERT INTO todos (title,description) VALUES ($1,$2)',[title,description]);
        res.json("todo added");
    } catch (e) {
        console.log(e);
        res.json({error:true});
    }
});

router.put('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const {title,description} = req.body;

        await conn.query('UPDATE todos SET title=$1 , description=$2 WHERE id=$3',[title,description,id]);

        res.json("todo updated");

    } catch (e) {
        console.log(e);
        res.json({error:true});
    }
});

router.delete('/:id',async(req,res)=>{
    try {
        const {id} = req.params;

        await conn.query('DELETE FROM todos WHERE id=$1',[id]);

        res.json("todo deleted");
        
    } catch (e) {
        console.log(e);
        res.json({error:true});
    }
});

router.post('/completed/done/:id',async(req,res)=>{
    const {id} = req.params;
    await conn.query('UPDATE todos SET completed=true WHERE id=$1',[id]);
    res.json("todo updated");
});

router.post('/completed/nodone/:id',async(req,res)=>{
    const {id} = req.params;
    await conn.query('UPDATE todos SET completed=false WHERE id=$1',[id]);
    res.json("todo updated");
});

module.exports = router;