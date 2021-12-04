import React, { memo, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Searchbar from '../Searchbar';
import ChatCard from '../ChatCard';
import useMemoizedDispatch from '../../hooks/useMemoizedDispatch';
import { requestLoadChats } from '../../store/slices/chat';

const Chatbar = ({ url }) => {
  const dispatch = useMemoizedDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.email) {
      dispatch(requestLoadChats(user.email));
    }
  }, [dispatch, user?.email]);

  const chats = useSelector((state) => state.chats.docs);

  return (
    <div className="w-full sm:max-w-xs sticky top-0 h-screen content-container overflow-y-scroll">
      <Searchbar />
      <div>
        {chats.map((chat) => (
          <NavLink key={chat.id} className="border-b-2 block" to={`${url}/${chat.id}`}>
            <ChatCard chat={chat} />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default memo(Chatbar);
