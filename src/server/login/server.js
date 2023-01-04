const express = require('express')
const app = express()
// 引入中间件，加载请求体内容
const bodyParser = require('body-parser')
const {response} = require("express");

app.listen(3000)
// 限制大小，启用中间件
app.use(bodyParser.json({limit:'10mb'}))
app.use(bodyParser.urlencoded({extended: true, limit:'10mb'}))

