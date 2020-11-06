const Signup = require('../models/signup');

const CommonController = {
    signup (req, res) {
        const requestBody = req.body;
        console.log('data',requestBody);
        // // Creates a new record from a submitted form
        // const newOrder = new Order(requestBody);
        // // and saves the record to
        // // the data base
        // newOrder.save( (err, result) => {
        //     // Returns the saved order
        //     // after a successful save
        //     console.log(result);
        //     if (err) {
        //         return res.status(400).json({message: 'Some Error Occured!'});
        //     }
        //     const text = 'Hi, Hurray! You got another order.';
        //     console.log('By using any medium seller can be notified that he got another order: ',text);
        //     // Seller.find((err,result) => {
        //     //     // console.log('seller',result);
        //     //     const seller = result[0];
        //     //     const to = +91 + seller.mobile;
        //     //     const text = 'Hi '+seller.name+', Hurray! You got another order.';
        //     //     console.log(text);
        //     //     // sendSms(to,text)
        //     // });
            
            
           

        //     res.status(200).json({
        //         status: 200,
        //         message: 'Order Placed Successfully!',
        //         orderId: result._id
        //     });
        // } )
    },
    updateStatus (req, res) {
        let idParam = req.body.order_id;
        // Finds a order to be updated
        Order.findOne({_id: idParam}, (err, data) => {
            // Updates the product payload
            data.status = req.body.status;
            // Saves the product
            data.save((err, updated) => {
                console.log(updated);
                res.json({
                    status: 200,
                    message: 'Order Status Updated Successfully!',
                    orderId: updated._id
                })
            });
        })
    },
    byId (req, res) {
        const idParam = req.params.id;
        // Returns a single order
        // based on the passed in ID parameter
        Order
            .findOne({_id: idParam})
            .exec( (err, order) => res.json({
                status: 200,
                message: 'Order Fetched Successfully!',
                order: order
            }) );
    },
    createSeller (req, res) {
        const requestBody = req.body;
        // Creates a new record from a submitted form
        const newSeller = new Seller(requestBody);
        // and saves the record to
        // the data base
        newSeller.save( (err, result) => {
            // Returns the saved order
            // after a successful save
            console.log(result);
            if (err) {
                return res.status(400).json({message: 'Some Error Occured!'});
            }
            res.status(200).json({
                status: 200,
                message: 'Seller Created Successfully!'
            });
        } )
    },
};

module.exports = CommonController;