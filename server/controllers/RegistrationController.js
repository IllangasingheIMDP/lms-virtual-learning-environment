
const RegistrationModel=require('../models/RegistrationModel');

const RegistrationController={
    getImageByNIC:async(req,res)=>{
        const {nic}=req.params;
        try {
            const result=await RegistrationModel.getImageByNIC(nic);
            console.log(result);
            res.status(200).send({result:result})
        } catch (error) {
            res.status(500).json({message:"internal server error "+error})
        }
    },
    uploadImage:async(req,res)=>{
        const {nic}=req.body;
        
        const image_url = req.file ? req.file.path : null;
        
        try {
            const result=await RegistrationModel.uploadImage(nic,image_url);
            
            res.status(200).send({result:result, success:true})
        } catch (error) {
            res.status(500).json({message:"internal server error "+error,success:false})
        }
    }
}
module.exports=RegistrationController;