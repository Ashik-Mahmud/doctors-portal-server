
const { ObjectId } = require("mongodb");
const client = require("../Connection/connection");
const doctorCollection = client.db('doctors-portal').collection("doctors");

const createDoctors = async(req, res) =>{
    await client.connect();
    const uid = req.query.uid;
    const decodedId = req.decoded.uid;    
    if(uid === decodedId){
        const data = req.body;
        const result = await doctorCollection.insertOne(data);
        if(result.acknowledged){
            res.send({success: true, result})
        }
        
    }else{
        res.status(403).send({success:false, message: "Forbidden Access"})
    }
    
   
}

const getAllTheDoctors = async(req,res, next) =>{
    const query = req.query.uid;
    const uid = req.decoded.uid;
    if(query === uid){
        const result = await doctorCollection.find({ }).toArray();
        res.send({success: true, result})
    }else{
        res.status(403).send({success:false, message: 'Doctors List found.'})
    }

}


const deleteDoctorsFromDB = async(req, res) =>{
    const doctorId = req.query.deleteId;
    const decodedId = req.decoded.uid;
    const uid = req.query.uid;
    if(uid === decodedId){
        const query = {_id: ObjectId(doctorId)};
        const result = await doctorCollection.deleteOne(query);
        if(result.acknowledged){
            res.send({success: true, message: "Doctor deleted successfully done."})
        }
    }
    
}



module.exports ={createDoctors, getAllTheDoctors, deleteDoctorsFromDB}