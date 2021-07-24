/**
 * 判断类型
 * @param {any} value 需要比对的值
 * @param {string} type 比对类型
 * @return {boolean} 比对结果
 */
export const sameType = (value: any, type: string) => {
  if (type === 'String') {
    return Object.prototype.toString.call(value) === '[object String]';
  }
  if (type === 'Number') {
    return Object.prototype.toString.call(value) === '[object Number]';
  }
  if (type === 'Symbol') {
    return Object.prototype.toString.call(value) === '[object Symbol]';
  }
  if (type === 'Null') {
    return Object.prototype.toString.call(value) === '[object Null]';
  }
  if (type === 'Undefined') {
    return Object.prototype.toString.call(value) === '[object Undefined]';
  }
  if (type === 'Function') {
    return Object.prototype.toString.call(value) === '[object Function]';
  }
  if (type === 'Object') {
    return Object.prototype.toString.call(value) === '[object Object]';
  }
  if (type === 'Array') {
    return Object.prototype.toString.call(value) === '[object Array]';
  }
  if (type === 'Boolean') {
    return Object.prototype.toString.call(value) === '[object Boolean]';
  }
};
