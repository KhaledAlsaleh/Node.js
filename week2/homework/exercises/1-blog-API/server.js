
const express = require('express');
const path = require('path');
const fs = require('fs');


const app = express();
app.use(express.json());


app.get(    '/blogs'        , (req,res) => readAllBlogs(req,res)    );
app.get(    '/blogs/:title' , (req,res) => readSingleBlog(req,res)  );
app.post(   '/blogs'        , (req,res) => creatBlog(req,res)       );
app.put(    '/blogs/:title' , (req,res) => updateBlog(req,res)      );
app.delete( '/blogs/:title' , (req,res) => deleteBlog(req,res)      );


function isInvalid(req){
  if( typeof req.body == "undefined" || typeof req.body.title == "undefined" || typeof req.body.content == "undefined" ){
    return true;
  }else{
    return false;
  }
}

function creatBlog(req,res) { 
  const newBlog = {
    title: req.body.title,
    content: req.body.content
  };

  if(isInvalid(req)){
    return res.status(400).send('Invalid request, please include a title and content!');
  }

  //OR Make sure the input data contain title and content 
  // if(!newBlog.title || !newBlog.content){
  //   return res.status(400).send('Invalid request, please include a title and content!');
  // }

  // Make sure the blog is not exist, so you don't have to create a blog twice or more!
  if(!fs.existsSync(path.join(__dirname, "/blogs", `${req.body.title}.txt`))){
    fs.writeFileSync(path.join(__dirname, "/blogs", `${req.body.title}.txt`),`${newBlog.title}\n${newBlog.content}`); 
    res.status(201).end('Ok, new blog created!');
  }else{ 
    res.status(400).end('Blog is already exist you do not have to create it again!');
  }
}

function updateBlog(req,res) {
  if(isInvalid(req)){
    return res.status(400).send('Invalid request, please include a title and content!');
  }
  // Make sure the blog is exist to update it
  if(fs.existsSync(path.join(__dirname, "/blogs", `${req.params.title}.txt`))){
    fs.writeFileSync(path.join(__dirname, "/blogs", `${req.params.title}.txt`),`${req.body.title}\n${req.body.content}`); 
    res.status(200).end(`Ok, blog ${req.params.title} updated!`); 
  }else{
    res.status(404).end('Blog is not exist!');
  }
}

function deleteBlog(req,res){
  // Make sure the blog is exist to delete it
  if(fs.existsSync(path.join(__dirname, "/blogs", `${req.params.title}.txt`))){
    fs.unlinkSync(path.join(__dirname, "/blogs", `${req.params.title}.txt`));
    res.status(200).end(`Ok, blog ${req.params.title} deleted!`);
  }else{
    res.status(404).end('Blog is not exist!');
  }
}

function readSingleBlog(req,res) {
    // Make sure the blog is exist to read it
  if(fs.existsSync(path.join(__dirname, "/blogs", `${req.params.title}.txt`))){
    const post = fs.readFile(path.join(__dirname, "/blogs", `${req.params.title}.txt`));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(post);
  }else{
    res.status(404).end('Blog is not exist!');
  }
}

function readAllBlogs(req,res) {
  const allFiles = fs.readdirSync(path.join(__dirname, "/blogs"));
  res.writeHead(200, { 'Content-Type' : 'application/json' });
  res.end(JSON.stringify(allFiles));
  // Or res.end(allFiles.toString());
}


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`));