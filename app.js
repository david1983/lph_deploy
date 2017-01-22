var express = require("express");
var app = express();
var cp = require("child_process");
var request = require("request");



app.get('/deploy', (req, res)=>{
    var res = cp.execSync("cd ");
    res.json(res)
})

app.get('/', (req, res)=>{
    res.json({data: "deploy system not working"})
})

app.listen(3333, ()=>{
    console.log("deploy script running on port 3333")
})