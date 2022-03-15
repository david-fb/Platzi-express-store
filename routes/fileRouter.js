const express = require('express');
const passport = require('passport');

const router = express.Router();
const path = require('path');
const { checkRoles } = require('../middlewares/authHandler')


router.post('/upload',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  (req,res)=>{
  let file;
  let uploadPath;

  if(!req.files || Object.keys(req.files).length === 0){
    return res.status(400).send('No files were uploaded.');
  }

  file = req.files.file;
  const fileName = Date.now()+ "-" + file.name;
  let dir = path.dirname(__dirname)
  uploadPath = dir + ('/uploads/') + "/" + fileName;

  file.mv(uploadPath, function(err) {
    if(err)
      return res.status(500).send(err);

    res.send(`${fileName} File uploaded!`)
  });
});

module.exports = router;
