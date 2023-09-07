export const getFetch = (request, currentPage, perPage) => {
  const URL_CONST = 'https://pixabay.com/api/';
  // Клас URLSearchParams:
  const searchParams = new URLSearchParams({
    key: '34581261-d39fcdfb48adfd850ac44b9c1',
    q: request, // запит
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: perPage, // сторінок за один запит

    page: currentPage, // сторінка у state (змінюється кнопкою Load More, або скидається новим запитом)
  });

  return fetch(`${URL_CONST}?${searchParams}`).then(res => {
    // Якщо API відповіло з помилкою 4XX, то відловлюємо її тут
    if (res.ok) {
      return res.json();
    }
    // Якщо відповідь від сервера - 4XX, то роблю новий об'єкт помилки з необхідним повідомленням:
    return Promise.reject(
      new Error(
        `Якась помилка на сервері, спробуйте пізніше або оновіть сторінку`
      )
    );
  });
};
