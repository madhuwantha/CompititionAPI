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
                "markpoint": result
            })
        }).catch(error =>{
            res.status(500).json({
                status: "Creating newMarkPoint failed!"+err
            })
        });
    }
}


exports.getMarkPoints = (req,res,next)=>{
    collection.get()
    .then(markpoint=>{
        if(markpoint){
            res.status(200).json({
                markpoints: markpoint
            })
        }else{
            res.status(404).json({
                status: "Markpoint not found"
            })
        }
    }).catch(error =>{
        res.status(500).json({
            status: "Fetching markpoint failed!"+err
        })
    })
}


