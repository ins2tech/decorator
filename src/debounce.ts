/**
 * @description : 函数debounce防抖装饰器
 * @author      : neohua
 * @param        {number} wait 缓冲时间间隔
 * @return       {Function} 防抖装饰器
 */
export default function debounce(wait = 300) {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    const originalFn = descriptor.value
    let timeoutId: number
    descriptor.value = function (...args: any[]) {
      clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => {
        originalFn.apply(this, args)
      }, wait)
    }
    return descriptor
  }
}
