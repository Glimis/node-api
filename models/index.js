import mongoose from 'mongoose'
import {db} from '../config' 
import fs from 'fs'
import path from 'path'

mongoose.connect(db.uri, db.opts);
const modelsDir =__dirname;

export default  function fn(){
    fs.readdirSync(modelsDir).forEach(function (name) {
      name=name.slice(0,name.length-3);
      if(name!='index'){
        var model=require(path.join(modelsDir, name)).default;
        M[name] = mongoose.model(name, model);
      }
    })
}