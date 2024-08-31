


const parse = require("csv-parse").parse;
const fs = require("fs");

const result = [];
//creating a Function

function isHabitabel(planet){
    return planet["koi_disposition"] === "CONFIRMED" && 
    planet["koi_insol"] > 0.36 && planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] > 1.6;
}

//Now here is the code 

fs.createReadStream("kepler_data.csv")
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
    console.log(`${result.length} habitable planet founded !`)
});