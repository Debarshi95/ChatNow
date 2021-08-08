import Home from '../containers/Home/loadable';
import SignIn from '../containers/SignIn/loadable';
import Chat from '../containers/Chat/loadable';
import ChatScreen from '../containers/ChatScreen/loadable';
import routeConstant from './routes';

export default {
  home: {
    component: Home,
    ...routeConstant.home,
  },
  signIn: {
    component: SignIn,
    ...routeConstant.signIn,
  },
  chats: {
    component: Chat,
    ...routeConstant.chat,
  },
  chatScreen: {
    component: ChatScreen,
    ...routeConstant.chatScreen,
  },
};
