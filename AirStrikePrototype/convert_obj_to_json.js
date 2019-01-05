fs =require( 'fs')  // 利用fs读取
const vertex = fs.readFileSync('./sphere.txt', 'utf8');
var regex = { // 这里正则只去匹配了我们obj文件中用到数据
    vertex_pattern: /v\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/g, // 顶点
    normal_pattern: /vn\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/g, // 法线
    uv_pattern: /vt\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/g, // 纹理坐标
    face_vertex_uv_normal: /f\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+)\/(-?\d+))?/g, // 面信息
};
const carobj ={
   vertexinfo:[],
   vertexcolor:[],
   
};
handleCar(vertex,carobj);

function handleCar(str, obj) {
    var result;
    while((result = regex.vertex_pattern.exec(str)) !== null) {
            obj.vertexinfo.push(+result[1], +result[2], +result[3]); // 加入到3D对象顶点数组
    } 
}

const color2 = [
   0.2,  0.2,  0.2,  0.8,
   0.1 , 0.1 ,  0.1  , 1  ,
]
let colors =[];
for(let i =0;i<carobj.vertexinfo.length/6;i++){
   colors =  colors.concat(color2);
}
carobj.vertexcolor = colors;

   console.log("准备写入文件");
   fs.writeFile('carobj.json', JSON.stringify(carobj),  function(err) {
      if (err) {
         return console.error(err);
      }
      console.log("数据写入成功！");
   
   });