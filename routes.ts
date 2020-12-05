import _ from 'lodash';

export interface RouteOption {
  /**
   * Any valid URL path
   */
  path?: string;
  /**
   * A React component to render only when the location matches.
   */
  component?: string | (() => any);
  wrappers?: string[];
  /**
   * navigate to a new location
   */
  redirect?: string;
  /**
   * When true, the active class/style will only be applied if the location is matched exactly.
   */
  exact?: boolean;
  routes?: RouteOption[];

  [k: string]: any;

  auth?: boolean;
}

const routes: RouteOption[] = [
  {
    exact: true,
    path: '/login',
    component: '@/pages/Login',
  },
  {
    path: '/',
    component: '@/layouts',
    routes: [
      { path: '403', component: '@/pages/Exception403' },
      { path: '404', component: '@/pages/Exception404' },
      { path: 'loading', component: '@/components/Loading' },
      { component: '@/pages/Exception404' },
    ],
  },
];

function wrap(route: RouteOption): RouteOption {
  if (route.auth) {
    route.wrappers = [
      ...(route.wrappers || []),
      '@/components/RouteWithAuth/index.tsx',
    ];
    delete route.auth;
  }
  if (route.routes?.length) {
    route.routes = _.map(route.routes, wrap);
  }
  return route;
}

export default _.map(routes, wrap);
