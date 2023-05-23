export const camel2Underscore = (str: string): string =>
  str.replace(/([A-Z])/g, '_$1').toLowerCase();

/**
 * 将对象的key从驼峰式转为下划线式
 * @param obj 需要转换的对象
 * @returns 转换后的对象
 */
export const tFObjWithCamelKey2Underscore = <T = any>(
  obj: Record<string, T>,
): Record<string, T> => {
  return Object.entries(obj).reduce(
    (res, [key, val]) => ({ ...res, [`${camel2Underscore(key)}`]: val }),
    {},
  );
};

/**
 * 从数组中移除空对象
 * @param arr 需要移除空对象的数组
 * @returns 移除空对象后的数组
 */
export const removeEmptyObjForArr = (arr: Record<string, any>[]) =>
  arr.filter((item) => !!Object.keys(item).length);

export const isEmptyObject = (obj: any) => {
  return typeof obj === 'object' && obj !== null && Object.keys(obj).length === 0;
};

/**
 * 从对象中移除值为空的键值对
 * @param obj 需要移除值为空的键值对的对象
 * @param judgeFn 判断值是否为空的函数，默认为Boolean
 * @returns 移除值为空的键值对后的对象
 */
export const rmEmptyValKey = <T = any>(
  obj: Record<string, T>,
  judgeFn: (val: any) => boolean = Boolean,
): Record<string, T> =>
  Object.entries(obj).reduce((res, [key, val]) => {
    if (val !== null && val !== undefined && judgeFn(val)) {
      return { ...res, [key]: val };
    }
    return res;
  }, {});

/**
 * 获取对象的类型
 * @param obj 需要获取类型的对象
 * @returns 对象的类型
 */
export const getTypeof = (obj: any) =>
  Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

export const isObject = (v: any) => getTypeof(v) === 'object';

/**
 * 判断一个值是否为对象且非空
 * @param value 需要判断的值
 * @returns 是否为对象且非空
 */
export const isNotEmptyObj = (value: any): boolean =>
  isObject(value) && Object.keys(value).length > 0;

/**
 * 将对象转换为树形结构
 * @param obj 需要转换的对象
 * @param header 树形结构的描述title
 * @returns 转换后的树形结构
 */
export type TreeStandardItem = { label: string; value: any };
export type TreeLevelItem = { header: string; children: (TreeStandardItem | TreeLevelItem)[] };
export const tranformObjToTree = (obj: Record<string, any>, header: string): TreeLevelItem => {
  const children: (TreeStandardItem | TreeLevelItem)[] = Object.entries(obj).map(([key, value]) => {
    if (isNotEmptyObj(value)) {
      return tranformObjToTree(value, key);
    }
    return {
      label: key,
      // value: typeof value === 'string' ? value.replace(/"/g, ''): value,
      value,
    };
  });
  return {
    header,
    children,
  };
};

/**
 * 将数组中的对象转换为树形结构
 * @param list 需要转换的数组
 * @param text 树形结构的头部title
 * @returns 转换后的树形结构数组
 */
export const tranformObjInArrToTree = (
  list: Record<string, any>[],
  text: string,
  textIndexShow: boolean,
): TreeLevelItem[] =>
  (list || []).map((item, i) =>
    tranformObjToTree(item, textIndexShow ? `${text}_${i}` : `${text}`),
  );

/**
 * 将对象中的key改成传入的映射key
 * @param obj 需要转换的对象
 * @param map 映射关系
 * @returns 转换后的对象
 */
export const changeParamsFiedsMap = <T = any>(
  obj: Record<string, T>,
  map: Record<string, string>,
): Record<string, T> => {
  return Object.entries(obj).reduce((res, [key, val]) => {
    const newKey = map[key] || key;
    return { ...res, [newKey]: val };
  }, {});
};

/**
 * 将对象转数组 {x0:'1,2,3',x1: '4,5,6'}
 * @param obj 需要转换的对象
 * @returns 转换后格式[{x0:1,x1:4},{x0:2,x1:5},{x0:3,x1:6}]
 */
export const objectToTableArr = (obj: Record<string, string>): Record<string, string>[] => {
  const entries = Object.entries(obj);
  const result: Record<string, string>[] = entries.reduce(
    (acc: Record<string, any>[], [key, value]) => {
      const values: string[] = value.split(',');
      values.forEach((v: string, i: number) => {
        if (!acc[i]) {
          acc[i] = {};
        }
        acc[i][key] = v;
      });
      return acc;
    },
    [],
  );
  return result;
};

/**
 * 将字符串转换为数组或对象
 * @param str 需要转换的字符串
 * @returns 转换后的数组或对象
 */
export const str2ArrOrObj = (str: string): Record<string, any> | any[] => {
  let s: string = str;
  s = s.replace(/\s+/g, '').replace(/([{,]\s*)([a-zA-Z0-9_$]+)\s*:/g, '$1"$2":');
  let jsonObj: Record<string, any> | any[] = JSON.parse(s);
  if (Array.isArray(jsonObj)) {
    jsonObj = jsonObj.map(function (item: any) {
      return str2ArrOrObj(JSON.stringify(item));
    });
    return jsonObj;
  }
  Object.keys(jsonObj).forEach(function (key) {
    const value = (jsonObj as Record<string, any>)[key];
    if (Object.prototype.toString.call(value) === '[object Object]') {
      (jsonObj as Record<string, any>)[key] = str2ArrOrObj(JSON.stringify(value));
    }
  });
  return jsonObj;
};

/**
 * 将字节大小转换为可读的字符串格式
 * @param value 字节大小值
 * @param toFixed 保留的小数位数，默认为2
 * @returns 可读的字符串格式
 */
export const renderSize = (value: number | null, toFixed: number = 2): string => {
  if (null == value) {
    return '0 Bytes';
  }
  let unitArr = new Array('Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB');
  let index = 0,
    srcsize = value;
  index = Math.floor(Math.log(srcsize) / Math.log(1024));
  let size = srcsize / Math.pow(1024, index);

  // 保留的小数位数
  const sizeStr: string = size.toFixed(toFixed);
  return sizeStr + unitArr[index];
};

/**
 * 合并非空参数
 * @param params 需要合并的参数对象
 * @returns 合并后的非空参数对象
 */
export const mergeNotEmpty = (params: Record<string, string>) => {
  return Object.keys(params).reduce((res: Record<string, string>, item: string) => {
    const transItem = params?.[item]?.replace(/\s+/g, '');
    if (transItem !== '') {
      res[item] = transItem;
    }
    return res;
  }, {});
};