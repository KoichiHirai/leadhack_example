const express = require('express');
const app = express();
const PORT = process.env.PORT||3000;

app.get("/", function(req,res){
	res.send("Hello World");
});

app.get("/webhook", function(req,res){
	res.send("Hello Webhook");
});

/*
app.listen(3000, function(){
});
*/

(process.env.NOW_REGION) ? module.exports = app : app.listen(PORT);