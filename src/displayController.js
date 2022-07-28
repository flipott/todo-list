import { handleTask } from "./taskController";

//Initialize DOM
const addModal = document.getElementById("add-item");
const addCategoryModal = document.getElementById("add-cat")
const closeModal = document.getElementById("modal-close");
const closeEditModal = document.getElementById("edit-close");
const closeCategoryModal = document.getElementById("category-close");
const closeEditCategoryModal = document.getElementById("edit-category-close")
const mainCategorySelect = document.getElementById("main-category");
const mainCategoryText = document.getElementById("main-text-category");

//Show or hide modals depending on button click
let modalControl = (function() {

    if (mainCategorySelect.value === "Add new category...") {
        console.log("Wow!");
    }


    addModal.addEventListener("click", function(){
        showModal();
    });

    closeModal.addEventListener("click", function(){
        hideModal();
    });

    closeEditModal.addEventListener("click", function() {
        hideEditModal();
    });

    closeEditCategoryModal.addEventListener("click", function() {
        hideEditCategoryModal();
    });

    addCategoryModal.addEventListener("click", function() {
        showCategoryModal();
    });

    closeCategoryModal.addEventListener("click", function() {
        hideCategoryModal();
    });

    function showModal() {
        hideCategoryModal();
        hideEditModal();
        document.querySelector(".modal").style.display = "flex";
    }

    function hideModal() {
        document.querySelector(".modal").style.display = "none";
    }

    function showEditModal() {
        hideModal();
        hideCategoryModal();
        document.querySelector(".edit-modal").style.display = "flex";
    }

    function hideEditModal() {
        document.querySelector(".edit-modal").style.display = "none";
    }

    function hideCategoryModal() {
        document.querySelector(".category-modal").style.display = "none";
    }

    function showEditCategoryModal() {
        document.querySelector(".edit-category-modal").style.display = "flex";
    }

    function hideEditCategoryModal() {
        document.querySelector(".edit-category-modal").style.display = "none";
    }

    function showCategoryModal() {
        hideModal();
        hideEditModal();
        document.querySelector(".category-modal").style.display = "flex";
    }

    displayUpdateCategory();



    return { showModal, hideModal, showEditModal, hideEditModal, showCategoryModal, hideCategoryModal, showEditCategoryModal, hideEditCategoryModal }
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

    console.log(category);
    console.log(handleTask.itemArray[editIndex]);

}

function displayEditCategory(name) {
    modalControl.showEditCategoryModal();
    document.getElementById("edit-category-sidebar").value = name;
}

function displayEditCategorySubmit(newCategory) {
    updateCategorySidebar();

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

function resetForms() {
    document.getElementById("edit-form").reset();
    document.getElementById("modal-form").reset();
    document.getElementById("category-form").reset();
}

function displayUpdateCategory() {
    const sidebarList = document.getElementById("category-list")
    const mainCategoryList = document.querySelector("#main-category");
    const editCategoryList = document.querySelector("#edit-category");

    sidebarList.innerHTML = '';
    mainCategoryList.innerHTML = '';
    editCategoryList.innerHTML = '';

    let mainLastOption = document.createElement("option");
    mainLastOption.value="add";
    mainLastOption.id="last-option";
    mainLastOption.innerText = "Add new category..."
    mainCategoryList.appendChild(mainLastOption);

    let editLastOption = document.createElement("option");
    editLastOption.value="add";
    editLastOption.id="last-option";
    editLastOption.innerText = "Add new category..."
    editCategoryList.appendChild(editLastOption);



    for (let i=0;i<handleTask.categories.length;i++) {

        let currentCat = handleTask.categories[i];
        let newElement = document.createElement("li");
        newElement.innerHTML = '<a id="' + currentCat + '"href="#" onclick="return false;">' + currentCat + '</a><button class="remove-cat-btn">✎</button>'
        sidebarList.appendChild(newElement);

        let newOption = document.createElement("option");
        newOption.value = currentCat;
        newOption.innerHTML = currentCat;

        let newEditOption = newOption.cloneNode(true);
        
        mainCategoryList.insertBefore(newOption, mainLastOption)
        editCategoryList.insertBefore(newEditOption, editLastOption);

    }

    document.getElementById("main-text-category").style.display = "none";
    document.getElementById("edit-text-category").style.display = "none";

}


export { modalControl, displayTask, displayEdit, tableTitle, displayUpdateCategory, resetForms, displayEditCategory, displayEditCategorySubmit }