var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var NEXT_IMAGE_SELECTOR = "[button-role=\"next\"]";
var PREVIOUS_IMAGE_SELECTOR = "[button-role=\"previous\"]";
var CLICKED_THUMBNAIL_INDEX = 0;

function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function(event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbNailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailsArray = [].slice.call(thumbnails);
    return thumbnailsArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    frame.classList.remove(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbNailsArray();
    thumbnails.forEach(addThumbClickHandler);

    for(var i=0; i < thumbnails.length; i++) {
        thumbnails[i].addEventListener("click", trackClickedThumbnailIndexHandler(i));
    }

    var nextButton = document.querySelector(NEXT_IMAGE_SELECTOR);

    nextButton.addEventListener("click", function() {
        imageNext();
    });

    var previousButton = document.querySelector(PREVIOUS_IMAGE_SELECTOR);
    previousButton.addEventListener("click", function() {
        imagePrevious();
    });

    addKeyPressHandler();
}

function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailsArray = [].slice.call(thumbnails);
  return thumbnailsArray;
}

function trackClickedThumbnailIndexHandler(index){
  "use strict";
  return function(){
    CLICKED_THUMBNAIL_INDEX = index;
  };
}

function imageNext() {
  "use strict";
  var thumbnails = getThumbnailsArray();

  CLICKED_THUMBNAIL_INDEX = CLICKED_THUMBNAIL_INDEX + 1;
  if (CLICKED_THUMBNAIL_INDEX < thumbnails.length) {
    setDetailsFromThumb(thumbnails[CLICKED_THUMBNAIL_INDEX]);
  }
  else {
    CLICKED_THUMBNAIL_INDEX = 0;
    setDetailsFromThumb(thumbnails[CLICKED_THUMBNAIL_INDEX]);
  }
}

function imagePrev() {
  "use strict";
  var thumbnails = getThumbnailsArray();

  if (CLICKED_THUMBNAIL_INDEX > 0) {
    CLICKED_THUMBNAIL_INDEX--;
  }
  else {
    CLICKED_THUMBNAIL_INDEX = thumbnails.length - 1;
  }
  setDetailsFromThumb(thumbnails[CLICKED_THUMBNAIL_INDEX]);
}
initializeEvents();