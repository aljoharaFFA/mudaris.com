
var Student = require('../model/model');


/*courses documents were created here like this
const Course2 = new coursess({
		CourseName: "PHYSICS",
		CourseDesc: "Physics subject"
	});
	
	Course2.save().then((result) => {
		res.send(result);
	}).catch((err) => {
		console.log(err)
	});
	*/
	
module.exports

exports.createS = async function(req,res){
	//validate req
	if(!req.body){
		res.status(400).send({message:"Content can't be empty"});
		return;
	} 
	
	//new student
	const student = new Student({
		sFname: req.body.sFname,
		sLname: req.body.sLname,
		semail: req.body.semail,
		sPhone: req.body.sPhone,
		sPassword: req.body.sPassword
	});
	
	
	//save user in the database

		
	student
		.save(student)
		.then(data => {
			res.redirect('/studentProfile')//??? check what this does
		})
		.catch(err=>{
			res.status(500).send({
				message: err.message ||"error while creating a user"
			});
		});
		
	
	
};



//update a new user by user ids
exports.update = function(req,res){
	if(!req.body){
			res.status(400).send({message:"data to update is empty"});
			return;
		}
		
		const id = req.params.id;
		Student.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
		.then(data => {
			if(!data){
				res.status(404).send({message: "cannot update user with id: " + id});
			}else{
				res.send(data);
			}
		})
		.catch(err=> {
			res.status(500).send({message : "Error update user information"})
		})
};


// retrieve and return single/all STUDENT/s
exports.find = function(req,res){
	if(req.query.id){
        const id = req.query.id;

        Student.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving user with id " + id})
            })

    } else{
	Student.find()
	.then(user => {
		res.send(user)
	})
	.catch(err=> {
		res.status(500).send({message: err.message || "error while try to retrive user data"})
	})
	}
};

exports.delete = function(req,res){
	const id = req.params.id;
	
	Student.findByIdAndDelete(id)
	
	.then(data=> {
		if(!data){
			res.status(404).send({message: "cannot delete user with id: " + id});
		} else {
			res.send({
				message : "user was deleted"
			})
		}
	})
	.catch(err =>{
		res.status(500).send({message : "Error cannot delete user information"})
		
	})
};