# rsc-utils

一些实用的工具函数，支持浏览器和node两端使用

## install
 ```
 npm i rsc-utils
 ```
 or
 ```
 yarn add rsc-utils
 ```
## usage
```
// 例如需要引用camel2Underscore方法
import { camel2Underscore } from 'rsc-utils'
```
## api
### camel2Underscore
将驼峰式字符串转换为下划线式字符串

```
const result = camel2Underscore('helloWorld');
console.log(result); // 输出: hello_world

```
### tFObjWithCamelKey2Underscore
将对象的key从驼峰式转为下划线式。适用于统一处理请求对象。这样在拦截器里统一处理就行
```
const obj = { helloWorld: 'example' };
const result = tFObjWithCamelKey2Underscore(obj);
console.log(result); // 输出: { hello_world: 'example' }

```
### removeEmptyObjForArr
从数组中移除空对象。
```
const arr = [{}, { a: 1 }, {}];
const result = removeEmptyObjForArr(arr);
console.log(result); // 输出: [{ a: 1 }]
```

### isEmptyObject
判断一个对象是否为空
```
const obj = {};
const result = isEmptyObject(obj);
console.log(result); // 输出: true

```
### rmEmptyValKey
从对象中移除值为空的键值对。
```
const obj = { a: 1, b: null, c: undefined};
const result = rmEmptyValKey(obj);
console.log(result); // 输出: { a: 1}
```
### getTypeof
获取对象的类型。
```
const obj = { a: 1 };
const result = getTypeof(obj);
console.log(result); // 输出: object
```

### isObject
判断一个值是否为对象。
```
const obj = { a: 1 };
const result = isObject(obj);
console.log(result); // 输出: true
```
### isNotEmptyObj
判断一个值是否为对象且非空。
```
const obj = { a: 1 };
const result = isNotEmptyObj(obj);
console.log(result); // 输出: true
```
### tranformObjToTree
将对象转换为树形结构。
```
const obj = { a: { b: 1, c: 2 }, d: 3 };
const result = tranformObjToTree(obj, 'root');
console.log(result); // 输出: { header: 'root', children: [...] }
```

### tranformObjInArrToTree
将数组中的对象转换为树形结构。
```
const list = [{ a: 1 }, { b: 2 }];
const result = tranformObjInArrToTree(list, 'root', true);
console.log(result); // 输出: [{ header: 'root_0', children: [...] }, { header: 'root_1', children: [...] }]
```
### changeParamsFiedsMap
将对象中的key改成传入的映射key。
```
const obj = { a: 1, b: 2 };
const map = { a: 'x', b: 'y' };
const result = changeParamsFiedsMap(obj, map);
console.log(result); // 输出: { x: 1, y: 2 }
```
### objectToTableArr
将对象转数组。
```
const obj = { x0: '1,2,3', x1: '4,5,6' };
const result = objectToTableArr(obj);
console.log(result); // 输出: [{ x0: 1, x1: 4 }, { x0: 2, x1: 5 }, { x0: 3, x1: 6 }]
```

### str2ArrOrObj
将字符串转换为数组或对象。

```
const str = '{"a": 1, "b": [2, 3]}';
const result = str2ArrOrObj(str);
console.log(result); // 输出: { a: 1, b: [2, 3] }
```

### renderSize
将字节大小转换为可读的字符串格式
```
const value = 1024;
const result = renderSize(value);
console.log(result); // 输出: 1.00 KB
```
### mergeNotEmpty
合并非空参数。

```
const params = { a: '  ', b: 'example' };
const result = mergeNotEmpty(params);
console.log(result); // 输出: { b: 'example' }
```