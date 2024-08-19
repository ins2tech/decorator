export default function ModuleState(module: any, namespace: string, prop: string) {
    return function (target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            get() {
                const state = module.store.state[namespace]
                return state[prop]
            },
            enumerable: true,
            configurable: true,
        });
    };
}