const Team = require('../model/Team');
let db  = require('../model/db');  
const collection = db.collection('teams'); 

exports.createTeam = (req,res,next)=>{
    if(!req.body.name){
        res.status(403).json({
            status: "Required parameter not found"
        })
    }else{
        let newTeam = new Team(
            req.body.name,
            req.body.university,
            0,
            []);
        collection.add(JSON.parse(JSON.stringify(newTeam)))
        .then((result)=>{
            res.status(200).json({
                "status": "ok",
                "id": result.id
            })
        }).catch(error =>{
            res.status(500).json({
                status: "Creating team failed!"+error
            })
        });
    }
}


exports.getTeams = (req,res,next)=>{
    collection.get()
    .then(teams=>{
        if(teams){
            let a = [];
            teams.forEach(team=>{
                a.push({
                    id: team.id,
                    data: team.data()
                })
            })
            res.status(200).json({
                teams: a
            })
        }else{
            res.status(404).json({
                status: "Teams not found"
            })
        }
    }).catch(error =>{
        res.status(500).json({
            status: "Fetching teams failed!"+error
        })
    })
}


