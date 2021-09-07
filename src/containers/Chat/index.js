import React, { memo } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Chatbar from '../../components/Chatbar';
import ChatScreen from '../ChatScreen';

const Chat = () => {
  const { path, url } = useRouteMatch();
  const { user } = useSelector((state) => state.auth);
  const match = useMediaQuery({ query: '(min-width:600px)' });

  return (
    <div className="w-full flex md:w-3/4 mx-auto max-h-100vh sm:border-l-1 sm:border-r-1 overflow-hidden">
      <Switch>
        <Route path={path} exact>
          <Chatbar url={url} user={user} />
          {match && (
            <div className="flex justify-center items-center flex-1">
              <h4 className="border-blue-500 border-2 px-3 py-2 rounded-md text-blue-500">
                Select a chat to get started
              </h4>
            </div>
          )}
        </Route>
        <Route path="/chats/:chatId" exact>
          {match && <Chatbar url={url} user={user} />}
          <ChatScreen />
        </Route>
      </Switch>
    </div>
  );
};

export default memo(Chat);
