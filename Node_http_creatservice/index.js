


const http = require("http");
const fs = require("fs");

const server = http.createServer((req,res)=>{
    if(req.url === "/"){
        fs.readFile(__dirname + "/index.html",(err,contant)=>{
            if(err){
                res.writeHead(500);
                res.end(err);
                return;
            }
            res.writeHead(200,{'content-type': "text/html"});
            res.end(contant);
    
        });
    }else if(req.url === "/books"){
        const books = JSON.stringify([
            {name:"You can win",rate:3.5},
            {name:"Its easy",rate:4.5},
        ])
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(books);
    }else if(req.url === "/authors"){
        const authors = JSON.stringify([
            {authors: "Abdullah",year:2017},
            {authors: "Omida",year:2019},
        
        ])
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(authors);
    }else{
        res.writeHead(404);
        res.end("Not fond soory amcek");
    }

});

server.listen(3000);
console.log("Server is listening on port 3000")

