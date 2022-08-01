import { handleTask } from "./taskController";

//Initialize DOM
const addModal = document.getElementById("add-item");
const addCategoryModal = document.getElementById("add-cat")
const closeModal = document.getElementById("modal-close");
const closeEditModal = document.getElementById("edit-close");
const closeCategoryModal = document.getElementById("category-close");
const closeEditCategoryModal = document.getElementById("edit-category-close")

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

}

function displayEditCategory(name) {
    modalControl.showEditCategoryModal();
    document.getElementById("edit-category-sidebar").value = name;
}

function displayEditCategorySubmit(newCategory) {

}

//Populate tasks on page
function displayTask(currentArray) {

    //Remove currently displayed data
    while (document.querySelector("tbody").childNodes.length > 1) {
        document.querySelector("tbody").removeChild(document.querySelector("tbody").lastChild);
    }
    
    //Display new data
    for (let i=0;i<currentArray.length;i++) {
        let priority = currentArray[i].priority;
        let title = currentArray[i].title;
        let description = currentArray[i].description;
        let dueDate = currentArray[i].dueDate;
        let category = currentArray[i].category;
        let status = currentArray[i].status;
        let originalArrayIndex = currentArray[i].dataSet;

        let newRow = document.createElement("tr");
        newRow.setAttribute("data-set", i);
        newRow.setAttribute("original-index", originalArrayIndex);

        let newInputData = document.createElement("td");

        let linkWrapper = document.createElement("a");
        linkWrapper.setAttribute("class", "status-change");
        linkWrapper.setAttribute("href", "#");
        linkWrapper.setAttribute("onclick", "return false;");

        let svgWrapper = document.createElement("img");

        if (status === true) {
            svgWrapper.setAttribute("src", "../src/images/checked.svg");
            svgWrapper.setAttribute("width", "20px");
            svgWrapper.setAttribute("height", "20px");
            svgWrapper.setAttribute("class", "checked");
        } else {
            svgWrapper.setAttribute("src", "../src/images/unchecked.svg");
            svgWrapper.setAttribute("width", "20px");
            svgWrapper.setAttribute("height", "20px");
            svgWrapper.setAttribute("class", "unchecked");
        }

        linkWrapper.appendChild(svgWrapper);
        newInputData.appendChild(linkWrapper);
        newRow.appendChild(newInputData);

        let newPriorityData = document.createElement("td");
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 12 12");
        svg.setAttribute("width", "20px");
        svg.setAttribute("height", "20px");
        svg.setAttribute("overflow", "visible");

        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "6");
        circle.setAttribute("cy", "6");
        circle.setAttribute("r", "6");
        circle.setAttribute("fill-rule", "evenodd");

        if (priority === "low") {
            circle.setAttribute("fill", "#638f65");
        } else if (priority === "medium") {
            circle.setAttribute("fill", "#b0ba65");
        } else {
            circle.setAttribute("fill", "#ad6749");
        }

        svg.appendChild(circle);
        newPriorityData.appendChild(svg);
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
        newElement.innerHTML = '<a id="' + currentCat + '"href="#" onclick="return false;">' + currentCat + '</a><button class="remove-cat-btn" data-set = ' + i + '>✎</button>'
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