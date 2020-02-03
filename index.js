var express = require('express');
const Jimp = require('jimp');
const fs = require('fs')
const path = require('path');

var app = express();
app.get("/:size",async function(req,res){
    //res.ro
    var size = parseInt( req.params.size);
    await sendResponse(res,size,size);
})
app.get("/:width/:height",async function(req,res){
    var width = parseInt(req.params.width);
    var height = parseInt(req.params.height);
    await sendResponse(res,width,height);
})
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })
 async function sendResponse(res,width,height) 
{
    
    const imagesPath = path.join(__dirname,"images")
    fs.readdir(imagesPath,async function (err, files) {
        //handling error
        if (err) {
            res.send(err)
        } 
        console.log(width)
        console.log(height)
        //listing all files using forEach
        var index = getRandomInt(files.length)
        var imagePath  =path.join(imagesPath,files[index])
        Jimp.read(imagePath, async (err, lenna) =>  {
            if (err){
                res.send(err);
            };
            await lenna
              .resize(parseInt(width),parseInt(height)) // resize
              .quality(90) // set JPEG quality
              .writeAsync('resized_image.png'); // save
              
              res.sendFile(__dirname+"/resized_image.png")
              //fs.unlinkSync(__dirname+"/resized_image.png")
    
          });
        //res.send(files[index])
        
    });
   
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }