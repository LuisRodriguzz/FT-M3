// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let newId = 1

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

server.post('/posts', (req, res) => {
    const {author, title, contents} = req.body
    if (!author || !title || !contents) {
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }
    const newPost = {
        id: newId,
        author,
        title,
        contents
    }
    posts.push(newPost)
    newId ++
    res.json(newPost)
})

server.post('/posts/author/:author', (req, res) => {
    const {title, contents} = req.body
    const {author} = req.params
    if (!author || !title || !contents) {
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }
    const newPost = {
        id: newId,
        author,
        title,
        contents
    }
    posts.push(newPost)
    newId ++
    res.json(newPost)
})

server.get('/posts', (req, res) => {
    const {term} = req.query
    if(term) {
       const filtrados = posts.filter(po => po.title.includes(term) || po.contents.includes(term)) 
        return res.json(filtrados)
    }
    return res.json(posts)
})

server.get('/posts/:author', (req, res) => {
    const {author} = req.params
        const autorFiltrado = posts.filter(au => au.author === author)
        if(autorFiltrado.length === 0) {
            return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
        }
        res.json(autorFiltrado)
    
})

server.get('/posts/:author/:title', (req, res) => {
    const {author, title} = req.params
        const autorFiltrado = posts.filter(au => au.author === author && au.title === title)
        if(autorFiltrado.length === 0) {
            return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"})
        }
        res.json(autorFiltrado)
})

server.put('/posts', (req, res) => {
    const {id, title, contents} = req.body
    if(!id || !title || !contents) {
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    }
    const post = posts.find(po => po.id === id)
    if(!post) {
    return res.status(STATUS_USER_ERROR).json({error: "No se encontraron parametros con el id"})
    }
    post.title = title
    post.contents = contents
    res.json(post)
})

server.delete('/posts', (req, res) => {
    const {id} = req.body
    if(!id) {
        return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})
    }
    const postId = posts.find(po => po.id === id)
    if(!postId) {
        return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})
    }
    posts = posts.filter(po => po.id != id)
    res.json({ success: true })
})

server.delete('/author', (req, res) => {
    const {author} = req.body
    if(!author) {
        return res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"})
    }
    const postAuthor = posts.filter(po => po.author === author)
    if(!postAuthor.length) {
        return res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"})
    }
    posts = posts.filter(po => po.author !== author)
    res.json(postAuthor)
})








module.exports = { posts, server };
