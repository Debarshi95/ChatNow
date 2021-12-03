import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { firestore } from '../utils/firebase';

const chatRef = collection(firestore, 'chats');
const userRef = collection(firestore, 'users');
const messageRef = collection(firestore, 'messages');

export const doesChatUserExist = async ({ chatUserEmail, userId }) => {
  const q = query(
    chatRef,
    where('users', 'array-contains', chatUserEmail),
    where('createdBy', '==', userId)
  );
  return getDocs(q);
};

export const addChat = async ({ userEmail, chatUserEmail, userId }) => {
  return addDoc(chatRef, {
    users: [userEmail, chatUserEmail],
    createdAt: serverTimestamp(),
    createdBy: userId,
  });
};

export const addUser = async ({ email, username }) => {
  return addDoc(userRef, { email, username, createdAt: serverTimestamp() });
};

export const getChats = async (userEmail) => {
  const q = query(
    chatRef,
    where('users', 'array-contains', userEmail),
    orderBy('createdAt', 'desc')
  );
  return getDocs(q);
};

export const addMessage = async ({ message, chatId, userId }) => {
  return addDoc(messageRef, {
    message,
    chatId,
    sentBy: userId,
    createdAt: serverTimestamp(),
  });
};

export const getMessages = async (chatId) => {
  const q = query(messageRef, where('chatId', '==', chatId), orderBy('createdAt', 'asc'));
  return getDocs(q);
};
