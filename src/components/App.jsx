import { useEffect, useState } from 'react';
import { getSearchImage } from '../api/api-request';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [search, setSearch] = useState('');
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState();

  useEffect(() => {
    // if (!search) return;

    const formSubmit = async () => {
      if (search !== '') {

        setLoading(true);

        try {
          const data = await getSearchImage(search, page);

          setHits(prev => [...prev, ...data.hits]);
          setTotal(data.total);

          searchFailed(data);
        } catch (error) {
          toast.error('Sorry ERROR. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };

    formSubmit();
  }, [page, search]);


  const searchFailed = ({ total }) => {
    if (total === 0) {
      return toast.warn('Sorry, there are no images matching your search query. Please try again.');
    }
  };

  const handleFormSubmit = () => {
    setPage(1);
    setHits([]);
  };

  const btnLoadMorePage = () => {
    setPage(prev => prev + 1);
  };

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  const onClickImage = e => {
    toggleModal();
    const find = hits.filter(itm => itm.id === e.target.name * 1);
    return setLargeImageURL(find[0].largeImageURL);
  };

  return (
    <>
      <Searchbar
        search={search}
        setSearch={setSearch}
        handleFormSubmit={handleFormSubmit}
      />
      <ImageGallery hits={hits} onClickImage={onClickImage} />
      <Loader loading={loading} />
      {total >= 12 && <Button handleLoadMore={btnLoadMorePage} />}

      {showModal &&
        <Modal
          toggleModal={toggleModal}
          largeImageURL={largeImageURL}
        />}

      <ToastContainer
        autoClose={3000}
        theme='colored'
        position='top-center'
      />

    </>
  );
};

