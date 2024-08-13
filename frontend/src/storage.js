// key 따라서 localStorage에 책 저장
// ItemNewSpecial, Query
export const saveToStorage = (key, books) => {
  console.log(key, books);
  // const data = JSON.stringify(books);
  const pageSize = 8;
  const totalPages = Math.ceil(books.length / pageSize);
  const toStore = {};

  for (let i = 0; i < totalPages; i++) {
    const pageData = books.slice(i * pageSize, (i + 1) * pageSize);
    toStore[i + 1] = pageData;
  }
  console.log(toStore);
  localStorage.setItem(key, JSON.stringify(toStore));
};
