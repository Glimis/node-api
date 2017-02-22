import express from 'express';
import email from 'emailjs/email'

var router = express.Router();
router
    .get('/:id', function(req,res){
            var id=req.params.id;
            console.log('id',id)
            M.item.findById(id).exec(function(err,data){
                    var server  = email.server.connect({
                       user:    "912239196@qq.com", 
                       password:"890306", 
                       host:    "smtp.qq.com", 
                       ssl:     true
                    });
                    server.send({
                       text:    "参数如下:"+JSON.stringify(data), 
                       from:    "you <912239196@qq.com>", 
                       to:      "you <912239196@qq.com>",
                       subject: "申请部署"
                    }, function(err, message) {
                        console.log(11)
                        if(err){
                            res.json(err)        
                        }else{
                            res.json({
                                ok:1
                            })
                        }
                 });
            })

    })
export default  router