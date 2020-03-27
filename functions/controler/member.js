const Member = require('../model/Member');
let db  = require('../model/db');  
const collection = db.collection('members'); 


exports.createMember = (req,res,next)=>{
    if(!req.body.name){
        res.status(403).json({
            status: "Required parameter not found"
        })
    }else{
        let newMember = new Member(
                req.body.name,
            );
        collection.add(JSON.parse(JSON.stringify(newMember)))
        .then((result)=>{
            res.status(200).json({
                "status": "ok",
                "id": result.id
            })
        }).catch(error =>{
            res.status(500).json({
                status: "Creating member failed!"+error
            })
        });
    }
}

exports.getMembers = (req,res,next)=>{
    collection.get()
    .then(members => {
        if(members != null ){
            let  a = [];
            members.forEach(member =>{
                a.push({
                    id: member.id,
                    data: member.data()
                })
            })
            res.status(200).json({
                members: a
            })
        }else{
            res.status(404).json({
                status: "Round not found"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            status: "Fetching members failed!"+error
        })
    });
}
