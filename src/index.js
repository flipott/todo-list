import { ca } from "date-fns/locale";
import { modalControl, displayTask, displayEdit, tableTitle, displayUpdateCategory, resetForms, displayEditCategory, displayEditCategorySubmit } from "./displayController";
import { handleTask } from "./taskController";

const submitModal = document.getElementById("modal-submit");
let newItem;
let editIndex;
let currentSection = "viewAll"
let oldCategory;
let newCategory;
let statusIndex;

//Fire DOM and task events when a new to-do item is submitted
submitModal.addEventListener("click", function() {
    let priority = document.getElementById("priority").value;
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let dueDate = document.getElementById("due-date").value;
    let category = document.getElementById("main-category").value;
    let status = false;
    
    if (category === "add") {
        category = document.getElementById("main-text-category").value.toLowerCase();
        handleTask.addCategory(category);
        displayUpdateCategory();
    } 
    
    handleTask.addItem(handleTask.itemFactory(status, priority, title, description, dueDate, category));
    modalControl.hideModal();
    sectionSwitcher();
});

//Controls edit modal
document.addEventListener("click", function(e) {
    if(e.target && e.target.className === "edit-btn") {
        editIndex = e.target.parentElement.parentElement.getAttribute("original-index")
        displayEdit(editIndex);
    } else if(handleTask.categories.includes(e.target.id) && e.target.tagName == "A") {
        let selectedCategory = e.target.innerText.toLowerCase();
        currentSection = selectedCategory;
        catSection(selectedCategory);
    } else if(e.target && e.target.className === "remove-cat-btn") {
        let categoryIndex = e.target.getAttribute("data-set");
        let editCategory = handleTask.categories[categoryIndex];
        displayEditCategory(editCategory);
        oldCategory = editCategory;
        currentSection = oldCategory;
    } else if(e.target.parentElement.className === "status-change") {
        statusIndex = e.target.parentElement.parentElement.parentElement.getAttribute("original-index");
        console.log(statusIndex);
        handleTask.updateStatus(statusIndex);
        sectionSwitcher();
        console.log(handleTask.itemArray);
    }
});

//Edits item in array and DOM
document.getElementById("edit-submit").addEventListener("click", function() {
    let newPriority = document.getElementById("edit-priority").value;
    let newTitle = document.getElementById("edit-title").value;
    let newDescription = document.getElementById("edit-description").value;
    let newDueDate = document.getElementById("edit-date").value;
    let newCategory = document.getElementById("edit-category").value;

    if (newCategory === "add") {
        newCategory = document.getElementById("edit-text-category").value.toLowerCase();
        handleTask.addCategory(newCategory);
        displayUpdateCategory();
    } 

    handleTask.editItem(editIndex, newPriority, newTitle, newDescription, newDueDate, newCategory);
    modalControl.hideEditModal();
    sectionSwitcher();

});

document.getElementById("edit-category-submit").addEventListener("click", function() {
    newCategory = document.getElementById("edit-category-sidebar").value;
    currentSection = newCategory;
    handleTask.editCategory(oldCategory, newCategory);
    modalControl.hideEditCategoryModal();
    displayUpdateCategory();
    sectionSwitcher();

})

//Deletes item from array and DOM
document.getElementById("delete-item").addEventListener("click", function() {
    handleTask.deleteItem(editIndex);
    modalControl.hideEditModal();
    displayTask(handleTask.itemArray);
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
    tableTitle("Viewing All Tasks");
    let currentArray = handleTask.allCurrentTasks();
    displayTask(currentArray);
    currentSection = "viewAll";
}

function today() {
    currentSection = "today";
    let dailyArray = handleTask.dailyFilter();
    displayTask(dailyArray);
    tableTitle("Viewing Today's Tasks");
}

function thisWeek() {
    currentSection = "thisWeek";
    let weeklyArray = handleTask.weeklyFilter();
    displayTask(weeklyArray);
    tableTitle("Viewing This Week's Tasks");
}

function completedTasks() {
    currentSection = "completedTasks";
    let completedArray = handleTask.completedFilter();
    console.log(completedArray);
    displayTask(completedArray);
    tableTitle("Viewing Completed Tasks");
}

function catSection(selectedCategory) {
    currentSection = selectedCategory;
    let categoryArray = handleTask.categoryFilter(selectedCategory);
    tableTitle("Viewing all " + selectedCategory + " tasks");
    displayTask(categoryArray);
}

document.getElementById("category-submit").addEventListener("click", function() {
    const newCategory = document.getElementById("category-category").value.toLowerCase();
    handleTask.addCategory(newCategory);
    catSection(newCategory);
    displayUpdateCategory();
    modalControl.hideCategoryModal();
    resetForms();
})

document.getElementById("delete-category").addEventListener("click", function() {
    modalControl.hideEditCategoryModal();

    document.getElementById("delete-category-name").innerText = oldCategory;
    document.querySelector(".delete-category-warning").style.display = "flex"
    

    document.getElementById("confirm-delete").addEventListener("click", function() {
        handleTask.deleteCategory(oldCategory);
        document.querySelector(".delete-category-warning").style.display = "none";
        displayUpdateCategory();
        viewAll();
    });

    document.getElementById("cancel-delete").addEventListener("click", function() {
        document.querySelector(".delete-category-warning").style.display = "none";
        modalControl.showEditCategoryModal();

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

    resetForms();
}