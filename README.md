          
# @instech/decorator

A lightweight collection of JavaScript/TypeScript decorators to help developers reduce repetitive code and improve development efficiency.

## Languages
- [English](https://www.npmjs.com/package/@instech/decorator#readme)
- [中文](https://www.npmjs.com/package/@instech/decorator#readme-zh-cn)

## Features

- Provides various practical decorators such as error catching, logging, performance statistics, loading state management, debouncing, etc.
- Supports convenient access to Vuex module Getters and State
- Fully compatible with TypeScript
- Lightweight with no dependencies

## Installation

```bash
# Using npm
npm install @instech/decorator --save

# Using yarn
yarn add @instech/decorator

# Using pnpm
pnpm add @instech/decorator
```

## API Documentation

### createLog

Adds logging functionality to functions in development environments.

**Parameters:**
- `isLog` (boolean): Whether to enable logging

**Usage:**

```javascript
import { createLog } from '@instech/decorator';

// Create log decorator based on environment
export const log = createLog(process.env.NODE_ENV === 'development');

class Example {
  @log
  doSomething(arg1, arg2) {
    // Function implementation
  }
}
```

### createTime

Records function execution time and call count.

**Parameters:**
- `isLog` (boolean): Whether to enable time recording

**Usage:**

```javascript
import { createTime } from '@instech/decorator';

export const time = createTime(process.env.NODE_ENV === 'development');

class Example {
  @time() // Use default prefix
  doSomething() {
    // Function implementation
  }
  
  @time('custom-prefix') // Use custom prefix
  doSomethingElse() {
    // Function implementation
  }
}
```

### catchError

Catches and handles asynchronous and synchronous errors during function execution.

**Parameters:**
- `handler` (object, optional): Error handler object with an `error` method, defaults to `console`

**Usage:**

```javascript
import { catchError } from '@instech/decorator';
import { message } from 'ant-design-vue';

// Create default error handler
export const handleError = (handler = message) => catchError(handler);

class Example {
  @handleError() // Use default handler
  async fetchData() {
    // Asynchronous operation that may throw exceptions
  }
  
  @catchError(console) // Use console as handler
  processData(data) {
    // Synchronous operation that may throw exceptions
  }
}
```

### debounce

Function debounce decorator to limit frequent calls within a short period of time.

**Parameters:**
- `wait` (number, optional): Waiting time in milliseconds, defaults to 300ms

**Usage:**

```javascript
import { debounce } from '@instech/decorator';

class Example {
  @debounce(500) // 500ms debounce
  handleInputChange(value) {
    // Handle input changes
    // Will only execute 500ms after the last input
  }
}
```

### loading

Loading state management decorator that sets loading state to true before function execution and false after completion.

**Parameters:**
- `loadingKey` (string, optional): Property name controlling the loading state, defaults to 'loading'

**Usage:**

```javascript
import { loading } from '@instech/decorator';

class Example {
  mLoading = false;
  
  @loading('mLoading')
  async fetchData() {
    // Asynchronous operation
  }
}
```

### Vuex Module Decorators

Provides decorators for convenient access to Vuex module Getters and State.

#### getModuleStore

**Parameters:**
- `module`: Vuex module instance
- `namespace`: Vuex module namespace

**Return Value:**
- Object containing `Getter` and `State` methods

**Usage:**

```javascript
import { getModule } from 'vuex-module-decorators';
import { getModuleStore } from '@instech/decorator';
import CsMapModule, { CSMAP_NAME } from './csMap';

// Assuming store has been imported or created
const csMapModule = getModule(CsMapModule, store);
export const csMapStore = getModuleStore(csMapModule, CSMAP_NAME);

// Use in components or classes
class Example {
  @csMapStore.Getter('someGetter')
  someGetter;
  
  @csMapStore.State('someState')
  someState;
}
```

## Comprehensive Example

```javascript
import { createLog, createTime, catchError, loading, debounce } from '@instech/decorator';
import { message } from 'ant-design-vue';

// Create decorator instances
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

// Usage example
const api = new ApiService();

// Monitor loading state changes
console.log(api.loadingState); // false

// Call decorated method
api.search('test').then(data => {
  console.log(data);
});

console.log(api.loadingState); // true, during method execution
```

## Compatibility

- Supports modern browsers (Chrome, Firefox, Safari, Edge)
- Supports Node.js environment
- Requires enabling decorator support:
  - TypeScript: Set `"experimentalDecorators": true` in `tsconfig.json`
  - Babel: Use `@babel/plugin-proposal-decorators` plugin

## Development

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Run tests
pnpm test
```

## License

MIT

## Contribution

Contributions, issues and feature requests are welcome. Please ensure that your code passes all tests before submitting a Pull Request.
        