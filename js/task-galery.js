import gallerySorceFiles from "./gallery-items.js";
const listRef = document.querySelector("ul.js-gallery");
const modal = document.querySelector("div.js-lightbox");
const overlay = document.querySelector('.lightbox__overlay');
const modalImage = document.querySelector('.lightbox__image');
const closeBtn = document.querySelector('[data-action="close-lightbox"]');
let activeIndex = 0
let li;
let index = 0
listRef.append(
  ...gallerySorceFiles.map(function (file) {
      let li = document.createElement("li");
    li.classList.add("gallery__item");
    
      let a = document.createElement("a");
      a.classList.add("gallery__link");
    a.setAttribute("href", file.original);
    a.setAttribute("index", index)
      let img = document.createElement("img");
      img.classList.add("gallery__image");
      img.setAttribute("src", file.preview);
    img.setAttribute("alt", file.description);
    img.setAttribute("index", index)    
    index +=1
    img.dataset.sourse = file.original;
    a.appendChild(img);
    li.appendChild(a);
    
    return li;
  })
);
listRef.addEventListener('click', onPictureClick)

function onPictureClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") { return; };
  modalImage.src = event.target.dataset.sourse;
  modalImage.alt = event.target.alt;
  modalImage.setAttribute("index", event.target.getAttribute("index"))
  activeIndex = Number(event.target.getAttribute("index"));
  modalIsOpen();
}

const modalIsOpen = function () {
  modal.classList.add("is-open");
  window.addEventListener('keydown', buttonClick);
};
const modalIsClosed = function () {
  modal.classList.remove("is-open");
  window.removeEventListener('keydown', buttonClick);
  modalImage.src = '';
  modalImage.alt = '';
};

closeBtn.addEventListener('click', modalIsClosed);

function overlayClick(event) {
  if (event.currentTarget === event.target) {
    modalIsClosed();
  }
}

overlay.addEventListener('click', overlayClick);

function buttonClick(event) {  
  switch (event.code) {
    case 'Escape':
      modalIsClosed();
      break;

    case 'ArrowRight':
     moveInGallery(event, "right");
      break;

    case 'ArrowLeft':
     moveInGallery(event, "left");
      break;

  }
}

const moveInGallery = function (event, indexToMove) {
  if (indexToMove === "right") {
    
    if (activeIndex === gallerySorceFiles.length - 1) {
      activeIndex = 0;
    }
    else {activeIndex += 1;}
  } else if (indexToMove === "left") {
    
    if (activeIndex === 0) {
      activeIndex = gallerySorceFiles.length - 1;
    }
    else {activeIndex -= 1;}
  }
  let a;
  let lis = listRef.getElementsByTagName("li");
  for (let i = 0; i < lis.length; i +=1){
    if (Number(lis[i].firstChild.getAttribute("index")) === activeIndex) { 
      a = lis[i].firstChild
      }
  }
  modalImage.src = a.getAttribute("href")
};