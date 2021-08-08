import React from 'react';

const messages = [
  {
    id: 1,
    name: 'Debarshi',
    message: {
      content: 'Hi',
    },
  },
  {
    id: 2,
    name: 'Roshan',
    message: {
      content: 'Hwy',
    },
  },
  {
    id: 2,
    name: 'Roshan',
    message: {
      content: 'Yo',
    },
  },
  {
    id: 2,
    name: 'Roshan',
    message: {
      content: 'Bosassa',
    },
  },
  {
    id: 1,
    name: 'Debarshi',
    message: {
      content: 'Whatsup',
    },
  },
  {
    id: 1,
    name: 'Debarshi',
    message: {
      content: 'Hi',
    },
  },
  {
    id: 2,
    name: 'Roshan',
    message: {
      content: 'Hwy',
    },
  },
  {
    id: 2,
    name: 'Roshan',
    message: {
      content: 'Yo',
    },
  },
  {
    id: 2,
    name: 'Roshan',
    message: {
      content: 'Bosassa',
    },
  },
  {
    id: 1,
    name: 'Debarshi',
    message: {
      content: 'Whatsup',
    },
  },
  {
    id: 1,
    name: 'Debarshi',
    message: {
      content: 'Hi',
    },
  },
  {
    id: 2,
    name: 'Roshan',
    message: {
      content: 'Hwy',
    },
  },
  {
    id: 2,
    name: 'Roshan',
    message: {
      content:
        'Yo Lorem psasssssssssssssssssssssssssssssssssssssssssssssssssssssssqwqwqwwwwwwwwwwwwwwwwwwwww',
    },
  },
  {
    id: 2,
    name: 'Roshan',
    message: {
      content: 'Bosassa',
    },
  },
  {
    id: 1,
    name: 'Debarshi',
    message: {
      content: 'Whatsup',
    },
  },
];
const ChatScreen = () => {
  // const userid = 1;
  return (
    <div className="flex flex-col">
      <div className="px-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="p-3 bg-gray-200 rounded-lg my-2 flex flex-col break-words"
          >
            <h4 className="text-sm font-normal self-start">{message.name}</h4>
            <p className="text-base leading-none my-1">{message.message.content}</p>
            <p className="text-xs font-light">12:00AM</p>
          </div>
        ))}
      </div>
      <div className="w-full flex items-start sticky px-4 bottom-0 sm:h-24">
        <textarea
          className="w-full resize-none outline-none px-3 py-2 overflow-hidden text-sm h-full"
          placeholder="Write a message..."
        />
        <button type="button" className="bg-blue-500 py-2 px-4 text-sm font-semibold text-white">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
