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


getAllBlogs = function(req, res) {
    blogs.find(function(err, blog) {
        if (err) {
            console.log("error: blog list isn't displaying")
        }

        if (req.session.name) {
            var logged_in = true;
        } else {
            var logged_in = false;
        }

        res.render('index', {
            pageTitle: 'Blog-git',
            articles: blog,
            logged: logged_in
        });

    });

};


getBlog = function(req, res) {
    var find_id = req.params.id;
    blogs.findOne({_id: find_id}, function(err, blog) {
        if (err) {
            console.log("error: unable to display blog");
        }

        if (req.session.name) {
            var logged_in = true;
        } else {
            var logged_in = false;
        }

        res.render('show', {
            pageTitle: 'View Post',
            blog: blog,
            logged: logged_in

        });
    });
};


getEditBlog = function(req, res) {
    var find_id = req.params.id;
    blogs.findOne({_id: find_id}, function(err, blog) {
        if (err) {
            console.log("error: unable to display blog to edit");
        }

        if (req.session.name) {
            var logged_in = true;
        } else {
            var logged_in = false;
            res.redirect('/login');
            return;
        }

        res.render('edit', {
            pageTitle: 'Update/Delete Blog Post',
            blog: blog,
            logged: logged_in

        });
    });
};


editBlog = function(req, res) {
    var find_id = req.params.id;
    blogs.findOne({_id: find_id}, function(err, blog) {
        if (err) {
            console.log("error: unable to update blog");
        }

        if (req.session.name) {
            var logged_in = true;
        } else {
            var logged_in = false;
            res.redirect('/login');
            return;
        }

        blog.title = req.body.title;
        blog.body = req.body.body;
        
        blog.save(function(err) {
            if (err) {
                console.log("error: unable to save updated blog");
            }
        });

        res.redirect('/blogs/'+find_id);
        return;

    });
};


removeBlog = function(req, res) {
    var find_id = req.params.id;

    if (req.session.name) {
        var logged_in = true;
    } else {
        var logged_in = false;
        res.redirect('/login');
        return;
    }
    blogs.findByIdAndRemove(find_id, function(err) {
        if (err) {
            console.log('error: could not delete blog');
        }
    });

    res.redirect('/');
};


getCreateBlog = function(req, res) {
    if (req.session.name) {
        var logged_in = true;
        res.render('new', {
            pageTitle: 'Create Post',
            logged: logged_in
        });
    } else {
        var logged_in = false;
        res.redirect('/login');
        return;
    }
};


createBlog = function(req, res) {

    if(req.session.name) {
        var logged_in = true;
        var new_blog = new blogs({
            title: req.body.title,
            body: req.body.body,
            created_at: { type: Date, default: Date.now }
        });

        new_blog.save(function(err) {
            if (err) {
                console.log("error: could not save new post");
            }
        });

        res.send({redirect: '/blogs/'+new_blog._id});
    } else {
        var logged_in = false;
        res.redirect('/login');
    }
};


module.exports = function() {

    app.get('/', this.getAllBlogs);
    app.get('/blogs/:id', this.getBlog);
    app.get('/blogs/:id/edit', this.getEditBlog);
    app.put('/blogs/:id/edit', this.editBlog);
    app.delete('/blogs/:id', this.removeBlog);
    app.get('/blogs', this.getCreateBlog);
    app.post('/blogs', this.createBlog);

    return app;

}();