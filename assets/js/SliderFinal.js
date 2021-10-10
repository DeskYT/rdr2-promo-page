class Slider {
  constructor(sliderContainer, images, currentIndex = 0, autoScroll = false) {
    if (!Array.isArray(images) || !sliderContainer instanceof HTMLElement) {
      throw new TypeError();
    }
    this._images = images;
    this.currentIndex = currentIndex;
    this._sliderContainer = sliderContainer;
    this._autoScroll = autoScroll;
    this._buttonsEnabled = true;
    this._autoScrollInterval = null;
    this._isFocused = false;
    this._initSlider();
  }

  _initSlider() {
    this._prevImageElem = createElement("img", {
      classNames: ["slide", "prev-slide"],
    });
    this._curImageElem = createElement("img", {
      classNames: ["slide", "cur-slide"],
    });
    this._nextImageElem = createElement("img", {
      classNames: ["slide", "next-slide"],
    });
    this._controls = this._createControls()
    this._sliderContainer.append(
      createElement(
        "div",
        {classNames: ["slides"]},
        this._prevImageElem,
        this._curImageElem,
        this._nextImageElem
      ),
      this._controls
    );
    [this._prevImageElem.src, this._curImageElem.src, this._nextImageElem.src] =
      this.activeSlides;
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
    this._prevImageElem.style.animationName = "";
    this.currentIndex = prev ? this.prevIndex : this.nextIndex;
    this._buttonsEnabled = false;

    const classname = prev ? "rightPrev" : "leftNext";
    this._prevImageElem.classList.add(classname);
    setTimeout(() => {
      const [prevImg, curImg, nextImg] = this.activeSlides;
      this._curImageElem.src = curImg;
      setTimeout(() => {
        this._prevImageElem.src = prevImg;
        this._nextImageElem.src = nextImg;

        this._prevImageElem.classList.remove(classname);
        this._buttonsEnabled = true;
        this._initAutoScroll();
      }, 100);
    }, 700);
  }

  get images() {
    return this._images;
  }

  get currentIndex() {
    return this._currentIndex;
  }

  set currentIndex(v) {
    if (typeof v !== "number") {
      throw new TypeError();
    }
    if (v >= 0 && v < this._images.length) {
      this._currentIndex = v;
    } else {
      this._currentIndex = 0;
    }
  }

  get nextIndex() {
    return (this.currentIndex + 1) % this._images.length;
  }

  get prevIndex() {
    return (this.currentIndex - 1 + this._images.length) % this._images.length;
  }

  get activeSlides() {
    return [
      this.images[this.prevIndex],
      this.images[this.currentIndex],
      this.images[this.nextIndex],
    ];
  }
}
