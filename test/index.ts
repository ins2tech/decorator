// import { createLog, createTime, catchError } from '../dist/index'
import createLog from '../dist/log'
import createTime from '../dist/time'
import catchError from '../dist/catchError'


const isLog = process.env.NODE_ENV === 'development'
const log = createLog(isLog)
const time = createTime(isLog)
// console.log(log)

class Animal {
    constructor() {

    }

    @catchError(console)
    @log
    @time()
    sayHi(sb: string) {
        console.log('hello+' + sb)
        if (sb !== 'cc') {
            throw new Error('nfajhfdk')
        }
    }
}

const dog = new Animal()
dog.sayHi('ww')