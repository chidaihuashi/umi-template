import React from 'react';
import shouldComponentUpdate from './shouldComponentUpdate';

/**
 * Makes the given component "pure".
 *
 * @param Target
 */
export default function immutableRenderDecorator(Target: any) {
  class Wrapper extends React.Component<any, any> {
    render() {
      return React.createElement(Target, this.props, this.props.children);
    }
  }

  Wrapper.prototype.shouldComponentUpdate = shouldComponentUpdate;

  return Wrapper;
}
