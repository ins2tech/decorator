
/**
 * @description 记录函数用时以及被调用次数
 * @param prefix 前缀标识
 * @returns 
 */
export default function createTime(isLog: boolean) {
  return function time(prefix?: string | null) {
    let count = 0
    return function (target: any, name: string, descriptor: PropertyDescriptor) {
      const fn = descriptor.value
      if (!prefix) {
        prefix = name
      }
      descriptor.value = function (...args: any[]) {
        const label = `${prefix}-${count}`
        if (isLog) {
          count++
          console.time(label)
        }

        try {
          return fn.apply(this, args)
        } finally {
          if (isLog) {
            console.timeEnd(label)
          }
        }
      }
      return descriptor
    }
  }

}

