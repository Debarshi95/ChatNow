import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestCreateMessage } from '../../store/slices/message';

const MessageInput = ({ chatId, userId }) => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSendMessage = () => {
    dispatch(requestCreateMessage({ message: input, chatId, sentBy: userId }));
    setInput('');
  };

  return (
    <>
      <textarea
        className="w-full resize-none outline-none px-3 py-2 text-sm"
        placeholder="Write a message..."
        onChange={({ target }) => setInput(target.value)}
        value={input}
      />
      <button
        type="button"
        className="bg-blue-500 py-2 px-4 text-sm font-semibold text-white"
        onClick={handleSendMessage}
      >
        Send
      </button>
    </>
  );
};

export default MessageInput;
