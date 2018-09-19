const express = require('express');
const path = require("path");
var fs = require('fs');
var obj;



const app = express();

app.get('/carPhotos', (req, res) => {

  fs.readFile('info.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    res.json(obj.showcasepics);
  });

  
});

app.get('/Albums', (req, res) => {
  
    fs.readFile('info.json', 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      res.json(obj.albums);
    });
  
    
  });
  app.get('/getAlbum/:key', (req, res) => {
      console.log(req.params.key);
      fs.readFile('info.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        for(var i=0;i<obj.albums.length;i++){
          console.log(obj.albums[i].key+":"+req.params.key);
          
          if(obj.albums[i].key==req.params.key){
            console.log("album found");
            
            res.json(obj.albums[i]);
          }
        }
        
      });
    
      
    });

app.get('/hi', (req, res) => {
  fs.readFile('info.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    res.json(obj.blogposts);
  });

 
});
app.get('/isAdmin/:uid', (req, res) => {
  fs.readFile('info.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log(req.params.uid);
    res.json({isAuth:obj.admins.includes(req.params.uid)});
  });

 
});
//commas seperate the photos
app.get('/addPhotos/:paths/:uid', (req, res) => {
  console.log("adding: "+req.params.paths);
  console.log("from: "+req.params.uid);
  
  fs.readFile('info.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    if(obj.admins.includes(req.params.uid)){
      console.log(req.params.paths[0]);
      //changes %47 back to / since thats what they originally were
      var text=req.params.paths.replace(/&47/g,"/");
      var arrPaths=text.split(",");
      for(var i=0;i<arrPaths.length;i++){
        console.log(arrPaths[i]);
         obj.showcasepics.push(arrPaths[i]);
      }
      console.log("Change Granted.");
      fs.writeFile("info.json",JSON.stringify(obj),'utf8',res.json(console.log("photos added")));
    }
  });
 // test file http://thewowstyle.com/wp-content/uploads/2015/01/nature-image..jpg
 
});


//----------------------------------------------------------------------------------------------test code
const multer = require("multer");
const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

const upload = multer({
  dest: "./"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});


app.post(
  "/upload",
  upload.array("files" /* name attribute of <file> element in your form */,100),//should change this at some point
  (req, res) => {
    const fileNames=[];
    const coverFileNames=[];
    const date=Date.now().toString()+req.body.name.replace(/ /g,"");
    console.log(date);
    //console.log(req.body.name);
    for(name in req.files){
      console.log(req.files[name]);
      if(name<5){
        coverFileNames.push("/uploads/"+date+"/"+req.files[name].originalname);
      }
      fileNames.push("/uploads/"+date+"/"+req.files[name].originalname);
      
      const tempPath = req.files[name].path;
      if (!fs.existsSync("./client/public/uploads/"+date)){
        fs.mkdirSync("./client/public/uploads/"+date);
    }
      const targetPath = path.join(__dirname, "./client/public/uploads/"+date+"/"+req.files[name].originalname);
      if (path.extname(req.files[name].originalname).toLowerCase() === ".jpg"||path.extname(req.files[name].originalname).toLowerCase() === ".png") {
        fs.rename(tempPath, targetPath, err => {
          if (err) return handleError(err, res);

          res
            .status(200)
            .contentType("text/plain")
            .end("File uploaded!");
        });
      } else {
        fs.unlink(tempPath, err => {
          if (err) return handleError(err, res);

          res
            .status(403)
            .contentType("text/plain")
            .end("Only .png and .jpg files are allowed!");
        });
      }
  }

  fs.readFile('info.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    
     
      
      var album={
        name:req.body.name,
        key:date,
        description:req.body.desc,
        timestamp:Date.parse(req.body.date),
        coverPhotos:coverFileNames,
        photos:fileNames};
        obj.albums.push(album);
      
      console.log("Change Granted.");
      fs.writeFile("info.json",JSON.stringify(obj),'utf8',res.json(console.log("photos added")));
    
  });
  /*for(name in req.coverFiles){
    console.log(req.coverFiles[name]);
    const tempPath = req.coverFiles[name].path;
    const targetPath = path.join(__dirname, "./client/uploads/"+req.body.name+new Date.toString()+"/"+req.coverFiles[name].originalname);
    if (path.extname(req.coverfiles[name].originalname).toLowerCase() === ".jpg"||path.extname(req.coverFiles[name].originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png and .jpg files are allowed!");
      });
    }
  }*/

  }
);
//----------------------------------------------------------------------------------------------


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);