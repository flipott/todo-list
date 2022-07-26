import { handleTask } from "./taskController";

//Initialize DOM
const addModal = document.getElementById("add-item");
const closeModal = document.getElementById("modal-close");
const closeEditModal = document.getElementById("edit-close");

//Show or hide modals depending on button click
let modalControl = (function() {

    addModal.addEventListener("click", function(){
        showModal();
    });

    closeModal.addEventListener("click", function(){
        hideModal();
    });

    closeEditModal.addEventListener("click", function() {
        hideEditModal();
    });

    function showModal() {
        document.querySelector(".modal").style.display = "flex";
    }

    function hideModal() {
        document.querySelector(".modal").style.display = "none";
    }

    function showEditModal() {
        document.querySelector(".edit-modal").style.display = "flex";
    }

    function hideEditModal() {
        document.querySelector(".edit-modal").style.display = "none";
    }

    return { showModal, hideModal, showEditModal, hideEditModal }
})();

//Fills out page form for editing a to-do item
function displayEdit(editIndex) {
    
    modalControl.showEditModal();

    let priority = handleTask.itemArray[editIndex].priority;
    document.getElementById("edit-priority").value = priority;

    let title = handleTask.itemArray[editIndex].title;
    document.getElementById("edit-title").value = title;

    let description = handleTask.itemArray[editIndex].description;
    document.getElementById("edit-description").value = description;

    let dueDate = handleTask.itemArray[editIndex].dueDate;
    document.getElementById("edit-date").value = dueDate;

    let category = handleTask.itemArray[editIndex].category;
    document.getElementById("edit-category").value = category;

}

//Populate tasks on page
function displayTask(currentArray) {

    //Remove currently displayed data
    while (document.querySelector("tbody").childNodes.length > 1) {
        document.querySelector("tbody").removeChild(document.querySelector("tbody").lastChild);
    }

    // let currentArray = handleTask.itemArray;
    
    //Display new data
    for (let i=0;i<currentArray.length;i++) {
        let priority = currentArray[i].priority;
        let title = currentArray[i].title;
        let description = currentArray[i].description;
        let dueDate = currentArray[i].dueDate;
        let category = currentArray[i].category;

        let newRow = document.createElement("tr");
        newRow.setAttribute("data-set", i);

        let newInputData = document.createElement("td");
        newInputData.innerHTML = '<input type="checkbox" value="test" checked="unchecked">'
        newRow.appendChild(newInputData);

        let newPriorityData = document.createElement("td");
        newPriorityData.innerHTML = '<p class=' + priority + '>⚫</p>'
        newRow.appendChild(newPriorityData);

        let newTitleData = document.createElement("td");
        newTitleData.innerHTML = title;
        newRow.appendChild(newTitleData);

        let newDescriptionData = document.createElement("td");
        newDescriptionData.innerHTML = description;
        newRow.appendChild(newDescriptionData);

        let newDateData = document.createElement("td");
        newDateData.innerHTML = dueDate;
        newRow.appendChild(newDateData);

        let newCategoryData = document.createElement("td");
        newCategoryData.innerHTML = category;
        newRow.appendChild(newCategoryData);

        let newEditBtn = document.createElement("td");
        newEditBtn.innerHTML = '<button class="edit-btn">✎</button>';
        newRow.appendChild(newEditBtn);

        document.querySelector("tbody").appendChild(newRow);
    }
}

function tableTitle(title) {
    document.getElementById("table-title").innerHTML = title;
}


export { modalControl, displayTask, displayEdit, tableTitle }