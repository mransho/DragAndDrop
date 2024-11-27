export function autoBind(_target, _methodName, descriptor) {
    const method = descriptor.value;
    const creatDescriptor = {
        configurable: true,
        get() {
            return method.bind(this);
        },
    };
    return creatDescriptor;
}
//# sourceMappingURL=autoBind.js.map