const MarkOfTeam = require('../model/MarkOfTeam');
let db  = require('../model/db');  
const collection = db.collection('teamMarks'); 
const markpointCollection = db.collection('markPoints'); 

exports.createTeamMark = (req,res,next)=>{
    if(req.body.mark == null || req.body.team_id == null || req.body.mark_point_id == null  ){
        res.status(403).json({
            status: "Required parameter not found"
        })
    }else{
        let TeamMark = new MarkOfTeam(
                req.body.mark,
                req.body.mark_point_id,
                req.body.judge_id,
                req.body.team_id
             );
        collection.add(JSON.parse(JSON.stringify(TeamMark)))
        .then((result)=>{
            res.status(200).json({
                "status": "ok",
                "id": result.id
            })
        }).catch(error =>{
            res.status(500).json({
                status: "Creating MarkOfTeam failed!"+error
            })
        });
    }
}


exports.getATeamMarks     = (req,res,next) => {
    let totalMark = 0;
    let mark = 0;
    let response = [];
    let team_id = req.params.doc;
    collection.where('team','==',team_id)
    .get()
    .then(teamMarks => {
        if(teamMarks != null){
            teamMarks.forEach(teamMark=>{
                mark = teamMark.data().mark;
                markpointCollection.doc(teamMark.mark_point)
                .get()
                .then(markPoint=>{
                    if(markPoint != null){
                        let weight  = markPoint.data().weight;
                        totalMark = totalMark + (weight * mark )
                        mark = 0;

                    }else{
                        res.status(404).json({
                            status: "Mark Point not found!"
                        })
                    }
                })
                .catch(Error=>{
                    res.status(500).json({
                        status: "Getting markPoint  failed"+Error
                    })
                })
            })
        }else{
            res.status(404).json({
                status: "Team Mark not found!"
            })
        }
    })
    .catch(Error => {
        res.status(500).json({
            status: "Getting MarkOfTeam failed!"+Error
        })
    })
}
