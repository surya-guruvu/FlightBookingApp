var express = require('express');
const multer = require('multer');
const path = require('path');
var router  = express.Router();
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads'); // Uploads will be stored in the 'uploads' directory
    },
    filename: function (req, file, cb) {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //   cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        cb(null,file.originalname);
    },
  });
  
const upload = multer({storage:storage});

router.post('/',upload.array('files'),(req,res)=>{
    console.log(req.body);
    console.log(req.files);
    res.json({ message: "Successfully uploaded files" });
});

router.get('/', (req, res) => {
  console.log("I am here")
  const uploadDir = "C:/Users/surya/Downloads/Challenge/Ayrus/uploads";
  console.log(uploadDir);

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      res.status(404).json({ error: 'Error reading directory' });
    } else {
      res.json(files);
    }
  });
});

router.get('/:filename', (req, res) => {
  const fileName = req.params.filename;
  const uploadDir = "C:/Users/surya/Downloads/Challenge/Ayrus/uploads";
  const filePath = path.join(uploadDir, fileName); // Specify the absolute path to the 'uploads' directory
  res.sendFile(filePath);
});

module.exports = router;