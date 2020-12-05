import React from 'react';
import { shouldComponentUpdate } from '@/common/immutable-render-decorator';

export default class PureComponent<
  P = {},
  S = {},
  SS = any
> extends React.Component<P, S, SS> {
  constructor(props?: any, context?: any) {
    super(props, context);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }
}
