
export interface ErrorHandler {
  error: (msg: string) => void;
}

export default function catchError(handler: ErrorHandler = console) {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value
    descriptor.value = async function (...args: any[]) {
      try {
        return await fn.apply(this, args)
      } catch (error: unknown) {
        let errMsg = ''
        if (error instanceof Error) {
          errMsg = error.message
        }

        handler && handler.error && handler.error(errMsg)
      }
    }
    return descriptor
  }
}
