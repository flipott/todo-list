import { ca } from "date-fns/locale";
import { modalControl } from "./displayController";
import { handleTask } from "./taskController";

const submitModal = document.getElementById("modal-submit");
let newItem;

//Form responses


submitModal.addEventListener("click", function() {

    let priority = document.getElementById("priority").value;
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let dueDate = document.getElementById("due-date").value;
    let category = document.getElementById("category").value; 


    handleTask.addItem(handleTask.itemFactory(priority, title, description, dueDate, category));
    modalControl.hideModal();
    document.getElementById("modal-form").reset();
});

