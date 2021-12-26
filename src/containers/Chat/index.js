import React, { memo } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Chatbar from '../../components/Chatbar';
import ChatScreen from '../ChatScreen';

const Chat = () => {
  const { path, url } = useRouteMatch();
  const match = useMediaQuery({ query: '(min-width:600px)' });

  return (
    <div className="w-full flex md:w-3/4 mx-auto content-container sm:border-l-2 sm:border-r-2 sm:border-b-2">
      <Switch>
        <Route path={path} exact>
          <Chatbar url={url} />
          {match && (
            <div className="flex justify-center items-center flex-1">
              <h4 className="border-blue-500 border-2 px-3 py-2 rounded-md text-blue-500">
                Select a chat to get started
              </h4>
            </div>
          )}
        </Route>
        <Route path="/chats/:chatId" exact>
          {match && <Chatbar url={url} />}
          <ChatScreen />
        </Route>
      </Switch>
    </div>
  );
};

export default memo(Chat);
