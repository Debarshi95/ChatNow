export default {
  home: {
    route: '/',
    exact: true,
  },
  signup: {
    route: '/signup',
    exact: true,
  },
  chat: {
    route: '/chats',
    exact: false,
    isProtected: true,
  },
};
