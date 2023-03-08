import { handleTask } from "./taskController";

//Initialize DOM
const addModal = document.getElementById("add-item");
const addCategoryModal = document.getElementById("add-cat")
const closeModal = document.getElementById("modal-close");
const closeEditModal = document.getElementById("edit-close");
const closeCategoryModal = document.getElementById("category-close");
const closeEditCategoryModal = document.getElementById("edit-category-close")

//Handles dynamic display of DOM elements
const displayController = (function() {

    //Show or hide modals depending on button click
    const modalControl = (function() {

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
        document.querySelector(`input[name="edit-priority"][value="${priority}"]`).checked = true;

        let title = handleTask.itemArray[editIndex].title;
        document.getElementById("edit-title").value = title;

        let description = handleTask.itemArray[editIndex].description;
        document.getElementById("edit-description").value = description;

        let dateStr = handleTask.itemArray[editIndex].dueDate;
        dateStr = new Date(dateStr);
        dateStr = dateStr.toISOString();
        dateStr = dateStr.slice(0,10);
        document.getElementById("edit-date").value = dateStr;
        

        let category = handleTask.itemArray[editIndex].category;
        document.getElementById("edit-category").value = category;
    }
    
    //Fills out page form for editing category
    function displayEditCategory(name) {
        modalControl.showEditCategoryModal();
        document.getElementById("edit-category-sidebar").value = name;
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
    
            let linkWrapper = document.createElement("button");
            linkWrapper.setAttribute("class", "status-change");
            linkWrapper.setAttribute("onclick", "return false;");
    
            let imgWrapper = document.createElement("img");
    
            if (status === true) {
                imgWrapper.setAttribute("src", "../src/images/completed-status-light.svg");
                imgWrapper.setAttribute("class", "checked");
            } else {
                imgWrapper.setAttribute("src", "../src/images/pending-status-light.svg");
                imgWrapper.setAttribute("class", "unchecked");
            }

            imgWrapper.setAttribute("width", "25px");
            imgWrapper.setAttribute("height", "25px");

    
            linkWrapper.appendChild(imgWrapper);
            newInputData.appendChild(linkWrapper);
            newRow.appendChild(newInputData);
    
            let newPriorityData = document.createElement("td");
            let priorityImgWrapper = document.createElement("img");

            if (priority === "low") {
                priorityImgWrapper.setAttribute("src", "../src/images/low-priority.svg");
            } else if (priority === "medium") {
                priorityImgWrapper.setAttribute("src", "../src/images/medium-priority.svg");
            } else {
                priorityImgWrapper.setAttribute("src", "../src/images/high-priority.svg");
            }

            priorityImgWrapper.setAttribute("width", "25px");
            priorityImgWrapper.setAttribute("height", "25px");
    
            newPriorityData.appendChild(priorityImgWrapper);
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
    
            let newEditData = document.createElement("td");
            
            let newEditBtn = document.createElement("button");

            let newEditImg = document.createElement("img");
            newEditImg.setAttribute("src", "../src/images/edit-light.svg");
            newEditImg.setAttribute("class", "edit-btn");

            newEditImg.setAttribute("width", "25px");
            newEditImg.setAttribute("height", "25px");

            newEditBtn.appendChild(newEditImg);
            newEditData.appendChild(newEditBtn);
            newRow.appendChild(newEditData);
    
            document.querySelector("tbody").appendChild(newRow);
        };
    }
    
    //Sets the title of the table
    function tableTitle(title) {
        document.getElementById("table-title").innerHTML = title;
    }

    //Resets forms
    function resetForms() {
        document.getElementById("edit-form").reset();
        document.getElementById("modal-form").reset();
        document.getElementById("category-form").reset();
        document.getElementById("edit-category-form").reset();
    }
    
    //Updates categories in sidebar and dropdown menus
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
    
        let mainPlaceholder = document.createElement("option");
        mainPlaceholder.value = "";
        mainPlaceholder.setAttribute("disabled", "");
        mainPlaceholder.setAttribute("selected", "");
        mainPlaceholder.innerText = "Select your option";
        mainCategoryList.insertBefore(mainPlaceholder, mainLastOption);
    
        let editLastOption = document.createElement("option");
        editLastOption.value="add";
        editLastOption.id="last-option";
        editLastOption.innerText = "Add new category..."
        editCategoryList.appendChild(editLastOption);
    
        let editPlaceholder = document.createElement("option");
        editPlaceholder.value = "";
        editPlaceholder.setAttribute("disabled", "");
        editPlaceholder.setAttribute("selected", "");
        editPlaceholder.innerText = "Select your option";
        editCategoryList.insertBefore(editPlaceholder, editLastOption);
    
        for (let i=0;i<handleTask.categories.length;i++) {    
            let currentCat = handleTask.categories[i].charAt(0).toUpperCase() + handleTask.categories[i].slice(1);
            let newElement = document.createElement("li");
            newElement.setAttribute("data-set", i);
            newElement.setAttribute("id", currentCat.toLowerCase());
            newElement.classList.add("sidebar-item");
            newElement.innerText = currentCat;
            sidebarList.appendChild(newElement);
    
            let newOption = document.createElement("option");
            newOption.value = currentCat;
            newOption.innerHTML = currentCat;
    
            let newEditOption = newOption.cloneNode(true);
            
            mainCategoryList.insertBefore(newOption, mainLastOption);
            editCategoryList.insertBefore(newEditOption, editLastOption);
    
        };
    
        document.getElementById("main-text-category").style.display = "none";
        document.getElementById("edit-text-category").style.display = "none";
    }

    function highlightSection(section) {
        const elementList = document.querySelectorAll(".highlight-polygon");
        elementList.forEach((element) => {
            element.remove();
        });

        const element = document.getElementById(section);
        const highlight = document.createElement("img");
        highlight.setAttribute("src", "../src/images/highlight-polygon.svg")
        highlight.setAttribute("class", "highlight-polygon")
        highlight.setAttribute("height", "25px")
        highlight.setAttribute("width", "25px")
        element.appendChild(highlight);
    }

    function setRemoveCategory(section) {
        const dataSet = document.getElementById(section).parentElement.getAttribute("data-set");
        const button = document.getElementsByClassName("remove-cat-btn")[0];
        button.setAttribute("data-set", dataSet);
    }

    return { modalControl, displayEdit, displayEditCategory, displayTask, tableTitle, resetForms, displayUpdateCategory, highlightSection, setRemoveCategory }

})();

export { displayController }