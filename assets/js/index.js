const images = [
  "./assets/images/screen1.jpg",
  "./assets/images/screen2.jpg",
  "./assets/images/screen3.jpg",
  "./assets/images/screen4.jpg",
];


const slidesContainer = document.querySelector(".slider-container");

const slider = new Slider(slidesContainer, images);
const [prevButton, nextButton] = document.querySelectorAll(
  ".slider-container > button"
);

/*
updateView(slider.currentSlide);

const createButtonHandler = (action = "next") => () => {
  const newImages = slider[action]();
  updateView(newImages);
};

prevButton.addEventListener("click", createButtonHandler("prev"));
nextButton.addEventListener("click", createButtonHandler("next"));


function updateView([prevSlideLink, curSlideLink, nextSlideLink]) {
  prevSlideImage.setAttribute("src", prevSlideLink);
  cur
}
*/