var taskInput=document.getElementById("new-task");
var addButton=document.getElementsByTagName("button")[0];
var incompleteTaskHolder=document.getElementById("incomplete");
var completedTasksHolder=document.getElementById("completed");


//New task list item
var createNewTaskElement=function(taskString){
  var listItem=document.createElement("li");
  var checkBox=document.createElement("input");
  var label=document.createElement("label");
  var editInput=document.createElement("input");
  var editButton=document.createElement("button");
  var deleteButton=document.createElement("button");
  var deleteButtonImg=document.createElement("img");
  label.innerText=taskString;
  label.className="main__task";
  checkBox.className="main__task-checkbox";
  editInput.className="main__task-input";
  checkBox.type="checkbox";
  editInput.type="text";

  editButton.innerText="Edit";
  editButton.className="main__edit-btn";

  deleteButton.innerText="Delete";
  deleteButton.className="main__delete-btn";
  deleteButtonImg.src="./remove.svg";
  deleteButtonImg.alt="remove";
  deleteButtonImg.className="main__delete-img";
  deleteButton.appendChild(deleteButtonImg);


  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



var addTask=function(){
  console.log("Add Task...");
  if (!taskInput.value) return;
  var listItem=createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");


  var listItem=this.parentNode;

  var editInput=listItem.querySelector(".main__task-input");
  var label=listItem.querySelector("label");
  var editBtn=listItem.querySelector(".main__edit-btn");
  var containsClass=listItem.classList.contains("main__edit-mode");
  if(containsClass){

    label.classList.add("main__task-label-edit");
    label.innerText=editInput.value;
    editBtn.innerText="Edit";
    editInput.classList.add("main__task-input-edit");
  }else{
    label.classList.remove("main__task-label-edit");
    editInput.classList.remove("main__task-input-edit");
    editInput.value=label.innerText;
    editBtn.innerText="Save";
  }

  listItem.classList.toggle("main__edit-mode");
};


//Delete task.
var deleteTask=function(){
  console.log("Delete Task...");

  var listItem=this.parentNode;
  var ul=listItem.parentNode;
  ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
  console.log("Complete Task...");

  var listItem=this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
  console.log("Incomplete Task...");
  var listItem=this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
  console.log("AJAX Request");
}



addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
  var checkBox=taskListItem.querySelector(".main__task-checkbox");
  var editButton=taskListItem.querySelector(".main__edit-btn");
  var deleteButton=taskListItem.querySelector(".main__delete-btn");


  editButton.onclick=editTask;
  deleteButton.onclick=deleteTask;
  checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
for (var i=0; i<incompleteTaskHolder.children.length;i++){

  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
