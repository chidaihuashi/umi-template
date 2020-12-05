import shallowEqualImmutable from './shallowEqualImmutable';

export default function shouldComponentUpdate(nextProps: any, nextState: any) {
  // @ts-ignore
  return (
    !shallowEqualImmutable(this.props, nextProps) ||
    !shallowEqualImmutable(this.state, nextState)
  );
}
