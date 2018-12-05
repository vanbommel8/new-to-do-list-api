var express = require ('express');
var manage = require('dani-todo-list');
var router = express.Router();

var isPrime = function(num){
    for(var i = 2; i < num; i++){
        if(num % i === 0){
            return false;
        } 
        return num !== 1 && num !== 0;
    }
}

var authentication = function(req, res, next){
    if(isPrime(parseInt(req.query.token))){
        next();
    }
    else{
        return res.status(401).json({error: "token not valid"});
    }

}
router.post("/addtodo", authentication, function(req, res, next){
    manage.addToDo(req.body.name, req.body.description, req.body.assignedTo);
    res.status(201).json({"newToDo": manage.getListByUser(req.body.assignedTo)}); 
})

router.put("/change", authentication, function(req, res, next){
    manage.changeStatus(req.body.id, req.body.completed);
    res.status(200).json({"newStatus": manage.getListByStatus(req.body.completed)}); 
})

router.delete("/:id", authentication, function(req, res, next){
    id = parseInt(req.params.id);
    if(manage.deleteToDo(id)){
        return res.status(200).json({"message": "element eliminated"});
    }
    else{
        return res.status(404).json({"error": "resource already eliminated"});
    }
})

module.exports = router;