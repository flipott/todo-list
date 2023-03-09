import { displayController } from "./displayController";
import { handleTask } from "./taskController";

const submitModal = document.getElementById("modal-submit");
const addBtn = document.getElementById("add-item");
const catBtn = document.getElementsByClassName("remove-cat-btn")[0];
let editIndex;
let currentSection = "viewAll"
let oldCategory;
let newCategory;
let statusIndex;
let currentTheme = "light";
const storedTheme = localStorage.getItem('theme');


//Fire DOM and task events when a new to-do item is submitted
submitModal.addEventListener("click", function() {

    if (formValidate("submitModal")) {
        let priority = document.querySelector('input[name="priority"]:checked').value;
        let title = document.getElementById("title").value;
        let description = document.getElementById("description").value;
        let dueDate = document.getElementById("due-date").value;
        dueDate = new Date(dueDate).toLocaleDateString('en-US', {timeZone: 'UTC'});
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
        editIndex = e.target.parentElement.parentElement.parentElement.getAttribute("original-index")
        displayController.displayEdit(editIndex);
    } else if(handleTask.categories.includes(e.target.id.toLowerCase())) {
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
        let newPriority = document.querySelector('input[name="edit-priority"]:checked').value;
        let newTitle = document.getElementById("edit-title").value;
        let newDescription = document.getElementById("edit-description").value;
        let newDueDate = document.getElementById("edit-date").value;
        const [year, month, day] = newDueDate.split("-");
        newDueDate = `${parseInt(month)}/${parseInt(day)}/${year}`
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
    displayController.displayTask(currentArray, currentTheme);
    currentSection = "viewAll";
    addBtn.style.visibility = "visible";
    catBtn.style.visibility = "hidden";
    displayController.highlightSection("view-all");
}

function today() {
    currentSection = "today";
    let dailyArray = handleTask.dailyFilter();
    displayController.displayTask(dailyArray, currentTheme);
    displayController.tableTitle("Viewing Today's Tasks");
    addBtn.style.visibility = "visible";
    catBtn.style.visibility = "hidden";
    displayController.highlightSection("today");
}

function thisWeek() {
    currentSection = "thisWeek";
    let weeklyArray = handleTask.weeklyFilter();
    displayController.displayTask(weeklyArray, currentTheme);
    displayController.tableTitle("Viewing This Week's Tasks");
    addBtn.style.visibility = "visible";
    catBtn.style.visibility = "hidden";
    displayController.highlightSection("this-week");
}

function completedTasks() {
    currentSection = "completedTasks";
    let completedArray = handleTask.completedFilter();
    displayController.displayTask(completedArray, currentTheme);
    displayController.tableTitle("Viewing Completed Tasks");
    addBtn.style.visibility = "hidden";
    catBtn.style.visibility = "hidden";
    displayController.highlightSection("completed-tasks");
}

function catSection(selectedCategory) {
    currentSection = selectedCategory;
    let categoryArray = handleTask.categoryFilter(selectedCategory);
    displayController.tableTitle("Viewing all " + selectedCategory + " tasks");
    displayController.displayTask(categoryArray, currentTheme);
    displayController.highlightSection(selectedCategory);
    displayController.setRemoveCategory(selectedCategory);
    catBtn.style.visibility = "visible";
    addBtn.style.visibility = "visible";
}

document.getElementById("mobile-sidebar-toggle").addEventListener("click", function() {
    const sidebar = document.querySelector(".sidebar");
    const menuLineList = document.querySelectorAll(".menu-line");

    if (sidebar.style.display === "flex") {
        sidebar.style.display = "none";
        menuLineList.forEach((line) => {
            line.classList.remove("active");
        });
    } else {
        sidebar.style.display = "flex";
        menuLineList.forEach((line) => {
            line.classList.add("active");
        });
    }
});

if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme)
}

if (storedTheme === "dark") {
    document.querySelector(".header img").setAttribute("src", "images/logo-dark.png")
    document.getElementById("sun").setAttribute("src", "images/sun-dark.svg");
    document.getElementById("moon").setAttribute("src", "images/moon-dark.svg");
}

document.querySelector('.toggle-section input[type="checkbox"]').addEventListener("change", (e) => {
    if (e.target.checked) {
        currentTheme = "dark"
        localStorage.setItem('theme', "dark");
        document.documentElement.setAttribute("data-theme", "dark");
        document.querySelector(".header img").setAttribute("src", "/images/logo-dark.png")
        document.getElementById("sun").setAttribute("src", "./images/sun-dark.svg");
        document.getElementById("moon").setAttribute("src", "../images/moon-dark.svg");
        viewAll();
    } else {
        currentTheme = "light"
        localStorage.setItem('theme', "light");
        document.documentElement.setAttribute("data-theme", "light");
        document.querySelector(".header img").setAttribute("src", "dist/images/logo-light.png")
        document.getElementById("sun").setAttribute("src", "./dist/images/sun-light.svg");
        document.getElementById("moon").setAttribute("src", "../dist/images/moon-light.svg");
        viewAll();
    }
})



document.getElementById("category-submit").addEventListener("click", function() {
    if (formValidate("categoryModal")) {
        const newCategory = document.getElementById("category-category").value.toLowerCase();
        handleTask.addCategory(newCategory);
        displayController.displayUpdateCategory();
        displayController.modalControl.hideCategoryModal();
        displayController.resetForms();
        catSection(newCategory);
    };
})

document.getElementById("delete-category").addEventListener("click", function() {
    displayController.modalControl.hideEditCategoryModal();

    displayController.modalControl.activateContainer();
    document.getElementById("delete-category-name").innerText = oldCategory;
    document.querySelector(".delete-category-warning").style.display = "flex"
    

    document.getElementById("confirm-delete").addEventListener("click", function() {
        handleTask.deleteCategory(oldCategory);
        document.querySelector(".delete-category-warning").style.display = "none";
        displayController.modalControl.deactivateContainer();
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

viewAll()