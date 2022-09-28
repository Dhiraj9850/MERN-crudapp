const express = require("express");
const router = express.Router();
const notes = require('../models/noteSchema');



// Adding Notes data   
router.post("/addform",async(req,res)=>{
   // console.log(req.body);
   const {name,desc}  = req.body;
   if(!name || !desc){
      res.status(422).json("please fill the data")
   }

   try {
      const prenote = await notes.findOne({name:name});
      console.log(prenote);

      if(prenote){
         res.status(422).json("this note is already present")
      }
      else{
         const addnote = new notes({
            name,desc
         });

         await addnote.save();
         res.status(201).json(addnote);
         console.log(addnote);
      }

   } catch (error) {
      res.status(422).json(error)
   }
})

// Get Notes data 

 router.get("/getdata",async(req,res)=>{
       try {
          const notedata = await notes.find();
          res.status(201).json(notedata);
       } catch (error) {
          res.status(422).json(error);
       }
 })

// Get an individual Note -(view note)
router.get("/getnote/:id",async(req,res)=>{
   try {
       console.log(req.params);
       const {id} = req.params;

       const noteIndividual = await notes.findById({_id:id})
       res.status(201).json(noteIndividual);
       console.log(noteIndividual);
   } catch (error) {
       res.status(422).json(error);
   }
})
   
// update individual note 

router.patch("/updatenote/:id",async(req,res)=>{
    try {
       const {id} = req.params;

       const updatednote = await notes.findByIdAndUpdate(id,req.body,{
          new:true
       })
       res.status(201).json(updatednote);
    } catch (error) {
       res.status(422).json(error);
    }
})

// delete Note 

router.delete("/deletenote/:id",async(req,res)=>{
   try {
      const {id} = req.params;

      const deletenote = await notes.findByIdAndDelete({_id:id});
      res.status(201).json(deletenote);
   } catch (error) {
      res.status(422).json(error);
   }
})

module.exports = router;