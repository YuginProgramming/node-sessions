var express = require('express');
var router = express.Router();
const upload = require('multer')();
router.get('/', (req,res) => {
    res.render('login');
});

const user = {
    login: 'vit',
    password: '123',
    id: 234
}

router.post('/login', upload.none(), (req,res) => {
  console.log('req:', req.body)  
  const { login, password } = req.body;
    if ( login !== user.login || password !== user.password ) {
    res.json({ status: 'fail' })
    return;
    }
    req.session.user = user.id;
    res.json({ status: 'ok', payload: { user_id: user.id }});
});

router.get('/status', (req, res, next) => {
    if(!req.session.user) {
        res.json({ status: 'ok', payload: {auth: 'guest'}})
        return;
    } 
    res.json({ status: 'ok', payload: {auth: 'auth', userId: req.session.user}})
})

module.exports = router;
