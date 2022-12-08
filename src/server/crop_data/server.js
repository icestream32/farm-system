const express = require('express')
const app = express()
// 引入中间件，加载请求体内容
const bodyParser = require('body-parser')
const {response} = require("express");

app.listen(3000)
// 限制大小，启用中间件
app.use(bodyParser.json({limit:'10mb'}))
app.use(bodyParser.urlencoded({extended: true, limit:'10mb'}))

// 删除操作接口
app.delete('/crop_data', (request, response) => {
    console.log(request.body);
    let json = {
        "code": 1,
        "msg": "",
        "data": "删除成功！",
        "map": {}
    }
    response.send(JSON.stringify(json))
})

// 添加操作接口
app.post('/crop_data', (request, response) => {
    console.log(request.body);
    let json = {
        "code": 7,
        "msg": "",
        "data": "添加成功！",
        "map": {}
    }
    response.send(JSON.stringify(json))
})

// 修改操作接口
app.put('/crop_data', (request, response) => {
    console.log(request.body);
    let json = {
        "code": 32,
        "msg": "",
        "data": "修改成功！",
        "map": {}
    }
    response.send(JSON.stringify(json))
})

// 查询操作接口
app.get('/crop_data/page', (request, response) => {
    const query = {
        page : request.query.page,
        pageSize : request.query.pageSize,
        name : request.query.name
    }
    console.log(query);
    let json = {
        "code": 1,
        "msg": "dolor sint voluptate",
        "data": {
            "current": 22,
            "maxLimit": 95,
            "countId": "87",
            "pages": 38,
            "optimizeCountSql": true,
            "orders": [],
            "records": [
                {
                    "id": 1,
                    "cropType": "id nisi",
                    "longitude": "magna Duis cillum mollit in",
                    "latitude": "commodo pariatur aliquip",
                    "date": "2000-09-05",
                    "userId": 88
                },
                {
                    "id": 60,
                    "cropType": "do enim sit",
                    "longitude": "Lorem aute in",
                    "latitude": "qui",
                    "date": "2017-06-23",
                    "userId": 84
                },
                {
                    "id": 91,
                    "cropType": "consectetur adipisicing",
                    "longitude": "officia dolor consectetur esse in",
                    "latitude": "sunt in",
                    "date": "1975-06-11",
                    "userId": 35
                }
            ],
            "total": 60,
            "size": 60,
            "searchCount": true
        },
        "map": {}
    }
    response.send(JSON.stringify(json))
})
