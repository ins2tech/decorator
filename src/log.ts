
/**
 * @description 开发环境给函数打log
 * @param target 函数
 * @param name 函数名
 * @param descriptor 
 * @returns 
 */
export default function createLog(isLog: boolean) {
  return function log(target: any, name: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value
    descriptor.value = function (...args: any[]) {
      if (isLog) {
        console.log(`${name} called`)
        console.log(...args)
      }
      return fn.apply(this, args)
    }
    return descriptor
  }
}
