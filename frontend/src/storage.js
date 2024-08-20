export const saveToStorage = (key, bookData) => {
  let storage = JSON.parse(localStorage.getItem(key)) || [];
  storage.push(bookData);
  localStorage.setItem(key, JSON.stringify(storage));
};

export const removeFromStorage = (key, itemData) => {
  let storage = JSON.parse(localStorage.getItem(key)) || [];
  storage = storage.filter((item) => item.itemId !== itemData.itemId);
  localStorage.setItem(key, JSON.stringify(storage));
};

export const isItemInStorage = (key, itemData) => {
  let storage = JSON.parse(localStorage.getItem(key)) || [];
  return storage.some((item) => item.itemId === itemData.itemId);
};

export const getStorage = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};
