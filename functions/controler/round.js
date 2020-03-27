const Round = require('../model/Round');
let db  = require('../model/db');  
const collection = db.collection('rounds'); 
const mpCollection = db.collection('markPoints'); 


exports.createRound = (req,res,next)=>{
    if(!req.body.name){
        res.status(403).json({
            status: "Required parameter not found"
        })
    }else{
        let newRound = new Round(
                req.body.name,
                req.body.total_mark,
                []
            );
        collection.add(JSON.parse(JSON.stringify(newRound)))
        .then((result)=>{
            res.status(200).json({
                "status": "ok",
                "id": result.id
            })
        }).catch(error =>{
            res.status(500).json({
                status: "Creating user failed!"+err
            })
        });
    }
}

exports.getRounds = (req,res,next)=>{
    collection.get()
    .then(rounds => {
        if(rounds != null ){
            let  a = [];
            rounds.forEach(round =>{
                a.push({
                    id: round.id,
                    name: round.data().name,
                    total_mark: round.data().total_mark
                })
            })
            res.status(200).json({
                rounds: a
            })
        }else{
            res.status(404).json({
                status: "Round not found"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            status: "Fetching rounds failed!"+err
        })
    });
}



exports.getARound = (req,res,next)=>{
    let doc = req.params.doc;
    let round = collection.doc(doc);

    round.get()
    .then(r=>{
        if(r){
            res.status(200).json({
                id: r.id,
                data: {
                    name: r.data().name,
                    total_mark: r.data().total_mark,
                    mark_points:r.data().mark_points                
                }
            })
        }else{
            res.status(404).json({
                status: "round not found"
            })
        }
    }).catch(error =>{
        res.status(500).json({
            status: "Fetching round failed!"+err
        })
    })
}

exports.addAMarkPoint = (req,res,next) => {
    let doc = req.params.doc;
    let round = collection.doc(doc);
    if(req.body.mark_point_id != null && doc != null){
       db.runTransaction(t => {
           return t.get(round)
           .then(r => {
               let newmarkPoints = [];
               if(r.data().mark_points != null){
                r.data().mark_points.forEach(mp=>{
                    newmarkPoints.push(mp);
                })
               }
               newmarkPoints.push(req.body.mark_point_id);
               t.update(round,{
                   mark_points: newmarkPoints
               })
           })
       })
       .then(result =>{
        res.status(200).json({
            status: "ok"
        })
       })
       .catch(error =>{
        res.status(500).json({
            status: "Error occured"+error
        })
       })
    }else{
        res.status(403).json({
            status: "Required parameter not found"
        })
    }
}


















