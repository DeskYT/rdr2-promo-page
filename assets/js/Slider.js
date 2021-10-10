class Slider {
  constructor(sliderContainer, slideData, createElementCallback, currentIndex = 0, autoScroll = false, customControls = null) {
    if (!Array.isArray(slideData) || !sliderContainer instanceof HTMLElement) {
      throw new TypeError();
    }
    this._slideData = slideData;
    this._createElementCallback = createElementCallback;
    this.currentIndex = currentIndex;
    this._sliderContainer = sliderContainer;
    this._autoScroll = autoScroll;
    this._buttonsEnabled = true;
    this._autoScrollInterval = null;
    this._isFocused = false;
    this._initSlider();
  }

  _initSlider() {
    const [prevSlideData, curSlideData, nextSlideData] = this.activeSlides;
    this._prevSlideElem = this._createElementCallback(prevSlideData);
    this._prevSlideElem.classList.add('prev-slide')
    this._curSlideElem = this._createElementCallback(curSlideData);
    this._curSlideElem.classList.add('cur-slide')
    this._nextSlideElem = this._createElementCallback(nextSlideData);
    this._nextSlideElem.classList.add('next-slide')
    this._controls = this._createControls()
    this._sliderContainer.append(
      createElement(
        "div",
        {classNames: ["slides"]},
        this._prevSlideElem,
        this._curSlideElem,
        this._nextSlideElem
      ),
      this._controls
    );
    this._initAutoScroll();
    this._initListeners();
  }

  _initAutoScroll() {
    if (this._autoScroll && !this._isFocused) {
      clearInterval(this._autoScrollInterval);
      this._autoScrollInterval = setInterval(() => {
        this.switchSlide()
      }, 4000);
    }
  }

  _initListeners() {
    // For devices with mouse
    this._sliderContainer.addEventListener("mouseover", this._mouseOverHandler)
    this._sliderContainer.addEventListener("mouseout", this._mouseOutHandler)

    // For devices with touch screens
    this._sliderContainer.addEventListener("focus", this._mouseOverHandler)
    this._sliderContainer.addEventListener("blur", this._mouseOutHandler)
  }

  _mouseOverHandler = () => {
    this._controls.style.opacity = "1";
    this._isFocused = true;
    clearInterval(this._autoScrollInterval);
  }

  _mouseOutHandler = () => {
    this._controls.style.opacity = "0";
    this._isFocused = false;
    this._initAutoScroll()
  }

  _createControls() {
    return createElement(
      "div",
      {classNames: ["controls"]},
      createElement(
        "button",
        {
          classNames: ["control-btn", "prev-btn"],
          handlers: {click: this.prevButtonHandler},
        },
        "❮"
      ),
      createElement(
        "button",
        {
          classNames: ["control-btn", "next-btn"],
          handlers: {click: this.nextButtonHandler},
        },
        "❯"
      )
    );
  }

  prevButtonHandler = (event) => {
    if (!this._buttonsEnabled) return;
    this.switchSlide(this.nextIndex, true);
  };

  nextButtonHandler = (event) => {
    if (!this._buttonsEnabled) return;
    this.switchSlide();
  };

  switchSlide(nextIndex = this.nextIndex, prev = null) {
    clearInterval(this._autoScrollInterval);
    this._prevSlideElem.style.animationName = "";
    this.currentIndex = prev ? this.prevIndex : this.nextIndex;
    this._buttonsEnabled = false;

    const classname = prev ? "rightPrev" : "leftNext";
    this._prevSlideElem.classList.add(classname);
    setTimeout(() => {
      const [prevSlideData, curSlideData, nextSlideData] = this.activeSlides;
      const newCurElem = this._createElementCallback(curSlideData);
      newCurElem.classList.add('cur-slide')
      const newPrevElem = this._createElementCallback(prevSlideData);
      newPrevElem.classList.add('prev-slide')
      const newNextElem = this._createElementCallback(nextSlideData);
      newNextElem.classList.add('next-slide')
      this._curSlideElem.parentNode.replaceChild(newCurElem, this._curSlideElem);
      this._curSlideElem = newCurElem;
      setTimeout(() => {
        this._prevSlideElem.parentNode.replaceChild(newPrevElem, this._prevSlideElem);
        this._prevSlideElem = newPrevElem;
        this._nextSlideElem.parentNode.replaceChild(newNextElem, this._nextSlideElem);
        this._nextSlideElem = newNextElem
        //this._prevSlideElem.classList.remove(classname);
        this._buttonsEnabled = true;
        this._initAutoScroll();
      }, 100);
    }, 700);
  }

  get slideData() {
    return this._slideData;
  }

  get currentIndex() {
    return this._currentIndex;
  }

  set currentIndex(v) {
    if (typeof v !== "number") {
      throw new TypeError();
    }
    if (v >= 0 && v < this._slideData.length) {
      this._currentIndex = v;
    } else {
      this._currentIndex = 0;
    }
  }

  get nextIndex() {
    return (this.currentIndex + 1) % this._slideData.length;
  }

  get prevIndex() {
    return (this.currentIndex - 1 + this._slideData.length) % this._slideData.length;
  }

  get activeSlides() {
    return [
      this._slideData[this.prevIndex],
      this._slideData[this.currentIndex],
      this._slideData[this.nextIndex],
    ];
  }
}
