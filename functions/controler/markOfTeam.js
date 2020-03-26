const MarkOfTeam = require('../model/MarkOfTeam');
let db  = require('../model/db');  
const collection = db.collection('teamMarks'); 


exports.createTeamMark = (req,res,next)=>{
    if(!req.body.mark){
        res.status(403).json({
            status: "Required parameter not found"
        })
    }else{
        let TeamMark = new MarkOfTeam(
                req.body.mark,
                req.body.mark_point,
                req.body.judge,
                req.body.team
             );
        collection.add(JSON.parse(JSON.stringify(TeamMark)))
        .then((result)=>{
            res.status(200).json({
                "status": "ok",
                "mark_of_team": result
            })
        }).catch(error =>{
            res.status(500).json({
                status: "Creating MarkOfTeam failed!"+err;
            })
        });
    }
}



