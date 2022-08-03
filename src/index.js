import { displayController } from "./displayController";
import { handleTask } from "./taskController";

const submitModal = document.getElementById("modal-submit");
const addBtn = document.getElementById("add-item");
let newItem;
let editIndex;
let currentSection = "viewAll"
let oldCategory;
let newCategory;
let statusIndex;

//Fire DOM and task events when a new to-do item is submitted
submitModal.addEventListener("click", function() {

    if (formValidate("submitModal")) {
        let priority = document.getElementById("priority").value;
        let title = document.getElementById("title").value;
        let description = document.getElementById("description").value;
        let dueDate = document.getElementById("due-date").value;
        let category = document.getElementById("main-category").value;
        let status = false;
        
        if (category === "add") {
            category = document.getElementById("main-text-category").value.toLowerCase();
            handleTask.addCategory(category);
            displayController.displayUpdateCategory();
        } 
        
        handleTask.addItem(handleTask.itemFactory(status, priority, title, description, dueDate, category));
        displayController.modalControl.hideModal();
        sectionSwitcher(); 
    }
});

function formValidate(modal) {
    if (modal === "submitModal") {
        if (document.getElementById("modal-form").checkValidity()) {
            if ((document.getElementById("main-category").value != "" && document.getElementById("main-text-category").style.display === "none") || document.getElementById("main-text-category").value != "") {
                return true;
            }
        } else {
            document.getElementById("modal-form").reportValidity()
            return false;
        }
    } else if (modal === "editModal") {
        if (document.getElementById("edit-form").checkValidity()) {
            if ((document.getElementById("edit-category").value != "" && document.getElementById("edit-text-category").style.display === "none") || document.getElementById("edit-text-category").value != "") {
                return true;
            }
        } else {
            document.getElementById("edit-form").reportValidity()
            return false;
        }
    } else if (modal === "editCategoryModal") {
        if (document.getElementById("edit-category-form").checkValidity()) {
            return true;
        } else {
            document.getElementById("edit-category-form").reportValidity()
            return false;
        };
    } else if (modal === "categoryModal") {
        if (document.getElementById("category-form").checkValidity()) {
            return true;
        } else {
            document.getElementById("category-form").reportValidity()
            return false;
        };
    }
}

//Controls edit modal
document.addEventListener("click", function(e) {
    if(e.target && e.target.className === "edit-btn") {
        editIndex = e.target.parentElement.parentElement.getAttribute("original-index")
        displayController.displayEdit(editIndex);
    } else if(handleTask.categories.includes(e.target.id.toLowerCase()) && e.target.tagName == "A") {
        let selectedCategory = e.target.innerText.toLowerCase();
        currentSection = selectedCategory;
        catSection(selectedCategory);
    } else if(e.target && e.target.className === "remove-cat-btn") {
        let categoryIndex = e.target.getAttribute("data-set");
        let editCategory = handleTask.categories[categoryIndex];
        displayController.displayEditCategory(editCategory);
        oldCategory = editCategory;
        currentSection = oldCategory;
    } else if(e.target.parentElement.className === "status-change") {
        statusIndex = e.target.parentElement.parentElement.parentElement.getAttribute("original-index");
        handleTask.updateStatus(statusIndex);
        sectionSwitcher();
    }
});

//Edits item in array and DOM
document.getElementById("edit-submit").addEventListener("click", function() {
    if (formValidate("editModal")) {
        let newPriority = document.getElementById("edit-priority").value;
        let newTitle = document.getElementById("edit-title").value;
        let newDescription = document.getElementById("edit-description").value;
        let newDueDate = document.getElementById("edit-date").value;
        let newCategory = document.getElementById("edit-category").value;

        if (newCategory === "add") {
            newCategory = document.getElementById("edit-text-category").value.toLowerCase();
            handleTask.addCategory(newCategory);
            displayController.displayUpdateCategory();
        } 

        handleTask.editItem(editIndex, newPriority, newTitle, newDescription, newDueDate, newCategory);
        displayController.modalControl.hideEditModal();
        sectionSwitcher();
    }
});

