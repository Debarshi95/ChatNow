import React, { memo } from 'react';
import * as Yup from 'yup';
import { FaWindowClose } from 'react-icons/fa';
import { Form, Formik } from 'formik';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { requestCreateChat } from '../../store/slices/chat';
import { validateEmail } from '../../utils/formValidation';
import FormInput from '../FormInput';

const Modal = ({ open, onRequestClose, onAfterOpen }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleAddUser = async (formData, { setFieldError, setSubmitting, resetForm }) => {
    const { email } = formData;
    if (!email) return;
    if (user.email === email) {
      setFieldError('email', 'User email must be different from your email');
      return;
    }
    setSubmitting(true);
    try {
      await dispatch(
        requestCreateChat({ userEmail: user.email, chatUserEmail: email, userId: user.uid })
      ).unwrap();
      resetForm('');
      onRequestClose();
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      setFieldError('email', error);
    }
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
      <div className="flex justify-end mb-2">
        <button type="button" onClick={onRequestClose}>
          <FaWindowClose className="text-blue-500" />
        </button>
      </div>

      <Formik
        initialValues={{ email: '' }}
        onSubmit={handleAddUser}
        className="flex flex-col"
        validationSchema={Yup.object({
          email: validateEmail(),
        })}
      >
        <Form className="mb-4" noValidate>
          <FormInput type="email" name="email" placeholder="User Email" label="User Email" />
          <button
            type="submit"
            className="bg-blue-500 py-2 mt-1 mb-5 w-full font-medium text-white"
          >
            Add User
          </button>
        </Form>
      </Formik>
    </ReactModal>
  );
};

export default memo(Modal);
