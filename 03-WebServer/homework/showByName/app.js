var fs  = require("fs")
var http  = require("http")
const { resolve } = require("path")

// Escribí acá tu servidor

http.createServer((req, res) => {

    fs.readFile(`./images${req.url}.jpg`, (err, data) => {
        if(err) {
            res.writeHead(404, {'Content-Type': 'text/plain'})
            res.end(`Img not found`)
        } else {
            res.writeHead(200, {'Content-Type': 'image/jpg'})
            res.end(data)
        }
    })

}).listen(1337, '127.0.0.1')