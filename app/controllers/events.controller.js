const db = require("../models");
const upload = require("../middlewares/upload");
const Events = db.events;
const path = require('path');

const utilFunctions = require("../utils/utilsFunctions");


   

exports.addEvent=(req,res)=>{
   

        var obj =  {
          name: "helo",
          shortDescription : "String",
          description:"String",
          date : "String",
          price :100,
          free : false ,
          img: {
              data:utilFunctions.base64_encode(req.file.path),
              contentType : req.file.mimetype 
          }
        }
        Events.create(obj, (err, item) => {
            if (err) {
                console.log(err);
            }
            else {
               res.send(item);
                // res.send(obj)
            }
        });
    console.log(req);
        // res.send(req.file.path);
    }



exports.fetchOne=(req,res)=>{
    console.log("Fetch one");
console.log(req.params.id);
  Events.findById(req.params.id).exec((err , event)=>{
    console.log(event);
    if(event){
        res.status(200).send(event);
    }else{
        res.status(404).send({message:"No event found"})
    }

  });
 

}