var button = document.getElementById("enter")
var input = document.getElementById("userinput")
var ul = document.querySelector("ul");
var listItems = document.querySelectorAll("li");
var deleteButtons = document.getElementsByName("delete");

function inputLength(){
	return input.value.length
}

function createListElement(){
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(input.value));
	li.addEventListener("click",toggleDone);
	ul.appendChild(li);
	input.value = "";

	var deleteButton = document.createElement("button");
	var node = document.createTextNode("Delete");
	deleteButton.setAttribute("name", "delete");
	deleteButton.append(node);
	deleteButton.addEventListener("click",onDeleteButtonClicked);
	li.appendChild(deleteButton);
}

function addListAfterClick(){
	if (inputLength() > 0) {
		createListElement();
	}
}

function addListAfterKeypress(event){
	if (inputLength() > 0 && event.which == 13){
		createListElement();
	}
}

function toggleDone(event) {
	event.target.classList.toggle("done");
}

function onDeleteButtonClicked(event){
	var parentElement = event.target.parentElement;
	parentElement.parentNode.removeChild(parentElement);
}

button.addEventListener("click", addListAfterClick)
input.addEventListener("keypress", addListAfterKeypress)
for (i = 0; i < listItems.length; i++){
	listItems[i].addEventListener("click", toggleDone);
}
for (i = 0; i < deleteButtons.length; i++){
	deleteButtons[i].addEventListener("click", onDeleteButtonClicked);
}