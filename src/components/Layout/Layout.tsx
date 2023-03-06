import React from 'react';
import { Header } from './Header';
import { Outlet, useLoaderData } from 'react-router-dom';
import { LoginView } from '@/components/Auth/LoginView';
import Modal from '@/components/ui/Modal';
import { useUI } from '@/components/ui/context';
import { ForgotView, SignUpView } from '../Auth';
import { EditView } from '../Post/EditView';

const ModalView: React.FC<{ modalView: string; closeModal(): any }> = ({
  modalView,
  closeModal,
}) => {
  return (
    <Modal onClose={closeModal}>
      {modalView === 'LOGIN_VIEW' && <LoginView />}
      {modalView === 'SIGNUP_VIEW' && <SignUpView />}
      {modalView === 'FORGOT_VIEW' && <ForgotView />}
      {modalView === 'EDIT_VIEW' && <EditView />}
      {/* {modalView === "CREATE_PRODUCT_VIEW" && <CreateProductView />}
      {modalView === "UPDATE_PRODUCT_VIEW" && <UpdateProductView />}
      {modalView === "ORDER_DETAIL_VIEW" && <OrderDetailView />} */}
    </Modal>
  );
};

const ModalUI: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();

  return displayModal ? (
    <ModalView closeModal={closeModal} modalView={modalView} />
  ) : null;
};

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({}) => {
  const user = useLoaderData();
  console.log('layout user', user);

  return (
    <>
      <Header />
      <ModalUI />
      <Outlet />
    </>
  );
};
