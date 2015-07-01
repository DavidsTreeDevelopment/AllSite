// Problem: user interaction doesn't provide desired results
//Solution: add interactivity so the user can manage daily tasks

//These variables simply hold the html of each id they refer to.
var taskInput = document.getElementById("new-task"); //taskInput = <input id="new-task" type="text">
var addButton  = document.getElementsByTagName("button")[0]; //addButton = <button>Add</button>
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //Items will be added to the incompleteTasksHolder each time a user adds an item
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//This whole chunk of code (one function) creates all the HTML needed when the user hits "Add"
var createNewTaskElement = function(taskString) {
  //Create List item
  var listItem = document.createElement("li");
  //input (checkbox)
    
  var checkBox = document.createElement("input"); //checkbox
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("input");
  //button.edit
  var editButton = document.createElement("button");
  //button.delete
  var deleteButton = document.createElement("button");
  
  //each element needs modifying
  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit"; //Might have to use innerHTML
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  //taskString is what the user types in
  label.innerText = taskString;
  
  
  //each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  console.log("createNewTaskElement has finished running. Empty HTML elements are ready.");
  return listItem;
    
}


//Add a new task
var addTask = function() {
  console.log("Add task...");
  //Create  a new list item with the text from the #new-task
  var listItem = createNewTaskElement(taskInput.value);
  //Apend listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem); //This code appends all of the HTML to the end of the incompleteTasksHOlder
  console.log("Finished appending new HTML to incompleteTasksHolder var");
    bindTaskEvents(listItem, taskCompleted);//The taskCompleted argument is activated when the checkbox is clicked. It is simply waiting for the checkbox to be clicked.
    taskInput.value = "";//I assume this resets the taskInput's value
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton =  taskListItem.querySelector("button.delete");
  
  //bind the editTask to edit button
  editButton.onclick = editTask;
  //bind deleteTask to the delete button
  deleteButton.onclick = deleteTask;
  //bind checkBoxEventHandler to the checkbox
  checkBox.onchange = checkBoxEventHandler;//When checkbox is checked, the item will be marked as completed. checkBoxEventHandler = taskCompleted. This only runs if the tick box is clicked.
    console.log("bindTaskEvents has finished running and has bound listeners to the new item's buttons and checkbox");
}

//Mark a task as complete
var taskCompleted = function () {
  console.log("Task complete...");
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
    console.log("taskCompleted function has run");
}

//Mark a task as incomplete
var taskIncomplete = function() {
  console.log("Task incomplete...");
  //Append the task list item to the #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}  


//Edit an existing task
var editTask = function () {
  console.log("Edit task...");
  
  var listItem = this.parentNode; //select the parent list item
    console.log(listItem);
  
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode"); 
  //if the class of the parent is .editMode
  if(containsClass) {
    //Switch from .editMode
    //label text become the input's value
    label.innerText = editInput.value;
  } else {
    //Switch to .editMode
    //input value becomes the label's text
    editInput.value = label.innerText;
  }
  //Toggle .editMode on the list item
  listItem.classList.toggle("editMode");
}

//Delete an existing task
var deleteTask = function() {
  console.log("Delete task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  //Remove the parent list item from the ul
  ul.removeChild(listItem);
}

var ajaxRequest = function() {
  console.log("AJAX request");
}

// Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//cycle over incompleteTaskHolder ul list items
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completeTasksHolder ul list items
for(var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list item's children (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}













