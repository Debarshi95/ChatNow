import React, { memo } from 'react';
import { formatDate } from '../../utils';

const MessageCard = ({ message, userId }) => {
  return (
    <div
      className={`w-full flex break-all h-auto ${
        message.sentBy === userId ? 'justify-end' : 'justify-start'
      }`}
    >
      <div className="max-w-xs flex-col p-3 bg-gray-200 rounded-lg my-2">
        <p className="text-base leading-none my-1">{message.message}</p>
        <p className="text-xs font-medium">{formatDate(message.createdAt)}</p>
      </div>
    </div>
  );
};

export default memo(MessageCard);
