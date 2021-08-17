import Home from '../containers/Home/loadable';
import SignUp from '../containers/SignUp/loadable';
import Chat from '../containers/Chat/loadable';
import routeConstant from './routes';

export default {
  home: {
    component: Home,
    ...routeConstant.home,
  },
  signup: {
    component: SignUp,
    ...routeConstant.signup,
  },
  chats: {
    component: Chat,
    ...routeConstant.chat,
  },
};
