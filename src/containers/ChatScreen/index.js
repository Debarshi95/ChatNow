import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import MessageCard from '../../components/MessageCard';
import MessageInput from '../../components/MessageInput';
import { setMessages, unsetMessages } from '../../store/slices/message';
import { firestore } from '../../utils/firebase';

const ChatScreen = () => {
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { docs: messages, chatId: stateChatId } = useSelector((state) => state.messages);
  const dbRef = useRef(firestore);

  useEffect(() => {
    const dbQuery = query(
      collection(dbRef.current, 'messages'),
      where('chatId', '==', chatId),
      orderBy('createdAt', 'asc')
    );
    const unsub = onSnapshot(dbQuery, (snapshot) => {
      const docs = [];
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          docs.push({ id: change.doc.id, ...change.doc.data() });
        }
      });

      if (docs.length) {
        dispatch(setMessages({ chatId, docs }));
      }
    });

    return unsub;
  }, [chatId, dispatch]);

  useEffect(() => {
    if (chatId !== stateChatId) {
      dispatch(unsetMessages());
    }
  }, [chatId, dispatch, stateChatId]);

  return (
    <div className="w-full flex sm:w-3/4 mx-auto sm:border-r-1 md:border-l-1 overflow-y-scroll">
      <div className="flex-1 flex flex-col justify-between">
        <div className="px-3">
          {messages.map((message) => (
            <MessageCard message={message} key={message.id} userId={user?.uid} />
          ))}
        </div>
        <div className="flex bg-black sticky bottom-0">
          <MessageInput chatId={chatId} userId={user?.uid} />
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
