// 檢查 object 共有幾層
function checkLayers(_val, layers){
  let layersCount = 1
  function check(_val){
    Object.keys(_val).forEach(key=>{
      if(typeof _val[key] === 'object' && _val[key] !== null){
        layersCount+=1
        check(_val[key])
      }
    })
  }
  check(_val)
  return layersCount === layers
}

var b = {c:1,a:{a:{a:{a:1}}}}
// test
console.log(checkLayers(b,3))

// 深拷貝
const a = {
  name: '張三',
  children: [
    {son: '小名'},
    {daughter: '小美'}
  ]
}

function clone(obj){
  let _obj = Array.isArray(obj) ? [] : {};
  if(obj && typeof obj === "object"){
      for(key in obj){
          if(obj.hasOwnProperty(key)){
              // 判断obj子元素是否为对象，如果是，递归复制
              if(obj[key] && typeof obj[key] === "object"){
                  _obj[key] = clone(obj[key]);
              } else {
                  // 如果不是，简单复制
                  _obj[key] = obj[key];
              }
          }
      }
  }
  return _obj;
};
const c = clone(a);

