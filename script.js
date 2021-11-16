function toggleDisplay(dropdownID) {
  var x = document.getElementById(dropdownID);
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

var y = 0;
function toggleBackground() {
  var x = document.body;
  if (y == 0) {
    x.style.backgroundImage = "url('images/none.svg')";
    y = 1;
  } else {
    x.style.backgroundImage = "url('images/2.svg')";
    y = 0;
  }
}


// window.onload = function() {
//   var images = ['images/1.svg', 'images/2.svg', 'images/3.svg'];
//   var image = images[Math.floor(Math.random() * images.length)]
document.getElementsByTagName('body')[0].style.backgroundImage = "url('" + image + "')";
  // }