import { Overlay, Mod } from './Modal.styled';
import { useEffect } from 'react';

export const Modal = ({ toggleModal, largeImageURL }) => {


  useEffect(()=> {

 const handleKeyDown = e => {
    if (e.code === 'Escape') toggleModal();
  };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }

  }, [toggleModal])

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) toggleModal();
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <Mod>
        <img src={largeImageURL} alt='large' />
      </Mod>
    </Overlay>
  );
};

