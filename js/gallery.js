import gallery from "./gallery-tems.js";
const galleryToDOM = document.querySelector("ul.js-gallery");
const modal = document.querySelector(".js-lightbox");
let indexCurrenElement;
//Разметка элемента галереи
const makeGallery = function (array, ul) {
  let NodeList = gallery.map((value, index) => {
    let item = document.createElement("li");
    item.classList.add("gallery__item");
    let link = document.createElement("a");
    link.classList.add("gallery__link");
    link.setAttribute("href", value.original);
    let image = document.createElement("img");
    image.setAttribute("src", value.preview);
    image.setAttribute("alt", value.description);
    image.dataset.sourse = value.original;
    image.classList.add("gallery__image");
    image.dataset.index = index;
    link.appendChild(image);
    item.appendChild(link);

    return item;
  });

  galleryToDOM.append(...NodeList);
};
//Закрытие модального окна
const checkModal = function (e) {
  if (e.target === document.querySelector(".lightbox__overlay")) {
    modalIsClose();
  }
  return;
};

const getItem = function (e) {
  e.preventDefault();
  if (e.target === e.currentTarget) {
    return;
  }
  modalIsOpen();
  changeImg(e.target.dataset.sourse);
};

const modalIsOpen = function () {
  modal.classList.add("is-open");
};

const modalIsClose = function () {
  modal.classList.remove("is-open");
  changeImg();
};

const changeImg = function (value) {
  let image = document.querySelector("img.lightbox__image");
  if (image.getAttribute("src") === value || !value) {
    image.setAttribute("src", "");
  } else {
    image.setAttribute("src", value);
  }
};
//Пролистывание изображений

const checkButton = function (e) {
  if (indexCurrenElement === undefined) {
    indexCurrenElement = parseInt(e.target.firstChild.dataset.index);
  }
  if (e.code === "Escape") {
    modalIsClose();
  } else if (e.code === "ArrowRight") {
    moveInGallery("right");
  } else if (e.code === "ArrowLeft") {
    moveInGallery("left");
  } else {
    return;
  }
};

const moveInGallery = function (indexToMove) {
  if (indexToMove === "right") {
    indexCurrenElement += 1;
    if (indexCurrenElement > gallery.length - 1) {
      indexCurrenElement = 0;
    }
  } else if (indexToMove === "left") {
    indexCurrenElement -= 1;
    if (indexCurrenElement < 0) {
      indexCurrenElement = gallery.length - 1;
    }
  }
  changeImg(
    document.querySelector(`img[data-index="${indexCurrenElement}"]`).dataset
      .sourse
  );
};
//Открытие картинок в текущем окне
makeGallery(gallery, galleryToDOM);
galleryToDOM.addEventListener("click", getItem);
document
  .querySelector('button[data-action="close-lightbox"]')
  .addEventListener("click", modalIsClose);
modal.addEventListener("click", checkModal);
window.addEventListener("keyup", checkButton);
