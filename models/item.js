import {Schema} from 'mongoose'




export default new Schema({
    //功能点
   gnd:String,
   //详细描述
   xxms:String,
   //影响节点
   yxjd:String,
   // 版本号
   bbh:String,
   //show环境开发测试结果
   showkf:Boolean,
   //负责人
   kffzr:String,
   //show测试
   showcs:Boolean,
   //al测试结果
   alcs:Boolean,
   csfzr:String,
   remark:String,
   date: { type: Date, default: Date.now },
   //申请次数
   count:{type:Number,default:0}
});