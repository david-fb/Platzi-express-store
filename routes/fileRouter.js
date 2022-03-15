const express = require('express');
const router = express.Router();
const path = require('path');

router.post('/upload', (req,res)=>{
  let file;
  let uploadPath;

  if(!req.files || Object.keys(req.files).length === 0){
    return res.status(400).send('No files were uploaded.');
  }
  console.log(path);
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
