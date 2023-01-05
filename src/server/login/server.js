const express = require('express')
const app = express()
// 引入中间件，加载请求体内容
const bodyParser = require('body-parser')
const {response} = require("express");
const e = require("express");

app.listen(3000)
// 限制大小，启用中间件
app.use(bodyParser.json({limit:'10mb'}))
app.use(bodyParser.urlencoded({extended: true, limit:'10mb'}))

app.post('/backend/login', (req, res) => {
    const form = req.body
    console.log(form);
    const jsonSuccess = {
        "code": 1,
        "msg": "adipisicing cupidatat aliqua Duis irure",
        "data": "登录成功！",
        "map": {}
    }
    const jsonFail = {
        "code": 0,
        "msg": "adipisicing cupidatat aliqua Duis irure",
        "data": "登录失败，请输入正确的用户名和密码！",
        "map": {}
    }
    if (form.username === 'admin' && form.password === '123123') {
        res.send(JSON.stringify(jsonSuccess))
    } else {
        res.send(JSON.stringify(jsonFail))
    }
})

