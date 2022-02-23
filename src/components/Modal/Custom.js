import React from 'react';
import Modal from 'react-modal';

const CustomModal = ({ isOpen, clearState, customStyles, contentLabel, children }) => {
  Modal.setAppElement('#modal-root');
  return (
    <Modal isOpen={isOpen} onRequestClose={clearState} style={customStyles} contentLabel={contentLabel}>
      {children}
    </Modal>
  );
};

export default CustomModal;
