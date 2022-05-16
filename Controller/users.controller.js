const client = require("../Connection/connection");
const userCollection = client.db('doctors-portal').collection("users");
const createUserFromClient = async(req, res) => {
  await client.connect();
  const data = req.body;

  const email = req.query.email;

  const query = {email: email};  
  const updateDoc = {
      $set: data
  }
  const options = {upsert: true};

  const result = await userCollection.updateOne(query, updateDoc, options)
  if(result.acknowledged){
      res.send({success: true, result})
  }
}

const getUsers = async(req, res) =>{
    await client.connect();
    const decodedId = req.decoded.uid;
    const query = {};
    const result = await userCollection.find(query).toArray();
    res.send({success: true, result})

}


const createUserAdmin = async(req, res) =>{
    await client.connect();
    const email = req.query.email;
    const decodedId = req.decoded.uid;
    const uid = req.query.uid;
    const userAccount = await userCollection.findOne({uid: decodedId});
    const isUserAdmin = userAccount?.role === 'admin';
    if(isUserAdmin){
            const data = req.body;
            const filter = {email: email};
            const updateDoc = {
                $set: data
            }
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send({success: true, result}) 
    }else{
            res.send({success:false, message: "Don't have authorization for create admin."})
    }
    
     
}

const isUserAdmin = async(req, res) =>{
  await client.connect();
  const uid = req?.decoded?.uid;
  const isEmail = req?.query?.email;
  const query = {email: isEmail};
  const adminAccount = await userCollection.findOne(query);
  const isAdmin = adminAccount?.role === 'admin';
  res.send({isAdmin})  
}   

module.exports = {createUserFromClient, getUsers, createUserAdmin, isUserAdmin}