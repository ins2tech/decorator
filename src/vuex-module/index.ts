
import ModuleGetter from "./ModuleGetter"
import ModuleState from "./ModuleState"

/**
 * 获取模块store的Getter,State装饰器
 * @param module store module
 * @param namespace 命名空间
 * @returns 返回模块的装饰器
 */
export function getModuleStore(module: any, namespace: string) {
    const mStore = {
        Getter(prop: string) {
            return ModuleGetter(module, namespace, prop)
        },
        State(prop: string) {
            return ModuleState(module, namespace, prop)
        }
    }
    return mStore
}
