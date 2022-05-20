const client = require('../Connection/connection');

const stripe = require('stripe')(process.env.SECRET_STRIPE_KEY);
const createPayment = async(req, res) =>{
    await client.connect();
    const data = req.body;
    const price = Number(data.price) * 100;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: price,
        currency: "usd",
        payment_method_types: ["card"],
    })

    res.send({clientSecret: paymentIntent.client_secret})
}


module.exports={createPayment}