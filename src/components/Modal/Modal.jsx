import { Overlay, Mod } from './Modal.styled';
import { useEffect } from 'react';

export const Modal = ({ toggleModal, largeImageURL }) => {

  useEffect(()=> {
    window.addEventListener('keydown', handleKeyDown);
  }, [])

  useEffect(()=> {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [])

 const handleKeyDown = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
    toggleModal();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <Mod>
        <img src={largeImageURL} alt='large' />
      </Mod>
    </Overlay>
  );
};

