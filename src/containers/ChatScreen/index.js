import React, { useEffect } from 'react';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import MessageCard from '../../components/MessageCard';
import MessageInput from '../../components/MessageInput';
import { setMessages } from '../../store/slices/message';
import { firestore } from '../../utils/firebase';

const ChatScreen = () => {
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.messages.docs);

  useEffect(() => {
    const q = query(
      collection(firestore, 'messages'),
      where('chatId', '==', chatId),
      orderBy('createdAt', 'asc')
    );
    onSnapshot(q, (snapshot) => {
      const docs = [];
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          docs.push({ id: change.doc.id, ...change.doc.data() });
        }
      });

      if (docs.length > 0) {
        dispatch(setMessages({ chatId, docs }));
      }
    });
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
