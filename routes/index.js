var express = require('express');
var router = express.Router();

const UserCtrl = require('../controllers/users');

router.get('/', function(req, res, next) {
  res.json({ success: true });
});

router.post('/saveNewUser', async (req, res) => {
    try {
        console.log("req.body", req.text);
        const result = await UserCtrl.saveNewUser(JSON.parse(req.text));
        res.json(result);
    }
    catch(err) {
        console.error("err", err);
        res.json({
            success: false,
            message: 'Internal error'
        });
    }
})

module.exports = router;
