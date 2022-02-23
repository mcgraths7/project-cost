import React, { useState } from 'react';

import './App.css';
import Header from '../Header';
import Main from '../Main';

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <div id="modal-root" />
      <Header setModalIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen} />
      <Main setModalIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen} />
    </>
  );
};

export default App;
