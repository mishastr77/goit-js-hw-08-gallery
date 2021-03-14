import cards from "./gallery-item.js";

const galleryRef = document.querySelector(".gallery");
const divModalRef = document.querySelector(".lightbox");
const modalImgRef = document.querySelector("img.lightbox__image");

const dataSourceRef = cards.map(({ original }) => {
  const dataForSlider = original;
  return dataForSlider;
});

const mark = cards.map(({ preview, original, description }) => {
  const itemListRef = document.createElement("li");
  itemListRef.classList.add("gallery__item");
  const linkRef = document.createElement("a");
  linkRef.classList.add("gallery__link");
  const imageRef = document.createElement("img");
  imageRef.classList.add("gallery__image");
  imageRef.src = preview;
  imageRef.dataset.source = original;
  imageRef.alt = description;
  linkRef.append(imageRef);
  itemListRef.append(linkRef);
  console.log(itemListRef);
  return itemListRef;
});

galleryRef.append(...mark);

let activeIndex = 0;

galleryRef.addEventListener("click", (e) => {
  if (e.target.nodeName === "IMG") {
    divModalRef.classList.add("is-open");
    modalImgRef.src = e.target.dataset.source;
    modalImgRef.alt = e.target.alt;
    activeIndex = dataSourceRef.indexOf(modalImgRef.src);
    window.addEventListener("click", (e) => {
      if (
        e.target.dataset.action === "close-lightbox" ||
        e.target.className === "lightbox__overlay"
      ) {
        closeModalAndClean();
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModalAndClean();
      }

      if (e.key === "ArrowLeft") {
        if (activeIndex === 0) {
          activeIndex = dataSourceRef.length - 1;
        } else {
          activeIndex -= 1;
        }
        modalImgRef.src = dataSourceRef[activeIndex];
      }

      if (e.key === "ArrowRight") {
        if (activeIndex < dataSourceRef.length - 1) {
          activeIndex += 1;
        } else {
          activeIndex = 0;
        }
        modalImgRef.src = dataSourceRef[activeIndex];
      }
      console.log(activeIndex);
    });
  }
});

const closeModalAndClean = function () {
  divModalRef.classList.remove("is-open");
  modalImgRef.src = "";
  modalImgRef.alt = "";
};
