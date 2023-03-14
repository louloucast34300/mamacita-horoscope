const router = require('express').Router();
const axios = require('axios')


router.get('/api', (req, res)=> {
    return res.send('coucou')
})

module.exports = router;