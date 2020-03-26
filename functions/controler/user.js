const User = require('../model/User');
let db  = require('../model/db');  
const collection = db.collection('users'); 


exports.createUser = (req,res,next)=>{
    if(!req.body.name){
        res.status(403).json({
            status: "Required parameter not found"
        })
    }else{
        let newUser = new User(req.body.name);
        collection.add(JSON.parse(JSON.stringify(newUser)))
        .then((result)=>{
            res.status(200).json({
                "status": "ok",
                "result": result.data(),
                "id": result.id
            })
        }).catch(error =>{
            res.status(500).json({
                status: "Creating user failed!"+err
            })
        });
    }
}

exports.getUser = (req,res,next)=>{
    let doc = req.params.doc;
    let user = collection.doc(doc);

    user.get()
    .then(user=>{
        if(user){
            res.status(200).json({
                id: user.id,
                user: user.data()
            })
        }else{
            res.status(404).json({
                status: "User not found"
            })
        }
    }).catch(error =>{
        res.status(500).json({
            status: "Fetching user failed!"+err
        })
    })
}

