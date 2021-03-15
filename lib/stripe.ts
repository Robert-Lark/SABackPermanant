import Stripe from 'stripe';

const StripeConfig = new Stripe(process.env.STRIPE_SECRET || '', {
    //COME BACK HERE TO UPDATE THE API SIMPLY HOVER OVER THE API VERSION TO HAVE IT 
    // AUTO IMPORT
    apiVersion:"2020-08-27", 

})

export default StripeConfig