// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);

// X-ray
(() => {
  (function () {
    "use strict";


    var imageCon = document.querySelector('#imageCon'),
      drag = document.querySelector('.image-drag'),
      left = document.querySelector('.image-left'),
      dragging = false,
      min = 0,
      max = imageCon.offsetWidth;
    //The HTMLElement.offsetWidth read-only property returns the layout width of an element. 

    function onDown() {
      dragging = true;
    }

    function onUp() {
      dragging = false;
    }

    function onMove(event) {
      if (dragging === true) {
        var x = event.clientX - imageCon.getBoundingClientRect().left;
        //The MouseEvent.clientX read-only property provides the horizontal coordinate within the application's client area at which the event occurred
        //The Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
        //X-coordinate, relative to the viewport origin, of the left of the rectangle box. Read only
        console.log(event.clientX);
        console.log(imageCon.getBoundingClientRect().left);
        //need logic to keep slider in box
        if (x < min) { //if x less than 0
          x = min;    //set x = 0
        }
        else if (x > max) { //otherwise if x is greater than 900
          x = max - 4; //set x to equal the max width minus 2 (width of slider)
        }
        drag.style.left = x + 'px';
        left.style.width = x + 'px';
      }
    }

    drag.addEventListener('mousedown', onDown, false);
    //add listener to actual drag div, if user clicks on it
    //drag.addEventListener('touchstart', onDown);
    document.body.addEventListener('mouseup', onUp, false);
    //document.body.addEventListener('mo', onUp);
    document.body.addEventListener('mousemove', onMove, false);
    //document.body.addEventListener('touchmove', onMove);

  })();


  /*231-187.5 = 43.5.  43.5 is how much of the car is left showing*/

  /*
  The MouseEvent.clientX read-only property provides the horizontal coordinate within the application's client area at which the event occurred (as opposed to the coordinates within the page). For example, clicking in the top-left corner of the client area will always result in a mouse event with a clientX value of 0, regardless of whether the page is scrolled horizontally.
  */


})();


//earbuds scrolling animatiom
(() => {

  const canvas = document.querySelector("#explode-view");
  const context = canvas.getContext("2d");

  canvas.width = 1920;
  canvas.height = 1080;

  const frameCount = 191; //how many still frames do we have?

  const images = []; // array to hold all of our images

  // object literal, that has a property of frame to hold the current frame 
  const buds = {
    frame: 0
  }

  // run a for loop to populate our images array
  for (let i = 0; i < frameCount; i++) {
    // console.log(i);
    const img = new Image();
    // string i am trying to create: images/explode_0013.webp
    img.src = `images/sequence/${(i + 1).toString().padStart(4, '0')}.pdf`;
    images.push(img);
  }

  // console.table(images);

  // we are not actually animating a DOM element, but rather than object
  //which contains a frame count, as the user scrolls we increase the value by 1 
  // We tell greensock there is a total of 449 frames to cycle through, so it knows when to stop
  // Greensock scrolling uses decimals so we use "snap" to give whole numbers. 
  gsap.to(buds, {
    frame: 191,
    snap: "frame",
    scrollTrigger: {
      trigger: "#explode-view",
      pin: true,
      scrub: 1,
      markers: true,
      start: "top, top"
    },
    onUpdate: render
  })

  images[0].addEventListener("onload", render);

  function render() {
    // console.log(buds.frame);
    // console.log(images[buds.frame])
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[buds.frame], 0, 0);
  }

})();