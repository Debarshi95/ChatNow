import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import MessageCard from '../../components/MessageCard';
import MessageInput from '../../components/MessageInput';
import { requestLoadMessages } from '../../store/slices/message';

const ChatScreen = () => {
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.messages.docs);

  useEffect(() => {
    dispatch(requestLoadMessages(chatId));
  }, [chatId, dispatch]);

  return (
    <div className="w-full flex sm:w-3/4 mx-auto overflow-y-scroll">
      <div className="flex-1 flex flex-col">
        <div className="px-3 flex-1">
          {messages.map((message) => (
            <MessageCard message={message} key={message.id} userId={user?.uid} />
          ))}
        </div>
        <div className="flex bg-black  sticky  bottom-0">
          <MessageInput chatId={chatId} userId={user?.uid} />
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
