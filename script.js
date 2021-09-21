function toggleDisplay(dropdownID) {
    var x = document.getElementById(dropdownID);
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
