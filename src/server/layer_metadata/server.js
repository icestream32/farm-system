const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// 设置监听端口
app.listen(3000)
// 限制大小，启用中间件
app.use(bodyParser.json({limit:'10mb'}))
app.use(bodyParser.urlencoded({extended:true, limit:'10mb'}))

// 添加操作接口
app.post('/layer_metadata', (req, res) => {
    console.log(req.body);
    res.send("添加成功！")
})

// 删除操作接口
app.delete('/layer_metadata', (req, res) => {
    console.log(req.body);
    res.send("删除成功！")
})

// 修改操作接口
app.put('/layer_metadata', (request, response) => {
    console.log(request.body);
    response.send("修改成功！")
})

// 查询操作接口
app.get('/layer_metadata/page', (request, response) => {
    // 打印输出接收到的请求
    const query = {
        page : request.query.page,
        pageSize : request.query.pageSize,
        name : request.query.name
    }
    console.log(query);
    let json = {
        "code": 90,
        "msg": "Lorem officia voluptate minim",
        "data": {
            "pages": 91,
            "records": [
                {
                    "id": 64,
                    "cropType": "in aute laboris",
                    "area": "eu officia est irure",
                    "metaDate": "1991-05-16",
                    "metaPath": "culpa adipisicing dolore magna",
                    "metaName": "好了九计造想细",
                    "param": "commodo dolore"
                },
                {
                    "id": 28,
                    "cropType": "ut id labore consequat reprehenderit",
                    "area": "proident in fugiat occaecat consectetur",
                    "metaDate": "2001-12-27",
                    "metaPath": "anim ad adipisicing et dolor",
                    "metaName": "三么切和线定",
                    "param": "ipsum enim et minim mollit"
                },
                {
                    "id": 86,
                    "cropType": "elit dolor",
                    "area": "nulla anim nostrud consectetur",
                    "metaDate": "2009-11-24",
                    "metaPath": "cupidatat laborum fugiat ut",
                    "metaName": "生全情程要",
                    "param": "sit commodo veniam amet"
                }
            ],
            "optimizeCountSql": false,
            "current": 59,
            "maxLimit": 70,
            "size": 77,
            "orders": [],
            "searchCount": false,
            "countId": "7",
            "total": 95
        },
        "map": {}
    }
    response.send(JSON.stringify(json))
})