import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import PropTypes from 'prop-types';
import { getFetch } from 'components/services/getFetch';
import { useCustomDataContext, useCustomPageContext } from 'Context/Context';

export const ImageGallery = ({ request }) => {
  const { data, setData } = useCustomDataContext();
  const { page, setPage } = useCustomPageContext();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [isShownBtn, setIsShownBtn] = useState(false);
  const [isDisabledBtn, setIsDisabledBtn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [perPage] = useState(12);
  const loadMoreBtnClick = () => setPage(prevState => prevState + 1);

  
  useEffect(() => {
    
    const getQuery = (currentPage, currentRequest) => {
      setIsShownBtn(false);
      setIsLoading(true);

      getFetch(currentRequest, currentPage, perPage)
        .then(({ totalHits, hits }) => {
          if (totalHits === 0) {
            return toast.info(
              `Відсутні зображення за запитом "${currentRequest}"`
            );
          }

          if (currentPage === 1)
            toast.success(
              `Знайдено ${totalHits} результат(ів) по запиту "${currentRequest}"`
            );

          setData(prevState => {
            return [...prevState, ...hits];
          });
          setIsShownBtn(true);
          setIsDisabledBtn(false);

          if (hits.length < perPage) {
            setIsDisabledBtn(true);
            toast.info(
              `Це все. Більше по запиту "${currentRequest}" зображень в нас нема`
            );
          }
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    request && getQuery(page, request);

    }, [page, perPage, request, setData]);

  
  if (status === 'rejected') {
    return <h1>{`Помилка: ${error.message}`}</h1>;
  }

  return (
    <>
      {data.length !== 0 && (
        <ul className="ImageGallery">
          {data.map(({ id, webformatURL, largeImageURL, tags }) => {
            return (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
              />
            );
          })}
        </ul>
      )}
      {isLoading && <Loader />}
      {isShownBtn && (
        <Button loadMoreBtn={loadMoreBtnClick} isDisabledBtn={isDisabledBtn} />
      )}
    </>
  );
};

ImageGallery.propTypes = {
  request: PropTypes.string.isRequired,
};