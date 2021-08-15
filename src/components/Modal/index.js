import React, { memo, useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { createChat } from '../../store/slices/chat';
import FormInput from '../FormInput';

const Modal = ({ open, onRequestClose, onAfterOpen }) => {
  const [chatUserEmail, setChatUserEmail] = useState('');
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleAddUser = async () => {
    if (user.email === chatUserEmail) return;
    const res = await dispatch(
      createChat({ userEmail: user.email, chatUserEmail, userId: user.uid })
    ).unwrap();
    console.log({ res });
  };

  const handleEmail = (e) => {
    setChatUserEmail(e.target.value);
  };
  return (
    <ReactModal
      isOpen={open}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      className="w-full mx-3 sm:max-w-sm bg-white bg-opacity-90 px-4 py-3 rounded-sm"
      contentLabel="Example Modal"
      overlayClassName="bg-black bg-opacity-30 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center"
      ariaHideApp={false}
    >
      <div className="flex justify-between mb-2">
        <h2 className="font-medium text-blue-500 text-base">Add User</h2>
        <button type="button" onClick={onRequestClose}>
          Cross
        </button>
      </div>
      <form className="flex flex-col">
        <div className="mb-4">
          <FormInput type="email" name="email" placeholder="User Email" onChange={handleEmail} />
        </div>
        <button
          type="button"
          className="bg-blue-500 py-2 mb-5 font-medium text-white"
          onClick={handleAddUser}
        >
          Add user
        </button>
      </form>
    </ReactModal>
  );
};

export default memo(Modal);
