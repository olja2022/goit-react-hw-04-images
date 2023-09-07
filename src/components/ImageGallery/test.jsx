// import React, { useState, useEffect } from 'react';

// function App() {
//   const [page, setPage] = useState(1);
//   const [request, setRequest] = useState('initial request');
//   const [data, setData] = useState([]);

//   // Перевіряємо, чи змінився запит
//   const isRequestChanged = request !== lastRequest.current;

//   // Оновлюємо останній запит
//   useEffect(() => {
//     lastRequest.current = request;
//   }, [request]);

//   // Скидаємо сторінку та очищуємо дані, якщо змінився запит
//   useEffect(() => {
//     if (isRequestChanged) {
//       setPage(1);
//       setData([]);
//     }
//   }, [isRequestChanged]);

//   // Завантажуємо дані при зміні сторінки або запиту
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`${request}&page=${page}`);
//       const newData = await response.json();
//       setData(prevData => [...prevData, ...newData]);
//     };
//     fetchData();
//   }, [request, page]);

//   // Функція для завантаження наступної сторінки
//   const loadMoreData = () => {
//     setPage(prevPage => prevPage + 1);
//   };

//   // Останній запит
//   const lastRequest = useRef(request);

//   return (
//     <div>
//       {/* Виводимо дані */}
//       {data.map(item => (
//         <div key={item.id}>{item.title}</div>
//       ))}
//       {/* Кнопка для завантаження наступної сторінки */}
//       <button onClick={loadMoreData}>Load more</button>
//     </div>
//   );
// }
