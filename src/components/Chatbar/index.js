import React, { memo, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import Searchbar from '../Searchbar';
import ChatCard from '../ChatCard';
import useMemoizedDispatch from '../../hooks/useMemoizedDispatch';
import { setChat } from '../../store/slices/chat';
import { firestore } from '../../utils/firebase';

const Chatbar = ({ url, user }) => {
  const dispatch = useMemoizedDispatch();
  const dbRef = useRef(firestore);
  useEffect(() => {
    const dbQuery = query(
      collection(dbRef.current, 'chats'),
      where('users', 'array-contains', user.email)
    );
    const unsub = onSnapshot(dbQuery, (snapshot) => {
      const docs = [];
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          docs.push({ id: change.doc.id, ...change.doc.data() });
        }
      });
      if (docs.length > 0) {
        dispatch(setChat(docs));
      }
    });
    return unsub;
  }, [dispatch, user.email]);

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
