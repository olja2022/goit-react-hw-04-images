import { useState } from 'react';
import './styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { useCustomDataContext, useCustomPageContext } from 'Context/Context';

export const App = () => {
  const [request, setRequest] = useState('');
  const { setData } = useCustomDataContext();
  const { setPage } = useCustomPageContext();
  const onSubmit = requestValue => {
    setRequest(requestValue);

    setData([]);
    setPage(1);
  };

  return (
    <>
      {}
      <Searchbar onSubmit={onSubmit} />

      {}
      <ImageGallery request={request}></ImageGallery>

      {}
      <ToastContainer newestOnTop={true} autoClose={4000} />
    </>
  );
};
