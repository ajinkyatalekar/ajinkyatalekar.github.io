function toggleDisplay(dropdownID) {
    var x = document.getElementById(dropdownID);
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  // window.onload = function() {
  //   var images = ['images/1.svg', 'images/2.svg', 'images/3.svg'];
  //   var image = images[Math.floor(Math.random() * images.length)]
  //   document.getElementsByTagName('body')[0].style.backgroundImage = "url('" + image + "')";
  // }