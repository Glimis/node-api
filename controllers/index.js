import fs from 'fs'
import path from 'path'
const controllersDir =__dirname;
export default  function fn(app){
    var apis=[];
    fs.readdirSync(controllersDir).forEach(function (name) {
      name=name.slice(0,name.length-3);
      if(name!='index'&&name!='default'){
        var router=require(path.join(controllersDir, name));
        app.use("/"+name, router.default);
        apis.push('./controllers/'+name+".js");
      }
    })

    var options = {
      swaggerDefinition: {
        info: {
          title: 'biz', 
          version: '1.0.0', 
        },
      },
      apis: apis, 
    };
  

    app.get('/swagger.json', function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });
}