/**
 * @description : loading装饰器，在方法前开启loading，调用后关闭loading
 * @author      : neohua
 * @param        {string} loadingKey 调用类控制loading的key
 * @return       {*} 装饰器方法
 */
export default function loading(loadingKey = 'loading') {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value
    descriptor.value = async function (...args: any[]) {
      try {
        (this as any)[loadingKey] = true
        return await fn.apply(this, args)
      } catch (error) {
        throw error
      } finally {
        (this as any)[loadingKey] = false
      }
    }
  }
}
