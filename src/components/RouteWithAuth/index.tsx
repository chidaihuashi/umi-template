import React from 'react';
import { Redirect } from 'umi';
import { connect } from 'dva';
import queryString from 'querystring';

import { State } from '@/reducers';
import PureComponent from '@/common/pure-component';

interface Props {
  authorized: boolean;
  location: Location;
}

class RouteWithAuth extends PureComponent<Props> {
  render() {
    const {
      location: { pathname, search, hash },
      authorized,
      children,
    } = this.props;
    const redirectTo = pathname + search + hash;
    return authorized ? (
      children
    ) : (
      <Redirect to={`/login?${queryString.stringify({ redirectTo })}`} />
    );
  }
}

function mapState(state: State) {
  return { authorized: state?.authorize?.authorized };
}

export default connect(mapState)(RouteWithAuth);
