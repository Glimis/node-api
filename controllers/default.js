import express from 'express';

export default function defaultRouter(name){
  var Model=M[name];
  var router = express.Router();
  router
    //查询全部
    .get('/', async function(req, res, next) {
        var data;
        var cb=req.query.cb||{},
            query=req.query.query||{};
        if(cb){
          try{
            cb=JSON.parse(cb);
          }catch(e){
            console.log('获取list,解析cb失败',e)
            cb={}
          }
        }
        var sort=cb.sort;
        var count=await Model.count(query);
        var exe=Model.find(query);
        if(sort){
            exe.sort(sort);
        }
        var limit=cb.limit||20;
        exe.limit(limit);
        var page=cb.page||1;
        var skip=page*limit-limit;
        exe.skip(skip)
        try{
          data=await exe.exec()
        }catch(e){
          console.log('获取list失败',e)
          data=[];
        }

        res.json({
          count:count,
          limit:limit,
          page:page,
          pages:Math.ceil(count/limit),
          list:data
        });
    })
    .get('/all',async function(req, res, next) {
        console.log(1)
        var query= query=req.query.query||{};;
        var data=await Model.find(query);
        res.json(data);
    })
    //添加一个
    .get('/:id',async function(req, res, next) {
        var id=req.params.id;
        var data=await Model.findById(id)
        res.json(data);
    })
    .post('/',async function(req, res, next) {
        var body=req.body||{};
        console.log(req.body,req.query,req.params)
        var data;
        try{
          if(body._id){
            data=await Model.update({_id:body._id},body);
          }else{
            data=await Model.create(body);
          }
        }catch(e){
          console.log(e)
          res.json({
            msg:'error'
          })
        }
        
        res.json(data);
    })

 return router;
}