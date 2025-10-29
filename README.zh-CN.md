          
# @instech/decorator

一个轻量级的 JavaScript/TypeScript 装饰器集合，帮助开发者减少重复代码，提升开发效率。

## 特性

- 提供多种实用装饰器，如错误捕获、日志记录、性能统计、加载状态管理、防抖等
- 支持 Vuex 模块的 Getter 和 State 便捷访问
- 完全兼容 TypeScript
- 体积小，无依赖

## 安装

```bash
# 使用 npm
npm install @instech/decorator --save

# 使用 yarn
 yarn add @instech/decorator

# 使用 pnpm
pnpm add @instech/decorator
```

## API 文档

### createLog

开发环境下为函数添加日志记录功能。

**参数：**
- `isLog` (boolean): 是否开启日志记录

**用法：**

```javascript
import { createLog } from '@instech/decorator';

// 根据环境创建日志装饰器
export const log = createLog(process.env.NODE_ENV === 'development');

class Example {
  @log
  doSomething(arg1, arg2) {
    // 函数实现
  }
}
```

### createTime

记录函数执行时间及被调用次数。

**参数：**
- `isLog` (boolean): 是否开启时间记录

**用法：**

```javascript
import { createTime } from '@instech/decorator';

export const time = createTime(process.env.NODE_ENV === 'development');

class Example {
  @time() // 使用默认前缀
  doSomething() {
    // 函数实现
  }
  
  @time('custom-prefix') // 使用自定义前缀
  doSomethingElse() {
    // 函数实现
  }
}
```

### catchError

捕获函数执行过程中的异步和同步错误并进行处理。

**参数：**
- `handler` (object, 可选): 错误处理器对象，需包含 `error` 方法，默认使用 `console`

**用法：**

```javascript
import { catchError } from '@instech/decorator';
import { message } from 'ant-design-vue';

// 创建默认错误处理器
export const handleError = (handler = message) => catchError(handler);

class Example {
  @handleError() // 使用默认处理器
  async fetchData() {
    // 可能抛出异常的异步操作
  }
  
  @catchError(console) // 使用 console 作为处理器
  processData(data) {
    // 可能抛出异常的同步操作
  }
}
```

### debounce

函数防抖装饰器，用于限制函数在短时间内的频繁调用。

**参数：**
- `wait` (number, 可选): 等待时间（毫秒），默认 300ms

**用法：**

```javascript
import { debounce } from '@instech/decorator';

class Example {
  @debounce(500) // 500ms 防抖
  handleInputChange(value) {
    // 处理输入变化
    // 只有在停止输入 500ms 后才会执行
  }
}
```

### loading

加载状态管理装饰器，在函数执行前设置 loading 状态为 true，执行完成后设置为 false。

**参数：**
- `loadingKey` (string, 可选): 控制 loading 状态的属性名，默认 'loading'

**用法：**

```javascript
import { loading } from '@instech/decorator';

class Example {
  mLoading = false;
  
  @loading('mLoading')
  async fetchData() {
    // 异步操作
  }
}
```

### Vuex 模块装饰器

提供便捷访问 Vuex 模块的 Getter 和 State 的装饰器。

#### getModuleStore

**参数：**
- `module`: Vuex 模块实例
- `namespace`: Vuex 模块命名空间

**返回值：**
- 包含 `Getter` 和 `State` 方法的对象

**用法：**

```javascript
import { getModule } from 'vuex-module-decorators';
import { getModuleStore } from '@instech/decorator';
import CsMapModule, { CSMAP_NAME } from './csMap';

// 假设 store 已经被导入或创建
const csMapModule = getModule(CsMapModule, store);
export const csMapStore = getModuleStore(csMapModule, CSMAP_NAME);

// 在组件或类中使用
class Example {
  @csMapStore.Getter('someGetter')
  someGetter;
  
  @csMapStore.State('someState')
  someState;
}
```

## 综合示例

```javascript
import { createLog, createTime, catchError, loading, debounce } from '@instech/decorator';
import { message } from 'ant-design-vue';

// 创建装饰器实例
const log = createLog(process.env.NODE_ENV === 'development');
const time = createTime(process.env.NODE_ENV === 'development');
const handleError = (handler = message) => catchError(handler);

class ApiService {
  loadingState = false;
  
  @handleError()
  @log
  @time('api-call')
  @loading('loadingState')
  async fetchData(params) {
    const response = await fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify(params)
    });
    return response.json();
  }
  
  @debounce(300)
  @log
  search(keyword) {
    return this.fetchData({ keyword });
  }
}

// 使用示例
const api = new ApiService();

// 监听 loading 状态变化
console.log(api.loadingState); // false

// 调用带装饰器的方法
api.search('test').then(data => {
  console.log(data);
});

console.log(api.loadingState); // true，方法执行期间为 true
```

## 兼容性

- 支持现代浏览器 (Chrome, Firefox, Safari, Edge)
- 支持 Node.js 环境
- 需要开启装饰器支持：
  - TypeScript: 在 `tsconfig.json` 中设置 `"experimentalDecorators": true`
  - Babel: 使用 `@babel/plugin-proposal-decorators` 插件

## 开发

```bash

# 安装依赖
pnpm install

# 构建项目
pnpm build

# 运行测试
pnpm test
```

## 许可证

MIT

## 贡献

欢迎提交问题和改进建议。在提交 Pull Request 前，请确保代码通过所有测试。
        