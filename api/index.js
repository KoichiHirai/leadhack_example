const express = require('express');
const app = express();
const PORT = process.env.PORT||3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.post("/", (req,res) => {
	console.log(req.body);
	res.send(req.body);
});



app.get("/webhook", (req,res) => {
	res.send("Hello Webhook");
});

app.post("/api", (req,res) => {
	console.log(req.body);
	res.send(req.body);
});

/*
app.listen(3000, function(){
});
*/

(process.env.NOW_REGION) ? module.exports = app : app.listen(PORT);