document.getElementById("edit-category-submit").addEventListener("click", function() {
    if (formValidate("editCategoryModal")) {
        newCategory = document.getElementById("edit-category-sidebar").value;
        currentSection = newCategory;
        handleTask.editCategory(oldCategory, newCategory);
        displayController.modalControl.hideEditCategoryModal();
        displayController.displayUpdateCategory();
        sectionSwitcher();
    };
})

//Deletes item from array and DOM
document.getElementById("delete-item").addEventListener("click", function() {
    handleTask.deleteItem(editIndex);
    displayController.modalControl.hideEditModal();
    displayController.displayTask(handleTask.itemArray);
});

//Displays all tasks
document.getElementById("view-all").addEventListener("click", function() {
    viewAll();
});

//Today-only task filter
document.getElementById("today").addEventListener("click", function() {
    today();
});

//This week-only task filter
document.getElementById("this-week").addEventListener("click", function() {
    thisWeek();
});

document.getElementById("completed-tasks").addEventListener("click", function() {
    completedTasks();
});

function viewAll() {
    displayController.tableTitle("Viewing All Tasks");
    let currentArray = handleTask.allCurrentTasks();
    displayController.displayTask(currentArray);
    currentSection = "viewAll";
    addBtn.style.visibility = "visible";

}

function today() {
    currentSection = "today";
    let dailyArray = handleTask.dailyFilter();
    displayController.displayTask(dailyArray);
    displayController.tableTitle("Viewing Today's Tasks");
    addBtn.style.visibility = "visible";

}

function thisWeek() {
    currentSection = "thisWeek";
    let weeklyArray = handleTask.weeklyFilter();
    displayController.displayTask(weeklyArray);
    displayController.tableTitle("Viewing This Week's Tasks");
    addBtn.style.visibility = "visible";

}

function completedTasks() {
    currentSection = "completedTasks";
    let completedArray = handleTask.completedFilter();
    displayController.displayTask(completedArray);
    displayController.tableTitle("Viewing Completed Tasks");
    addBtn.style.visibility = "hidden";
}

function catSection(selectedCategory) {
    currentSection = selectedCategory;
    let categoryArray = handleTask.categoryFilter(selectedCategory);
    displayController.tableTitle("Viewing all " + selectedCategory + " tasks");
    displayController.displayTask(categoryArray);
}

document.getElementById("category-submit").addEventListener("click", function() {
    if (formValidate("categoryModal")) {
        const newCategory = document.getElementById("category-category").value.toLowerCase();
        handleTask.addCategory(newCategory);
        catSection(newCategory);
        displayController.displayUpdateCategory();
        displayController.modalControl.hideCategoryModal();
        displayController.resetForms();
    };
})

document.getElementById("delete-category").addEventListener("click", function() {
    displayController.modalControl.hideEditCategoryModal();

    document.getElementById("delete-category-name").innerText = oldCategory;
    document.querySelector(".delete-category-warning").style.display = "flex"
    

    document.getElementById("confirm-delete").addEventListener("click", function() {
        handleTask.deleteCategory(oldCategory);
        document.querySelector(".delete-category-warning").style.display = "none";
        displayController.displayUpdateCategory();
        viewAll();
    });

    document.getElementById("cancel-delete").addEventListener("click", function() {
        document.querySelector(".delete-category-warning").style.display = "none";
        displayController.modalControl.showEditCategoryModal();

    });
});

function sectionSwitcher() {
    switch(currentSection) {
        case "viewAll":
            viewAll();
            break;
        case "today":
            today();
            break;
        case "thisWeek":
            thisWeek();
            break;  
        case "completedTasks":
            completedTasks();
            break;
    };

    if (currentSection != "viewAll" && currentSection != "today" && currentSection != "thisWeek" && currentSection != "completedTasks") {
        catSection(currentSection);
    }

    displayController.resetForms();
}