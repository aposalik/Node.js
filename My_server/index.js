
const http  = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;


const server = http.createServer((req , res)=>{
    const filePath = path.join(__dirname,"index.html");

    fs.readFile(filePath,(err, data)=>{
        if(err){
            res.writeHead(500,{
                "Content-Type": "application/json"
            });
            res.end("Server error 505....")
        }else {
            res.writeHead(200,{
                "Content-Type": "text/HTML"
            });
            res.end(data)
        }
    })

    //Changing the request path 
    const items = req.url.split("/");

    if(items[1] === "/friends"){
        res.writeHead(200,{
            "Content-Type": "text/HTML"
        });
        if(items[3]=== 3){
            
        }
        res.end("Hi bro How you doing !")
    } else if(req.url === "/nigga"){
        res.writeHead(200,{
            "Content-Type": "text/HTML"
        });
        res.end("You are my nigga Abdu Selam ")
    } else {
        res.writeHead(404,{
            "Content-Type": "text/HTML"
        });
        res.end("Page don't found ")
    }


    //Creating a Friends 
    const friends = [
        {
            id:0 ,
            name: "Omida"
        },
        {
            id:1 ,
            name: "Omid"
        },
        {
            id:2 ,
            name: "Rahim"
        },
    ]
});

server.listen(PORT,()=>{
    console.log(`Listening port ${PORT}...`)
})