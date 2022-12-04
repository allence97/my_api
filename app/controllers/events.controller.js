const db = require("../models");
const Events = db.events;
const utilFunctions = require("../utils/utilsFunctions");
var fs = require('fs');
var path = require('path');
const console = require("console");

exports.addEvent=(req,res)=>{
        var obj =  {
          name: req.body.name,
          shortDescription : req.body.shortDescription,
          description:req.body.description,
          date : req.body.date,
          price :req.body.price,
          free :  req.body.free,
          img: req.files.map((element)=>{
            var data = {}
            data.data = utilFunctions.base64_encode(element.path),
            data.contentType = element.mimetype
            return data;
        }),
        }
        if(obj.img){
        Events.create(obj, (err, item) => {
            if (err) {
                console.log(err);
            }
            else {
               res.send(item);
            }
        });} else{
            res.status(500).send({message:"Images not found"})
        }


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

exports.delete=async (req,res)=>{
try{
 await Events.deleteOne({_id:req.params.id});
 res.status(204).send({message:"Deeted successfully"});
}catch{
    res.send(404).send({message:"Event not found"});
}  

}

exports.update=(req,res)=>{
  Events.findById(req.params.id).exec(async (err , event)=>{
    console.log(event);

    if(req.body.name){
        event.name = req.body.name;
    }

    if(req.body.description){
        event.description = req.body.description;
    }    
    await event.save();
    if(event){
        res.status(200).send(event);
    }else{
        res.status(404).send({message:"No event found"})
    }

  });
}

exports.fetchAll=async (req,res)=>{
    const events = await Events.find()
	res.send(events);
}
