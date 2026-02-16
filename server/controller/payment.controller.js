const Laptop = require('../model/leptop.model');
const AppError = require('../utils/Apperror');
const catchAsync = require('../utils/catchAsync')

const stripe = require('stripe')(process.env.STRIPE_SECRET)

const createCheckoutSession = catchAsync (async (req, res, next) => {
    const products = await Laptop.find({ _id: { $in: req.body } });

    if (!products) {
        return next(new AppError("Laptop cannot be found", 404));
    }

    const lineItems = products.map(product => (
        {
            price_data: {
                currency: 'usd',
                    product_data: {
                    name: product.brand + " " + product.model,
                    description: product.description,
                },
                unit_amount: product.price * 100
            },
            quantity: 1
        }
    ))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        lineItems,
        success_url: "https://localhost:3000/success",
        cancel_url: "https://localhost:3000/cancel",
    })

    res.status(200).json({ url: session.url })
})


module.exports = {
    createCheckoutSession
}
