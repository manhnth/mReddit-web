import { Close } from '@/components/icons';
import React, { ReactNode } from 'react';
import s from './Modal.module.css';

interface ModalProps {
  children?: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className={s.root}>
      <div className={s.modal}>
        <button className={s.close} onClick={() => onClose()}>
          <Close width={'20px'} className="fill-accent-3" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
