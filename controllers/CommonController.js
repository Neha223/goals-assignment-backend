const Signup = require('../models/signup');
const { default: ShortUniqueId } = require('short-unique-id');
const multer = require("multer");
var fs = require('fs');
const FileReader = require('filereader');

const uid = new ShortUniqueId();

// To access multipart/form-data
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage }).array('file');

const CommonController = {
    signup (req, res) {
        upload(req, res, function (err) {
            console.log('data',req.body);
            const signupData = {
                name: req.body.brandName,
                fileName: req.files[0].filename ,
                details: {
                    name: req.body.detailsName,
                    designation: req.body.detailsDesignation,
                    phone: req.body.detailsPhone,
                    email: req.body.detailsEmail
                },
                status: 'pending'
            }
            console.log("Request file ---", req.files[0]);//Here you get file.
            const newData = new Signup(signupData);
            newData.save( (err,result) => {
                if(err) {
                    return res.status(400).json({message: 'Some Error Occured!'});
                }
                res.status(200).json({
                            status: 200,
                            message: 'Data Saved Successfully!'
                        });
            })
        });
    },
    getAllRecords (req, res) {
        const status = req.query.status;
        console.log(status);
        Signup.find({ "status": status },function (err, records) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({
                    status: 200,
                    message: 'Data Fetch Successfully!',
                    data: records});
            }
        });
    },
    changeStatus (req, res) {
        const data = req.body;
        console.log(req.body);
        Signup.findByIdAndUpdate(data.id, {
            'status': data.status
        }, function (err, data) {
            if (err) {
                res.status(400).json({ 'Record': 'unable to update database', status: 400 });
            } else {
                res.status(200).json({ 'Record': 'Record updated successfully', status: 200 });
            }
        });
    },
    searchData (req, res) {
        const data = req.body;
        console.log(req.body);
        Signup.find({
            'name': data.search,
            'status': data.status
        }, function (err, data) {
            if (err) {
                res.status(400).json({ 'Record': 'unable to update database', status: 400 });
            } else {
                res.status(200).json({ 'Record': 'Record updated successfully', status: 200, data: data });
            }
        });
    },
    checkPhoneByValue (req,res) {
        const phone = req.query.phone;
        Signup.find({
            'details.phone': phone
        }, function (err, data) {
            if (err) {
                res.status(400).json({ 'Record': 'unable to update database', status: 400 });
            } else {
                res.status(200).json({ 'Record': 'Record updated successfully', status: 200, data: data });
            }
        });
    },
    checkEmailByValue (req,res) {
        const email = req.query.email;
        Signup.find({
            'details.email': email
        }, function (err, data) {
            if (err) {
                res.status(400).json({ 'Record': 'unable to update database', status: 400 });
            } else {
                res.status(200).json({ 'Record': 'Record updated successfully', status: 200, data: data });
            }
        });

    }
};

module.exports = CommonController;