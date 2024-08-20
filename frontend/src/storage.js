/**
 * saveToStorage()
 * key와 itemData를 받아, localStorage의 해당 key에 data 저장
 */
export const saveToStorage = (key, itemData) => {
  let storage = JSON.parse(localStorage.getItem(key)) || [];
  storage.push(itemData);
  localStorage.setItem(key, JSON.stringify(storage));
};

/**
 * removeFromStorage()
 * key와 itemData를 받아, localStorage의 해당 key에 itemData 삭제
 */
export const removeFromStorage = (key, itemData) => {
  let storage = JSON.parse(localStorage.getItem(key)) || [];
  storage = storage.filter((item) => item.itemId !== itemData.itemId);
  localStorage.setItem(key, JSON.stringify(storage));
};

/**
 * isItemInStorage()
 * key와 itemData를 받아, localStorage의 해당 key에 itemData가 있는지 확인
 */
export const isItemInStorage = (key, itemData) => {
  let storage = JSON.parse(localStorage.getItem(key)) || [];
  return storage.some((item) => item.itemId === itemData.itemId);
};

/**
 * getStorage()
 * key를 받아, localStorage의 해당 key의 data를 반환
 */
export const getStorage = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};
