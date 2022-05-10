// 檢查 object 共有幾層
function checkLayers(_val, layers) {
  let layersCount = 1;
  function check(_val) {
    Object.keys(_val).forEach((key) => {
      if (typeof _val[key] === "object" && _val[key] !== null) {
        layersCount += 1;
        check(_val[key]);
      }
    });
  }
  check(_val);
  return layersCount === layers;
}

var b = { c: 1, a: { a: { a: { a: 1 } } } };
// test
console.log(checkLayers(b, 3));

// 深拷貝
const a = {
  name: "張三",
  children: [{ son: "小名" }, { daughter: "小美" }],
};

function clone(obj) {
  let _obj = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object") {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === "object") {
          _obj[key] = clone(obj[key]);
        } else {
          _obj[key] = obj[key];
        }
      }
    }
  }
  return _obj;
}
const c = clone(a);

// 處理多層物件轉成格式
let r = {};
let m = {};
function copyDeepObj(_data, valArr, deepArr, callbackArr) {
  if (!Array.isArray(valArr)) valArr = [valArr];
  if (!Array.isArray(deepArr)) deepArr = [deepArr];
  if (!Array.isArray(callbackArr)) callbackArr = [callbackArr];
  if (_data.length < 1) throw 'Error the data is wrong';
  if (valArr.length < 1) throw "Error the value is wrong";
  if (deepArr.length < 1) throw 'Error the deep is wrong'

  for (let key in _data) {
    valArr.forEach((valItem, index) => {
      valItem[key] = {};
      if (deepArr[index] < 0) return;
      if (deepArr[index] > 0)
        copyDeepObj(
          _data[key],
          valItem[key],
          deepArr[index] - 1,
          callbackArr[index]
        );
      if (deepArr[index] === 0) {
        if (typeof callbackArr[index] !== 'function') return
        valItem[key] = callbackArr[index](_data[key], key);
      }
    });
  }
}
arr1func = function (_data, key) {
  if (!["playcode", "playname"].includes(key)) return _data.Value;
  return _data;
};
arr2func = function (_data) {
  return Object.keys(_data).map((play) => _data[play]);
};

copyDeepObj(data, [m, r], [4, 2], [arr1func, arr2func]);

console.log(r);
