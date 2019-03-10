var elements = document.getElementsByClassName("card");
var i;
function listView() {
  for (i = 0; i < elements.length; i++) {
    elements[i].style.width = "75%";
	elements[i].style.height="28rem";
  }
}

function gridView() {
  for (i = 0; i < elements.length; i++) {
    elements[i].style.width = "46%";
	elements[i].style.height="24rem";
  }
}