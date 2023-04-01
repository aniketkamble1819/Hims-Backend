let Nationality = require("../models/Nationality");
let express = require("express");

let router = express.Router();

router.post("/",(req,res)=>{
    let body = req.body;
    let object = new Nationality();
    object.id = 0;
    object.name = body.name;
    object.save().then((result)=>{
        res.end(JSON.stringify({ status:"success", data:result}));
    },(err)=>{
        res.end(JSON.stringify({ status:"failed", data:err}));
    }
    )
});
router.get("/", (req, res)=>{
    let object = new Nationality();
    object.list().then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    }, (err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
});
  
router.put("/:id",(req,res)=>{
    let body = req.body;
    let object = new Nationality();
    object.id =req.params.id;
    object.name = body.name;
    object.save().then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    }, (err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
});
router.get("/:id",(req,res)=>{
    let object = new Nationality();
    object.id =req.params.id;
    object.get().then((result)=>{
        if(result.length > 0)
        res.end(JSON.stringify({status:"success", data:result[0]}));
        else
        res.end(JSON.stringify({status:"failed", data:"Record not found"}));

    }, (err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
})
  
router.delete("/:id",(req,res)=>{
    let object = new Nationality();
    object.id =req.params.id;
    object.delete().then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    }, (err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
})




module.exports = router;
