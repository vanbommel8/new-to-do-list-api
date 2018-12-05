var express = require ('express');
var manage = require('dani-todo-list');
var router = express.Router();


var toDoList = []
toDoList.push(manage.addToDo("what to do", "Live interdimensional adventures", "Rick"));
toDoList.push(manage.addToDo("what to do", "Go to supermarket", "Morty"));
toDoList.push(manage.addToDo("what to do", "Eat pasta", "Squanchy"));
toDoList.push(manage.addToDo("what to do", "Swimming", "Summer"));
toDoList.push(manage.addToDo("what to do", "Buy pizza", "Beth"));
toDoList.push(manage.addToDo("what to do", "Eat pizza", "Jerry"));
toDoList.push(manage.addToDo("what to do", "Watch netflix", "Jessica"));
toDoList.push(manage.addToDo("what to do", "Kill everyone", "Evil Morty"));

router.get("/todo", function(req, res){
    if((req.query.user == undefined)){
        return res.status(200).json({"toDoList": manage.getToDoList()});
    }
    else            
        if(req.query.user != undefined){
            return res.status(200).json({"message": manage.getListByUser(req.query.user)});
        }
})

router.get("/users", function(req, res){
    res.status(200).json({"users": manage.getUsers()});
})

router.get("/status", function(req, res){
    res.status(200).json({"status": manage.getListByStatus(req.query.completed)});
})

module.exports = router;