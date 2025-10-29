export default function ModuleGetter(module: any, namespace: string, prop: string) {
    return function (target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            get() {
                // console.log(module)
                const getters = module.store.getters
                return getters[`${namespace}/${prop}`]
            },
            enumerable: true,
            configurable: true,
        });
    };
}