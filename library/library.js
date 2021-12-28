// 檢查 object 共有幾層
function checkLayers(_val,layers){
  let layersCount = 1
  function check(_val){
    Object.keys(_val).forEach(key=>{
      if(typeof _val[key] === 'object'){
        layersCount+=1
        check(_val[key])
      }
    })
  }
  check(_val)
  return layersCount === layers
}

var b = {c:1,a:{a:{a:{a:1}}}}
console.log(checkLayers(b,3))
