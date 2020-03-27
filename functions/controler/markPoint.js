const MarkPoint = require('../model/MarkPoint');
let db  = require('../model/db');  
const collection = db.collection('markPoints'); 


exports.createMarkPoint = (req,res,next)=>{
    if(!req.body.name){
        res.status(403).json({
            status: "Required parameter not found"
        })
    }else{
        let newMarkPoint = new MarkPoint(
            req.body.name,
            req.body.weight
            );
        collection.add(JSON.parse(JSON.stringify(newMarkPoint)))
        .then((result)=>{
            res.status(200).json({
                "status": "ok",
                "id": result.id
            })
        }).catch(error =>{
            res.status(500).json({
                status: "Creating newMarkPoint failed!"+error
            })
        });
    }
}


exports.getMarkPoints = (req,res,next)=>{
    collection.get()
    .then(markpoints=>{
        if(markpoints){
            let a = [];
            markpoints.forEach(markpoint=>{
                a.push({
                    id: markpoint.id,
                    data: markpoint.data()
                })
            })
            res.status(200).json({
                markpoints: a
            })
        }else{
            res.status(404).json({
                status: "Markpoint not found"
            })
        }
    }).catch(error =>{
        res.status(500).json({
            status: "Fetching markpoint failed!"+error
        })
    })
}



exports.getMarkPointsOfRound = (req,res,next)=>{
    let doc = req.params.doc;
    let mp = collection.doc(doc);

    mp.get()
    .then(markpoint=>{
        if(usmarkpointer){
            res.status(200).json({
                id: markpoint.id,
                data: markpoint.data()
            })
        }else{
            res.status(404).json({
                status: "MarkPoint not found"
            })
        }
    }).catch(error =>{
        res.status(500).json({
            status: "Fetching MarkPoint failed!"+error
        })
    })
}