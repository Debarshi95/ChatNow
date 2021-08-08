export default {
  home: {
    route: '/',
    exact: true,
  },
  signIn: {
    route: '/signin',
    exact: true,
  },
  chat: {
    route: '/:userId/chats',
    exact: true,
  },
  chatScreen: {
    route: '/:userId/chats/:chatId',
    exact: true,
  },
};
