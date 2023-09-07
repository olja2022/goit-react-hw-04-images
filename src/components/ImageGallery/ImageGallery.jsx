import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'; // повідомлення
import { Loader } from 'components/Loader/Loader'; // спінер
import { Button } from 'components/Button/Button'; // кнопка Load More
import PropTypes from 'prop-types';
import { getFetch } from 'components/services/getFetch';
import { useCustomDataContext, useCustomPageContext } from 'Context/Context';

// import { DataContext, PageContext } from 'Context/Context';

// * Рефакторінг в Хуки
export const ImageGallery = ({ request }) => {
  // Можна імпортувати так:
  // const { data, setData } = useContext(DataContext);
  // const { page, setPage } = useContext(PageContext);

  // А можна так (менше import ... from):
  const { data, setData } = useCustomDataContext();
  const { page, setPage } = useCustomPageContext();

  // const [data, setData] = useState([]);
  // const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [isShownBtn, setIsShownBtn] = useState(false); // схована кнопка Load More
  const [isDisabledBtn, setIsDisabledBtn] = useState(true); // деактивована кнопка Load More
  const [isLoading, setIsLoading] = useState(false); // схований спінер
  const [perPage] = useState(12); // Для зручності зміни кількості карток на сторінці

  // // Перший запит:
  // const lastRequest = useRef(request); // записую туди значення з request
  // const lastPage = useRef(page);

  // // Чи змінився запит?
  // const isRequestChanged = request !== lastRequest.current;
  // const isPageChanged = page !== lastPage.current;

  // * Функція кнопки LoadMore
  const loadMoreBtnClick = () => setPage(prevState => prevState + 1);

  // Якщо запит не змінився, а сторінка змінилась (була натиснута кнопка Load More), то роблю запит
  useEffect(() => {
    // console.log('запуск функції useEffect :>> ');

    // * Функція запиту
    const getQuery = (currentPage, currentRequest) => {
      // setIsDisabledBtn(true); //  деактивую кнопку Load More, щоби не було випадкового кліку
      setIsShownBtn(false); //  ховаю кнопку Load More
      setIsLoading(true); // показую спінер

      getFetch(currentRequest, currentPage, perPage)
        // Отримую дані від серверу (масив об'єктів)
        .then(({ totalHits, hits }) => {
          // Якщо нічого не знайдено, то виходжу
          if (totalHits === 0) {
            return toast.info(
              `Відсутні зображення за запитом "${currentRequest}"`
            );
          }

          // показую повідомлення про кількість зображень лише при першому запиті
          if (currentPage === 1)
            toast.success(
              `Знайдено ${totalHits} результат(ів) по запиту "${currentRequest}"`
            );

          // Оновлюю стейт
          setData(prevState => {
            return [...prevState, ...hits]; // старі дані + нові
          });
          setIsShownBtn(true); // показую кнопку Load More
          setIsDisabledBtn(false); // активую кнопку Load More

          // Ховаю / Деактивую кнопку Load More, якщо кількість нових об'єктів менше ніж per_page (тобто вони закінчились на сервері)
          if (hits.length < perPage) {
            // setIsShownBtn(false); // якщо треба ховати
            setIsDisabledBtn(true); // якщо треба деактивувати
            toast.info(
              `Це все. Більше по запиту "${currentRequest}" зображень в нас нема`
            );
          }
        })
        // Записую у state або створену помилку (якщо !res.ok), або будь-яку іншу:
        .catch(error => {
          setError(error);
          setStatus('rejected');
        })
        .finally(() => {
          // ховаю спінер
          setIsLoading(false);
        });
    };

    // Якщо запит є (не пустий) - вже не потрібно, бо додався else if нижче
    // if (request) {
    // console.log(' Зявився якийсь не пустий запит ');
    // Якщо запит змінився, то очищую дані і перезаписую значення у посиланні
    // if (isRequestChanged) {
    // console.log('запит змінився, все обнуляю');
    // lastRequest.current = request; // записую новий запит у посилання

    // Більш правильний варіант - винести наступні три рядки у функцію submmit форми. Тоді не треба буде додавати перевірку сюди і функція не буде запускатися зайвий раз.

    // }
    // Якщо запит не змінився, то перевіряю сторінку
    // else if (isPageChanged) {
    // console.log(`Сторінка змінилась. Роблю запит по сторінці: ${page}`);
    // setIsShownBtn(false);
    request && getQuery(page, request);

    // }
    // }
  }, [page, perPage, request, setData]); // ? чому воно хоче додати залежність від getQuery?

  // * Рендер
  if (status === 'rejected') {
    return <h1>{`Помилка: ${error.message}`}</h1>;
  }

  return (
    <>
      {data.length !== 0 && ( // щоби не показувати ul коли немає даних
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

// export class ImageGallery extends Component {
//   state = {
//     data: [],
//     error: null,
//     status: '',
//     page: 1,
//     isShownBtn: false, // схована кнопка Load More
//     isDisabledBtn: true, // деактивована кнопка Load More
//     isLoading: false, // схований спінер
//     perPage: 12,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { request } = this.props;
//     const { page } = this.state;

//     // Якщо запит змінився, то скидаю state і роблю запит:
//     if (prevProps.request !== request) {
//       this.setState({ data: [], page: 1, isShownBtn: false });
//       this.getQuery(1);
//     }

//     // Якщо запит не змінився, а сторінка змінилась (була натиснута кнопка Load More), то роблю запит
//     else {
//       if (page !== prevState.page && page !== 1) {
//         this.getQuery(page);
//       }
//     }
//   }

//   // * Функція запиту
//   getQuery = currentPage => {
//     const { perPage } = this.state;
//     const { request } = this.props;

//     this.setState({
//       // isDisabledBtn: true, //  деактивую кнопку Load More, щоби не було випадкового кліку
//       isShownBtn: false, //  ховаю кнопку Load More
//       isLoading: true, // показую спінер
//     });

//     getFetch(request, currentPage, perPage)
//       // Отримую дані від серверу (масив об'єктів)
//       .then(({ totalHits, hits }) => {
//         // Якщо нічого не знайдено, то виходжу
//         if (totalHits === 0) {
//           return toast.info(`Відсутні зображення за запитом "${request}"`);
//         }

//         // показую повідомлення про кількість зображень лише при першому запиті
//         if (currentPage === 1)
//           toast.success(
//             `Знайдено ${totalHits} результат(ів) по запиту "${request}"`
//           );

//         // Оновлюю стейт
//         this.setState(prevState => {
//           return {
//             data: [...prevState.data, ...hits], // старі дані + нові
//             isShownBtn: true, // показую кнопку Load More
//             isDisabledBtn: false, // активую кнопку Load More
//             // status: 'resolved', // вже зайве
//           };
//         });

//         // Ховаю / Деактивую кнопку Load More, якщо кількість нових об'єктів менше ніж per_page (тобто вони закінчились на сервері)
//         if (hits.length < perPage) {
//           // this.setState({ isShownBtn: false }); // якщо треба ховати
//           this.setState({ isDisabledBtn: true }); // якщо треба деактивувати
//           toast.info(
//             `Це все. Більше по запиту "${request}" зображень в нас нема`
//           );
//         }
//       })
//       // Записую у state або створену помилку (якщо !res.ok), або будь-яку іншу:
//       .catch(error => this.setState({ error, status: 'rejected' }))
//       .finally(() => {
//         // ховаю спінер
//         this.setState({ isLoading: false });
//       });
//   };

//   // * Функція кнопки LoadMore
//   loadMoreBtnClick = () => {
//     this.setState(prevState => {
//       return { page: prevState.page + 1 };
//     });
//   };

//   render() {
//     const { status, error, data, isShownBtn, isLoading, isDisabledBtn } =
//       this.state;

//     //  Якщо є помилка (не 404 від сервера, а будь-яка інша):
//     if (status === 'rejected') {
//       return <h1>{`Помилка: ${error.message}`}</h1>;
//     }

//     // if (status === 'resolved') {
//     // прибрав 'resolved' щоби loader показувався внизу під вже завантаженими картками зображень.
//     return (
//       <>
//         {data.length !== 0 && ( // щоби не показувати ul коли немає даних
//           <ul className="ImageGallery">
//             {data.map(({ id, webformatURL, largeImageURL, tags }) => {
//               return (
//                 <ImageGalleryItem
//                   key={id}
//                   webformatURL={webformatURL}
//                   largeImageURL={largeImageURL}
//                   tags={tags}
//                 />
//               );
//             })}
//           </ul>
//         )}
//         {isLoading && <Loader />}
//         {isShownBtn && (
//           <Button
//             loadMoreBtn={this.loadMoreBtnClick}
//             isDisabledBtn={isDisabledBtn}
//           />
//         )}
//       </>
//     );
//     // }
//   }
// }
