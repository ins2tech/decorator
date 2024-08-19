# skylar/decorator
装饰器函数，加速开发


# 本地开发测试
```bash
pnpm add /Users/mac/skylar/skylarnpm/decorator

```


# 安装
`
npm i @skylar/decorator -save
`
或者
`
pnpm i @skylar/decorator -save
`

# 使用
```javascript
import { log,time,catchError } from '@skylar/decorator'

import { message } from 'ant-design-vue'
const yourErrorHandler=catchError(message)
//init
@catchError(console)
@log
@time()
fun(){

}









```


```javascript
// store/index.ts
import { getModule } from 'vuex-module-decorators'
import CsMapModule, { CSMAP_NAME } from './csMap'
import { getModuleStore } from '@skylar/decorator'


export const csMapModule = getModule(CsMapModule, store)
export const csMapStore = getModuleStore(csMapModule, CSMAP_NAME)
```