var express = require("express");
var app = express();
var cp = require("child_process");
var request = require("request");



app.all('/deploy', (req, res)=>{
    var r = cp.execSync("cd /home/ubuntu/lhp_twins_api && git pull && npm install && pm2 restart API_0");
    res.json(r)
})

app.all('/update', (req, res)=>{
    var r = cp.execSync("cd /home/ubuntu/lph_deploy && git pull && npm install && pm2 restart lph_deploy");
    res.json(r)
})


app.all('/update/api', (req, res)=>{
    var ec2_instances = ["35.163.146.211", "35.163.146.211"];
    var proms = ec2_instances.map((i)=>{
        return new Promise((resolve, reject)=>{
            request.get("http://" + i + ":3000/update", (e,s,b)=>{
                console.log(e,s,b)
                if(e) reject(e)
                resolve(b)
            })
        })        
    })

    Promise.all(proms).then((results)=>{res.json(results)}).catch((e)=>{res.json({error: e})})
})

app.get('/', (req, res)=>{
    res.json({data: "deploy system not working"})
})

app.listen(3333, ()=>{
    console.log("deploy script running on port 3333")
})