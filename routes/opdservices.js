let Opdservice = require("../models/Opdservice");
let express = require("express");

let router = express.Router();

router.post("/",(req,res)=>{
    let body = req.body;
    let object = new Opdservice();
    object.id = 0;
    object.name = body.name;
    object.srno = body.srno;
    object.defaultfrate = body.defaultfrate;
    object.defaultrate = body.defaultrate;
    object.save().then((result)=>{
        res.end(JSON.stringify({ status:"success", data:result}));
    },(err)=>{
        res.end(JSON.stringify({ status:"failed", data:err}));
    }
    )
});
router.get("/", (req, res)=>{
    let object = new Opdservice();
    object.list().then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    }, (err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
});
  
router.put("/:id",(req,res)=>{
    let body = req.body;
    let object = new Opdservice();
    object.id =req.params.id;
    object.name = body.name;
    object.srno = body.srno;
    object.defaultfrate = body.defaultfrate;
    object.defaultrate = body.defaultrate;
    object.save().then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    }, (err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
});


router.get("/:id",(req,res)=>{
    let object = new Opdservice();
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
    let object = new Opdservice();
    object.id =req.params.id;
    object.delete().then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    }, (err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
})

router.get("/getrates/:doctorid/:categoryid/:opdserviceid", (req, res)=>{
    let object = new Opdservice();
    object.getrates(req.params.doctorid, req.params.categoryid, req.params.opdserviceid).then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    }, (err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    });
});


module.exports = router;
