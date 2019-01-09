fs =require( 'fs')  // 利用fs读取
const vertex = fs.readFileSync('./reside/reside.obj', 'utf8');
var regex = { // 这里正则只去匹配了我们obj文件中用到数据
    vertex_pattern: /v\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/g, // 顶点
    normal_pattern: /vn\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/g, // 法线
    uv_pattern: /vt\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/g, // 纹理坐标
    face_vertex_uv_normal: /f\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+)\/(-?\d+))?/g, // 面信息
};
function gl_obj() {};  //这是个类，类的规则写好了，之后 new一个新的就可用了
gl_obj.prototype.vertexArr=[]
gl_obj.prototype.normalArr=[]
gl_obj.prototype.uvArr=[]

gl_obj.prototype.normal=[]
gl_obj.prototype.vertex=[]
gl_obj.prototype.uv=[]

gl_obj.prototype.addFace=function(data){
   this.addIndex(+data[1], +data[4], +data[7], +data[10]);
   this.addUv(+data[2], +data[5], +data[8], +data[11]);
   this.addNormal(+data[3], +data[6], +data[9], +data[12]);

}

gl_obj.prototype.addIndex = function(a, b, c, d) {
    if(!d) {
        this.vertex.push(  //有些f里，就是一个面有三个点
            this.vertexArr[3*a], this.vertexArr[3*a+1], this.vertexArr[3*a+2],
            this.vertexArr[3*b], this.vertexArr[3*b+1], this.vertexArr[3*b+2],
            this.vertexArr[3*c], this.vertexArr[3*c+1], this.vertexArr[3*c+2]
        );
    } else {//有些有两个
        this.vertex.push(
            this.vertexArr[3*a], this.vertexArr[3*a+1], this.vertexArr[3*a+2],
            this.vertexArr[3*b], this.vertexArr[3*b+1], this.vertexArr[3*b+2],
            this.vertexArr[3*c], this.vertexArr[3*c+1], this.vertexArr[3*c+2],
            this.vertexArr[3*a], this.vertexArr[3*a+1], this.vertexArr[3*a+2],
            this.vertexArr[3*c], this.vertexArr[3*c+1], this.vertexArr[3*c+2],
            this.vertexArr[3*d], this.vertexArr[3*d+1], this.vertexArr[3*d+2],
        );
    }
};

gl_obj.prototype.addNormal = function(a, b, c, d) { 
   if(!d) {
        this.normal.push(
            this.normalArr[3*a], this.normalArr[3*a+1], this.normalArr[3*a+2],
            this.normalArr[3*b], this.normalArr[3*b+1], this.normalArr[3*b+2],
            this.normalArr[3*c], this.normalArr[3*c+1], this.normalArr[3*c+2]
        );
    } else {
        this.normal.push(
            this.normalArr[3*a], this.normalArr[3*a+1], this.normalArr[3*a+2],
            this.normalArr[3*b], this.normalArr[3*b+1], this.normalArr[3*b+2],
            this.normalArr[3*c], this.normalArr[3*c+1], this.normalArr[3*c+2],
            this.normalArr[3*a], this.normalArr[3*a+1], this.normalArr[3*a+2],
            this.normalArr[3*c], this.normalArr[3*c+1], this.normalArr[3*c+2],
            this.normalArr[3*d], this.normalArr[3*d+1], this.normalArr[3*d+2],
        );
    }
};
gl_obj.prototype.addUv = function(a, b, c, d) {
    if(!d) {
        this.uv.push(this.uvArr[2*a],this.uvArr[2*a+1] );
        this.uv.push(this.uvArr[2*b],this.uvArr[2*b+1] );
        this.uv.push(this.uvArr[2*c],this.uvArr[2*c+1] );
    } else {
        this.uv.push(this.uvArr[2*a],this.uvArr[2*a+1] );
        this.uv.push(this.uvArr[2*b],this.uvArr[2*b+1] );
        this.uv.push(this.uvArr[2*c],this.uvArr[2*c+1] );
        this.uv.push(this.uvArr[2*a],this.uvArr[2*a+1] );
        this.uv.push(this.uvArr[2*c],this.uvArr[2*c+1] );
        this.uv.push(this.uvArr[2*d],this.uvArr[2*d+1] );
    }
};
const sunobj = new gl_obj();  //实例化了一个太阳
handleobj(vertex,sunobj);

function handleobj(str, obj) {
   var result;
   obj.vertexArr.push(0,0,0);//regex.vertex_pattern.exec(str)这种就是正则匹配，你们可以在debug下跟跟，看是怎么工作的
   obj.uvArr.push(0,0);
   obj.normalArr.push(0,0,0); //这里非常tricky，f中的点是从1开始算的，而数组 【0】是起点，我塞入一个新点，之后的就一样了，这里不塞0，0，0，塞入x,x,x都行
   while((result = regex.vertex_pattern.exec(str)) !== null) {
            obj.vertexArr.push(+result[1], +result[2], +result[3]); // 加入到3D对象顶点数组
   }
   while((result = regex.normal_pattern.exec(str)) !== null) { //加入每个顶点的发向量
      obj.normalArr.push(+result[1], +result[2], +result[3]); 
   }
   while((result = regex.uv_pattern.exec(str)) !== null) {//加入纹理信息
      obj.uvArr.push(+result[1], +result[2]); 
   }
   while((result = regex.face_vertex_uv_normal.exec(str)) !== null) {
      obj.addFace(result);  // ！！！！！！！！！！以上数据均无顺序，我在这个addface中，
							//利用 f x/x/x x/x/x x/x/x x/x/x 把每一个顶点按塞到新的vertex，normal，uv中，这些信息可以直接用，不用index什么的再排序
   }
}

const final_sun_obj = {
   vertex:sunobj.vertex,  //vertexArr保存的是无顺序信息，不用，vertex是有顺序的 uv，normal同理！！
   uv:sunobj.uv,
   normal : sunobj.normal,
}

console.log("准备写入文件");
fs.writeFile('reside.json', JSON.stringify(final_sun_obj),  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
  
});