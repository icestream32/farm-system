const express = require('express')
const app = express()
// 引入中间件，加载请求体内容
const bodyParser = require('body-parser')

app.listen(3000)
// 限制大小，启用中间件
app.use(bodyParser.json({limit:'10mb'}))
app.use(bodyParser.urlencoded({extended: true, limit:'10mb'}))

// 查询接口
app.get('/crop_area', (req, res) => {
    const query = {
        page : req.query.page,
        pageSize : req.query.pageSize,
        name : req.query.name
    }
    console.log(query);
    const json = {
        "code": 99,
        "msg": "non",
        "data": {
            "maxLimit": 45,
            "current": 92,
            "total": 77,
            "pages": 15,
            "searchCount": true,
            "orders": [],
            "size": 14,
            "records": [
                {
                    "id": 30,
                    "cropType": "qui dolore enim eu veniam",
                    "cropRange": "ut",
                    "startTime": "1972-05-08 02:30:41",
                    "endTime": "2017-04-04 21:36:02",
                    "area": "proident ad ex dolor deserunt"
                },
                {
                    "id": 42,
                    "cropType": "Ut Lorem occaecat nisi incididunt",
                    "cropRange": "Duis",
                    "startTime": "2022-04-28 22:40:49",
                    "endTime": "2012-04-17 04:38:00",
                    "area": "eu consequat irure incididunt esse"
                },
                {
                    "id": 97,
                    "cropType": "do ut",
                    "cropRange": "magna sed mollit",
                    "startTime": "2014-12-04 17:20:02",
                    "endTime": "2014-05-28 02:44:09",
                    "area": "sit in est occaecat et"
                }
            ],
            "optimizeCountSql": false,
            "countId": "19"
        },
        "map": {}
    }
    res.send(JSON.stringify(json))
})