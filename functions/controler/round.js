const Round = require('../model/Round');
let db  = require('../model/db');  
const collection = db.collection('rounds'); 


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
                "round": result.data(),
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
                    data: round.data()
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
