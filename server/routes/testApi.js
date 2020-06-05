const {Router} = require('express')
const test = require('../models/test')
const router = Router()

router.post('/test', function(req, res, next) {
    
 });

// Create
router.post('/test', function(req, res) {
    var article = {
        title : req.body.title,
        author : req.body.author
    }

    // save record
    test.save(function(err, article){
        if(err) {
            return res.status(500).json({
                message: 'Error saving record',
                error: err
            });
        }
        return res.json({
            message: 'saved',
            _id: article._id
        });
    })
  });

