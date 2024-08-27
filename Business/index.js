

const parse  = require("csv-parse").parse;
const fs = require("fs");
const { Readable } = require("stream");

const result = [];
//creating a Function

function isHabitabel(planet){
    return planet["Industry_code_NZSIOC"] === "AA"
};

//Now here is the code 

fs.createReadStream("annual.csv")
.pipe(parse({
    comment: "#",
    columns: true,
}))
.on("data", (data)=>{
    if(isHabitabel(data)){
        result.push(data)
    }
}).on("error", (err)=>{
    console.log(err)
}).on("end", ()=>{
    console.log(result)
});










