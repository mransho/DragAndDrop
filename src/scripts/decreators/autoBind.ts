export function autoBind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;
  const creatDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      return method.bind(this);
    },
  };
  return creatDescriptor;
}
