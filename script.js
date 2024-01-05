function showCheckMark(button) {
  var checkMark = button.nextElementSibling;

  if (checkMark.style.display === "none") {
      checkMark.style.display = "inline";
  } else {
      checkMark.style.display = "none";
  }
}