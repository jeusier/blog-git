var express = require('express');
var app = module.exports = express();
var mongoose = require ('mongoose');


//new mongodb schema to hold articles
var blogSchema = new mongoose.Schema({
	title: String,
	body: String,
	created_at: { type: Date, default: Date.now }
}); //end schema

var blogs = mongoose.model('blogs', blogSchema);

mongoose.connect('mongodb://localhost/blogdb')


// app.get('/blogs/session/:user', function(req, res){
// 	req.session.name = req.params.user;
// 	res.send('<p>Session Set: <a href="/blogs">View Here</a>');
// });


//Find all blogs
app.get('/blogs', function(req, res) {
	if (req.session.name){
		var logged_in = true;
		var session_name = req.session.name;
		console.log(logged_in);
	//find all blogs in collection
	blogs.find(function(err, blog) {
		if (err) {
			console.log("error: blog list isn't displaying")
		}
		//display all blogs into index
		res.render('index', { 
			pageTitle: 'Blog-git',
			articles: blog,
			logged: logged_in

		}); //end of res.render

	}); //end of blogs.find

	} else {
		var logged_in = false;
		console.log(logged_in);

		blogs.find(function(err, blog) {
			if (err) {
				console.log("error: blog list isn't displaying")
			}
		//display all blogs into index
			res.render('index', { 
				pageTitle: 'Blog-git',
				articles: blog,
				logged: logged_in

		}); //end of res.render

	}); //end of blogs.find
	}

}); //end of find all blogs


//Find blog by id
app.get('/blogs/:id', function(req, res) {
if (req.session.name){
	var logged_in = true;
	var blog_id = req.params.id;
	if (blog_id == "new") {
		res.render('new', {pageTitle: 'New Post', logged: logged_in})
	} else {
		//find blog based on id in mongodb
		blogs.findOne({_id: blog_id}, function(err, blog) {
			console.log(blog_id);
			if (err) {
				console.log("error: unable to display blog");
			}
			//display the blog into show
			res.render('show', {pageTitle: 'Update/Delete Post', blog: blog, logged: logged_in});

		}); //end blogs.findById

	}
} else {
	res.send("You are not logged in. <a href='/login'>Log in here</a>");

}

}); //end find blog by id


//Display new blog form
app.get('/blogs/new', function(req, res) {
	if (req.session.name){
		var logged_in = true;
		var blog_new = req.params.new;
		if (blog_new == "new") {
			//display form in new.jade
			res.render('new', {pageTitle: 'New Post', logged: logged_in});
		}
	} else {
		res.send("You are not logged in. <a href='/login'>Log in here</a>");
	}

}); //end of display new blog form


//Create new blog
app.post('/blogs', function(req, res) {
	if (req.session.name){
		//store form values into variables
		var new_title = req.body.title;
		var new_body = req.body.body;
		//create new blog from model
		var new_blog = new blogs({ title: new_title, body: new_body, created_at: { type: Date, default: Date.now }
		}); //end new_blog
		console.log(new_blog);
		//save new blog into mongodb
		new_blog.save(function(err) {
			if (err)
				console.log("error: new blog couldn't save");

		}); //end of new_blog.save
		//display blogs index page
		res.send("<div class='article'> \
			<div class='title'>"+new_blog.title+"</div> \
			<div class='body'>"+new_blog.body+"</div> \
			<div class='created_at'>Created at: "+new_blog.created_at+"</div> \
			</div>"
			);
		return;
	} else {
		res.send("You are not logged in. <a href='/login'>Log in here</a>");
	}

}); //end create new blog


//Update blog
app.put('/blogs/:id', function(req, res) {
	if (req.session.name){	
		//store form variables
		var edit_id = req.params.id;
		var edit_title = req.body.title;
		var edit_body = req.body.body;
		//find the blog in mongodb and replace values
		blogs.findOne({_id: edit_id}, function(err, blog) {
			blog.title = edit_title;
			blog.body = edit_body;

			if(err) {
				console.log("error: unable to update blog");
			}

			blog.save(function(err) {
				if(err)
					console.log("error: couldn't save update");
			});

			res.redirect("..");
			return;

		}); //end blogs.findOne

	} else {
		res.send("You are not logged in. <a href='/login'>Log in here</a>");
	}

}); //end update blog


//Delete blog
app.delete('/blogs/:id', function(req, res) {
	if (req.session.name){	
		//store id into variable
		var delete_id = req.param('id');
		//delete the blog from mongodb
		blogs.find({
			_id: delete_id
		}).remove().exec();
		//go back to blog index page
		res.redirect("..");

	} else {
		res.send("You are not logged in. <a href='/login'>Log in here</a>");
	}	

}); //end of delete blog