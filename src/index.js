import { ca } from "date-fns/locale";
import { modalControl, displayTask, displayEdit } from "./displayController";
import { handleTask } from "./taskController";

const submitModal = document.getElementById("modal-submit");
let newItem;
let editIndex;

//Fire DOM and task events when a new to-do item is submitted
submitModal.addEventListener("click", function() {

    let priority = document.getElementById("priority").value;
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let dueDate = document.getElementById("due-date").value;
    let category = document.getElementById("category").value; 

    handleTask.addItem(handleTask.itemFactory(priority, title, description, dueDate, category));
    modalControl.hideModal();

    displayTask();
    document.getElementById("modal-form").reset();
});

document.addEventListener("click", function(e) {
    if(e.target && e.target.className === "edit-btn") {
        editIndex = e.target.parentElement.parentElement.getAttribute("data-set")
        displayEdit(editIndex);
    };
});

document.getElementById("edit-submit").addEventListener("click", function() {
    let newPriority = document.getElementById("edit-priority").value;
    let newTitle = document.getElementById("edit-title").value;
    let newDescription = document.getElementById("edit-description").value;
    let newDueDate = document.getElementById("edit-date").value;
    let newCategory = document.getElementById("edit-category").value; 

    handleTask.editItem(editIndex, newPriority, newTitle, newDescription, newDueDate, newCategory);
    modalControl.hideEditModal();
    displayTask();
})

document.getElementById("delete-item").addEventListener("click", function() {
    handleTask.deleteItem(editIndex);
    modalControl.hideEditModal();
    displayTask();
})