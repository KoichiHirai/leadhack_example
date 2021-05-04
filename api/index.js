const secret = require('./secret.js');
const express = require('express');
const app = express();
const request = require('request');
// const fs = require('fs'); // 画像保存のためのモジュール
const PORT = process.env.PORT||3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get("/", function(req,res) {
    res.send("Hello World");
});

app.get("/webhook", (req,res) => {
	res.send("Hello Webhook");
});

app.post("/api", (req,res) => {
	// console.log(req.body.events[0].message.id);
	const option_getImage = {
		url: `https://api-data.line.me/v2/bot/message/${req.body.events[0].message.id}/content`,
		method: 'get',
		headers: {
			'Authorization': 'Bearer ' +  secret.accessToken //外部ファイルから呼びだしたい
		},
		encoding: null
	};
	console.log(option_getImage.url);

	request(option_getImage, (error,response,body) => {
		const buffer = new Buffer.from(body); //画像のバイナリーファイルを格納する変数

		/* 画像保存 
		fs.writeFileSync(`./image.jpg`, body, 'binary');
		console.log(buffer);
		*/

		const option_cv = {
			url: 'https://test-leadhack-vision.cognitiveservices.azure.com/customvision/v3.0/Prediction/d667adcb-7d2b-44e0-b883-8e3c69d2a191/classify/iterations/Iteration1/image',
			method: 'post',
			headers: {
				'Prediction-Key': '4bccd5cc72a543b7b8746738fa2f5c7c',
				'Content-Type': 'application/octet-stream'
			},
			body: buffer
		};
		request.post(option_cv, (error,response,body) => {
			console.log(body);
		});
	});
	res.send();
});

app.listen(3000, () => {
});

/*
//vercel用
(process.env.NOW_REGION) ? module.exports = app : app.listen(PORT);*/