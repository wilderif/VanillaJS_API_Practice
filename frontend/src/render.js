// storage에서 가져와서 parse한 뒤 render

export const renderBook = (bookData) => {
  const liElement = document.createElement("li");
  liElement.innerHTML = `
    <div class="book-container">
      <div class="book-container-cover">
        <img
          src="${bookData.cover}"
          alt="${bookData.title}"
          class="book-cover"
        />
        <div class="book-description">
          <p>${bookData.description}</p>
        </div>
      </div>
      <div class="book-container-footer">
        <div class="book-info">
          <p class="book-name">${bookData.title}</p>
          <p class="book-price">${bookData.priceStandard} 원</p>
          <p class="book-publisher">${bookData.publisher}</p>
        </div>
        <button class="like-btn">
          <img src="./assets/images/icons/like_button.png" alt="Like Button" />
        </button>
      </div>
    </div>
  `;

  return liElement;
};

export const renderPagination = () => {};
