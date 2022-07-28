import { ca } from "date-fns/locale";
import { modalControl, displayTask, displayEdit, tableTitle, displayUpdateCategory, resetForms, displayEditCategory, displayEditCategorySubmit } from "./displayController";
import { handleTask } from "./taskController";

const submitModal = document.getElementById("modal-submit");
let newItem;
let editIndex;
let currentSection = "viewAll"
let oldCategory;
let newCategory;

//Fire DOM and task events when a new to-do item is submitted
submitModal.addEventListener("click", function() {
    let priority = document.getElementById("priority").value;
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let dueDate = document.getElementById("due-date").value;
    let category = document.getElementById("main-category").value;
    
    if (category === "add") {
        category = document.getElementById("main-text-category").value.toLowerCase();
        handleTask.addCategory(category);
        displayUpdateCategory();
    } 
    
    handleTask.addItem(handleTask.itemFactory(priority, title, description, dueDate, category));
    modalControl.hideModal();

    switch(currentSection) {
        case "viewAll":
            displayTask(handleTask.itemArray);
            break;
        case "today":
            today();
            break;
        case "thisWeek":
            thisWeek();
            break;  
    };

    if (currentSection != "viewAll" && currentSection != "today" && currentSection != "thisWeek") {
        catSection(currentSection);
    }

    resetForms();
});

//Controls edit modal
document.addEventListener("click", function(e) {
    if(e.target && e.target.className === "edit-btn") {
        editIndex = e.target.parentElement.parentElement.getAttribute("data-set")
        displayEdit(editIndex);
    } else if(handleTask.categories.includes(e.target.innerText.toLowerCase()) && e.target.tagName == "A") {
        let selectedCategory = e.target.innerText.toLowerCase();
        currentSection = selectedCategory;
        catSection(selectedCategory);
    } else if(e.target && e.target.className === "remove-cat-btn") {
        let editCategory = e.target.parentElement.firstChild.id
        displayEditCategory(editCategory);
        oldCategory = editCategory;
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

    switch(currentSection) {
        case "viewAll":
            displayTask(handleTask.itemArray);
            break;
        case "today":
            today();
            break;
        case "thisWeek":
            thisWeek();
            break;  
    };

    if (currentSection != "viewAll" && currentSection != "today" && currentSection != "thisWeek") {
        catSection(currentSection);
    }

    resetForms();
})

document.getElementById("edit-category-submit").addEventListener("click", function() {
    newCategory = document.getElementById("edit-category-sidebar").value;
    handleTask.editCategory(oldCategory, newCategory);
    displayEditCategorySubmit(oldCategory, newCategory);
    modalControl.hideEditCategoryModal();

    switch(currentSection) {
        case "viewAll":
            displayTask(handleTask.itemArray);
            break;
        case "today":
            today();
            break;
        case "thisWeek":
            thisWeek();
            break;  
    };

    if (currentSection != "viewAll" && currentSection != "today" && currentSection != "thisWeek") {
        catSection(currentSection);
    }

    resetForms();
})

//Deletes item from array and DOM
document.getElementById("delete-item").addEventListener("click", function() {
    handleTask.deleteItem(editIndex);
    modalControl.hideEditModal();
    displayTask(handleTask.itemArray);
});

//Displays all tasks
document.getElementById("view-all").addEventListener("click", function() {
    tableTitle("Viewing All Tasks");
    currentSection = "viewAll";
    displayTask(handleTask.itemArray);
});

//Today-only task filter
document.getElementById("today").addEventListener("click", function() {
    today();
});

//This week-only task filter
document.getElementById("this-week").addEventListener("click", function() {
    thisWeek();
});

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

function catSection(selectedCategory) {
    let categoryArray = handleTask.categoryFilter(selectedCategory);
    tableTitle("Viewing all " + selectedCategory + " tasks");
    displayTask(categoryArray);
}

document.getElementById("category-submit").addEventListener("click", function() {
    const newCategory = document.getElementById("category-category").value.toLowerCase();
    handleTask.addCategory(newCategory);
    displayUpdateCategory();
    modalControl.hideCategoryModal();
    resetForms();
})