import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { getChatUserEmail } from '../../utils';

const ChatCard = ({ chat }) => {
  const user = useSelector((state) => state.auth.user);
  console.log('Rendered Card');
  return (
    <div className="py-2 px-4 flex h-16 justify-evenly hover:bg-blue-500 cursor-pointer">
      <img src={chat?.pic || '/assets/placeholder_user.png'} alt="" className="rounded-full" />
      <div className="overflow-ellipsis whitespace-nowrap overflow-hidden mx-2 flex flex-col justify-evenly">
        <h4 className="font-medium">{getChatUserEmail(user.email, chat.users)}</h4>
        <p className="text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi rerum, voluptatem
          quibusdam fugit similique sequi adipisci, doloribus, nostrum distinctio nobis quod magnam
          dignissimos debitis. Architecto commodi molestiae incidunt magni necessitatibus!
        </p>
      </div>
    </div>
  );
};

export default memo(ChatCard);
