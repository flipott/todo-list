/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/displayController.js":
/*!**********************************!*\
  !*** ./src/displayController.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"displayController\": () => (/* binding */ displayController)\n/* harmony export */ });\n/* harmony import */ var _taskController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskController */ \"./src/taskController.js\");\n\n\n//Initialize DOM\nconst addModal = document.getElementById(\"add-item\");\nconst addCategoryModal = document.getElementById(\"add-cat\")\nconst closeModal = document.getElementById(\"modal-close\");\nconst closeEditModal = document.getElementById(\"edit-close\");\nconst closeCategoryModal = document.getElementById(\"category-close\");\nconst closeEditCategoryModal = document.getElementById(\"edit-category-close\")\n\n//Handles dynamic display of DOM elements\nconst displayController = (function() {\n\n    //Show or hide modals depending on button click\n    const modalControl = (function() {\n\n        addModal.addEventListener(\"click\", function(){\n            showModal();\n        });\n\n        closeModal.addEventListener(\"click\", function(){\n            hideModal();\n        });\n\n        closeEditModal.addEventListener(\"click\", function() {\n            hideEditModal();\n        });\n\n        closeEditCategoryModal.addEventListener(\"click\", function() {\n            hideEditCategoryModal();\n        });\n\n        addCategoryModal.addEventListener(\"click\", function() {\n            showCategoryModal();\n        });\n\n        closeCategoryModal.addEventListener(\"click\", function() {\n            hideCategoryModal();\n        });\n\n        function showModal() {\n            hideCategoryModal();\n            hideEditModal();\n            activateContainer();\n            document.querySelector(\".modal\").style.display = \"flex\";\n        }\n\n        function hideModal() {\n            deactivateContainer();\n            document.querySelector(\".modal\").style.display = \"none\";\n        }\n\n        function showEditModal() {\n            hideModal();\n            hideCategoryModal();\n            activateContainer();\n            document.querySelector(\".edit-modal\").style.display = \"flex\";\n        }\n\n        function hideEditModal() {\n            deactivateContainer();\n            document.querySelector(\".edit-modal\").style.display = \"none\";\n        }\n\n        function hideCategoryModal() {\n            deactivateContainer();\n            document.querySelector(\".category-modal\").style.display = \"none\";\n        }\n\n        function showEditCategoryModal() {\n            activateContainer();\n            document.querySelector(\".edit-category-modal\").style.display = \"flex\";\n        }\n\n        function hideEditCategoryModal() {\n            deactivateContainer();\n            document.querySelector(\".edit-category-modal\").style.display = \"none\";\n        }\n\n        function showCategoryModal() {\n            hideModal();\n            hideEditModal();\n            activateContainer();\n            document.querySelector(\".category-modal\").style.display = \"flex\";\n        }\n\n        function activateContainer() {\n            document.querySelector(\".modal-container\").style.display = \"flex\";\n            document.querySelector(\".modal-container\").style[\"pointer-events\"] = \"all\";\n        }\n\n        function deactivateContainer() {\n            document.querySelector(\".modal-container\").style.display = \"none\";\n            document.querySelector(\".modal-container\").style[\"pointer-events\"] = \"none\";\n        }\n\n        displayUpdateCategory();\n        return { activateContainer, deactivateContainer, showModal, hideModal, showEditModal, hideEditModal, showCategoryModal, hideCategoryModal, showEditCategoryModal, hideEditCategoryModal }\n    })();\n\n    //Fills out page form for editing a to-do item\n    function displayEdit(editIndex) {\n        \n        modalControl.showEditModal();\n\n        let priority = _taskController__WEBPACK_IMPORTED_MODULE_0__.handleTask.itemArray[editIndex].priority;\n        document.querySelector(`input[name=\"edit-priority\"][value=\"${priority}\"]`).checked = true;\n\n        let title = _taskController__WEBPACK_IMPORTED_MODULE_0__.handleTask.itemArray[editIndex].title;\n        document.getElementById(\"edit-title\").value = title;\n\n        let description = _taskController__WEBPACK_IMPORTED_MODULE_0__.handleTask.itemArray[editIndex].description;\n        document.getElementById(\"edit-description\").value = description;\n\n        let dateStr = _taskController__WEBPACK_IMPORTED_MODULE_0__.handleTask.itemArray[editIndex].dueDate;\n        dateStr = new Date(dateStr);\n        dateStr = dateStr.toISOString();\n        dateStr = dateStr.slice(0,10);\n        document.getElementById(\"edit-date\").value = dateStr;\n        \n\n        let category = _taskController__WEBPACK_IMPORTED_MODULE_0__.handleTask.itemArray[editIndex].category;\n        document.getElementById(\"edit-category\").value = category;\n    }\n    \n    //Fills out page form for editing category\n    function displayEditCategory(name) {\n        modalControl.showEditCategoryModal();\n        document.getElementById(\"edit-category-sidebar\").value = name;\n    }\n    \n    //Populate tasks on page\n    function displayTask(currentArray, theme) {\n    \n        //Remove currently displayed data\n        while (document.querySelector(\"tbody\").childNodes.length > 1) {\n            document.querySelector(\"tbody\").removeChild(document.querySelector(\"tbody\").lastChild);\n        }\n        \n        //Display new data\n        for (let i=0;i<currentArray.length;i++) {\n            let priority = currentArray[i].priority;\n            let title = currentArray[i].title;\n            let description = currentArray[i].description;\n            let dueDate = currentArray[i].dueDate;\n            let category = currentArray[i].category;\n            let status = currentArray[i].status;\n            let originalArrayIndex = currentArray[i].dataSet;    \n            let newRow = document.createElement(\"tr\");\n            newRow.setAttribute(\"data-set\", i);\n            newRow.setAttribute(\"original-index\", originalArrayIndex);\n    \n            let newInputData = document.createElement(\"td\");\n    \n            let linkWrapper = document.createElement(\"button\");\n            linkWrapper.setAttribute(\"class\", \"status-change\");\n            linkWrapper.setAttribute(\"onclick\", \"return false;\");\n    \n            let imgWrapper = document.createElement(\"img\");\n    \n            if (status === true) {\n                imgWrapper.setAttribute(\"src\", `images/completed-status-${theme}.svg`);\n                imgWrapper.setAttribute(\"class\", \"checked\");\n            } else {\n                imgWrapper.setAttribute(\"src\", `images/pending-status-${theme}.svg`);\n                imgWrapper.setAttribute(\"class\", \"unchecked\");\n            }\n\n            imgWrapper.setAttribute(\"width\", \"25px\");\n            imgWrapper.setAttribute(\"height\", \"25px\");\n\n    \n            linkWrapper.appendChild(imgWrapper);\n            newInputData.appendChild(linkWrapper);\n            newRow.appendChild(newInputData);\n    \n            let newPriorityData = document.createElement(\"td\");\n            let priorityImgWrapper = document.createElement(\"img\");\n\n            if (priority === \"low\") {\n                priorityImgWrapper.setAttribute(\"src\", \"images/low-priority.svg\");\n            } else if (priority === \"medium\") {\n                priorityImgWrapper.setAttribute(\"src\", \"images/medium-priority.svg\");\n            } else {\n                priorityImgWrapper.setAttribute(\"src\", \"images/high-priority.svg\");\n            }\n\n            priorityImgWrapper.setAttribute(\"width\", \"25px\");\n            priorityImgWrapper.setAttribute(\"height\", \"25px\");\n    \n            newPriorityData.appendChild(priorityImgWrapper);\n            newRow.appendChild(newPriorityData);\n    \n            let newTitleData = document.createElement(\"td\");\n            newTitleData.innerHTML = title;\n            newRow.appendChild(newTitleData);\n    \n            let newDescriptionData = document.createElement(\"td\");\n            newDescriptionData.innerHTML = description;\n            newRow.appendChild(newDescriptionData);\n    \n            let newDateData = document.createElement(\"td\");\n            newDateData.innerHTML = dueDate;\n            newRow.appendChild(newDateData);\n    \n            let newCategoryData = document.createElement(\"td\");\n            newCategoryData.innerHTML = category;\n            newRow.appendChild(newCategoryData);\n    \n            let newEditData = document.createElement(\"td\");\n            \n            let newEditBtn = document.createElement(\"button\");\n\n            let newEditImg = document.createElement(\"img\");\n            newEditImg.setAttribute(\"src\", `images/edit-${theme}.svg`);\n            newEditImg.setAttribute(\"class\", \"edit-btn\");\n\n            newEditImg.setAttribute(\"width\", \"25px\");\n            newEditImg.setAttribute(\"height\", \"25px\");\n\n            newEditBtn.appendChild(newEditImg);\n            newEditData.appendChild(newEditBtn);\n            newRow.appendChild(newEditData);\n    \n            document.querySelector(\"tbody\").appendChild(newRow);\n        };\n    }\n    \n    //Sets the title of the table\n    function tableTitle(title) {\n        document.getElementById(\"table-title\").innerHTML = title;\n    }\n\n    //Resets forms\n    function resetForms() {\n        document.getElementById(\"edit-form\").reset();\n        document.getElementById(\"modal-form\").reset();\n        document.getElementById(\"category-form\").reset();\n        document.getElementById(\"edit-category-form\").reset();\n    }\n    \n    //Updates categories in sidebar and dropdown menus\n    function displayUpdateCategory() {\n        const sidebarList = document.getElementById(\"category-list\")\n        const mainCategoryList = document.querySelector(\"#main-category\");\n        const editCategoryList = document.querySelector(\"#edit-category\");\n    \n        sidebarList.innerHTML = '';\n        mainCategoryList.innerHTML = '';\n        editCategoryList.innerHTML = '';\n    \n        let mainLastOption = document.createElement(\"option\");\n        mainLastOption.value=\"add\";\n        mainLastOption.id=\"last-option\";\n        mainLastOption.innerText = \"Add new category...\"\n        mainCategoryList.appendChild(mainLastOption);\n    \n        let mainPlaceholder = document.createElement(\"option\");\n        mainPlaceholder.value = \"\";\n        mainPlaceholder.setAttribute(\"disabled\", \"\");\n        mainPlaceholder.setAttribute(\"selected\", \"\");\n        mainPlaceholder.innerText = \"Select your option\";\n        mainCategoryList.insertBefore(mainPlaceholder, mainLastOption);\n    \n        let editLastOption = document.createElement(\"option\");\n        editLastOption.value=\"add\";\n        editLastOption.id=\"last-option\";\n        editLastOption.innerText = \"Add new category...\"\n        editCategoryList.appendChild(editLastOption);\n    \n        let editPlaceholder = document.createElement(\"option\");\n        editPlaceholder.value = \"\";\n        editPlaceholder.setAttribute(\"disabled\", \"\");\n        editPlaceholder.setAttribute(\"selected\", \"\");\n        editPlaceholder.innerText = \"Select your option\";\n        editCategoryList.insertBefore(editPlaceholder, editLastOption);\n    \n        for (let i=0;i<_taskController__WEBPACK_IMPORTED_MODULE_0__.handleTask.categories.length;i++) {    \n            let currentCat = _taskController__WEBPACK_IMPORTED_MODULE_0__.handleTask.categories[i].charAt(0).toUpperCase() + _taskController__WEBPACK_IMPORTED_MODULE_0__.handleTask.categories[i].slice(1);\n            let newElement = document.createElement(\"li\");\n            newElement.setAttribute(\"data-set\", i);\n            newElement.setAttribute(\"id\", currentCat.toLowerCase());\n            newElement.classList.add(\"sidebar-item\");\n            newElement.innerText = currentCat;\n            sidebarList.appendChild(newElement);\n    \n            let newOption = document.createElement(\"option\");\n            newOption.value = currentCat;\n            newOption.innerHTML = currentCat;\n    \n            let newEditOption = newOption.cloneNode(true);\n            \n            mainCategoryList.insertBefore(newOption, mainLastOption);\n            editCategoryList.insertBefore(newEditOption, editLastOption);\n    \n        };\n    \n        document.getElementById(\"main-text-category\").style.display = \"none\";\n        document.getElementById(\"edit-text-category\").style.display = \"none\";\n    }\n\n    function highlightSection(section) {\n        const elementList = document.querySelectorAll(\".highlight-polygon\");\n        elementList.forEach((element) => {\n            element.remove();\n        });\n\n        const element = document.getElementById(section);\n        const highlight = document.createElement(\"img\");\n        highlight.setAttribute(\"src\", \"images/highlight-polygon.svg\")\n        highlight.setAttribute(\"class\", \"highlight-polygon\")\n        highlight.setAttribute(\"height\", \"25px\")\n        highlight.setAttribute(\"width\", \"25px\")\n        element.appendChild(highlight);\n    }\n\n    function setRemoveCategory(section) {\n        const dataSet = document.getElementById(section).getAttribute(\"data-set\");\n        const button = document.getElementsByClassName(\"remove-cat-btn\")[0];\n        button.setAttribute(\"data-set\", dataSet);\n    }\n\n    return { modalControl, displayEdit, displayEditCategory, displayTask, tableTitle, resetForms, displayUpdateCategory, highlightSection, setRemoveCategory }\n\n})();\n\n\n\n//# sourceURL=webpack://todo-list/./src/displayController.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _displayController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayController */ \"./src/displayController.js\");\n/* harmony import */ var _taskController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./taskController */ \"./src/taskController.js\");\n\n\n\nconst submitModal = document.getElementById(\"modal-submit\");\nconst addBtn = document.getElementById(\"add-item\");\nconst catBtn = document.getElementsByClassName(\"remove-cat-btn\")[0];\nlet editIndex;\nlet currentSection = \"viewAll\"\nlet oldCategory;\nlet newCategory;\nlet statusIndex;\nlet currentTheme = \"light\";\nconst storedTheme = localStorage.getItem('theme');\n\n\n//Fire DOM and task events when a new to-do item is submitted\nsubmitModal.addEventListener(\"click\", function() {\n\n    if (formValidate(\"submitModal\")) {\n        let priority = document.querySelector('input[name=\"priority\"]:checked').value;\n        let title = document.getElementById(\"title\").value;\n        let description = document.getElementById(\"description\").value;\n        let dueDate = document.getElementById(\"due-date\").value;\n        dueDate = new Date(dueDate).toLocaleDateString('en-US', {timeZone: 'UTC'});\n        let category = document.getElementById(\"main-category\").value;\n        let status = false;\n        \n        if (category === \"add\") {\n            category = document.getElementById(\"main-text-category\").value.toLowerCase();\n            _taskController__WEBPACK_IMPORTED_MODULE_1__.handleTask.addCategory(category);\n            _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.displayUpdateCategory();\n        } \n        \n        _taskController__WEBPACK_IMPORTED_MODULE_1__.handleTask.addItem(_taskController__WEBPACK_IMPORTED_MODULE_1__.handleTask.itemFactory(status, priority, title, description, dueDate, category));\n        _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.modalControl.hideModal();\n        sectionSwitcher(); \n    }\n});\n\nfunction formValidate(modal) {\n    if (modal === \"submitModal\") {\n        if (document.getElementById(\"modal-form\").checkValidity()) {\n            if ((document.getElementById(\"main-category\").value != \"\" && document.getElementById(\"main-text-category\").style.display === \"none\") || document.getElementById(\"main-text-category\").value != \"\") {\n                return true;\n            }\n        } else {\n            document.getElementById(\"modal-form\").reportValidity()\n            return false;\n        }\n    } else if (modal === \"editModal\") {\n        if (document.getElementById(\"edit-form\").checkValidity()) {\n            if ((document.getElementById(\"edit-category\").value != \"\" && document.getElementById(\"edit-text-category\").style.display === \"none\") || document.getElementById(\"edit-text-category\").value != \"\") {\n                return true;\n            }\n        } else {\n            document.getElementById(\"edit-form\").reportValidity()\n            return false;\n        }\n    } else if (modal === \"editCategoryModal\") {\n        if (document.getElementById(\"edit-category-form\").checkValidity()) {\n            return true;\n        } else {\n            document.getElementById(\"edit-category-form\").reportValidity()\n            return false;\n        };\n    } else if (modal === \"categoryModal\") {\n        if (document.getElementById(\"category-form\").checkValidity()) {\n            return true;\n        } else {\n            document.getElementById(\"category-form\").reportValidity()\n            return false;\n        };\n    }\n}\n\n//Controls edit modal\ndocument.addEventListener(\"click\", function(e) {\n    if(e.target && e.target.className === \"edit-btn\") {\n        editIndex = e.target.parentElement.parentElement.parentElement.getAttribute(\"original-index\")\n        _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.displayEdit(editIndex);\n    } else if(_taskController__WEBPACK_IMPORTED_MODULE_1__.handleTask.categories.includes(e.target.id.toLowerCase())) {\n        let selectedCategory = e.target.innerText.toLowerCase();\n        currentSection = selectedCategory;\n        catSection(selectedCategory);\n    } else if(e.target && e.target.className === \"remove-cat-btn\") {\n        let categoryIndex = e.target.getAttribute(\"data-set\");\n        let editCategory = _taskController__WEBPACK_IMPORTED_MODULE_1__.handleTask.categories[categoryIndex];\n        _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.displayEditCategory(editCategory);\n        oldCategory = editCategory;\n        currentSection = oldCategory;\n    } else if(e.target.parentElement.className === \"status-change\") {\n        statusIndex = e.target.parentElement.parentElement.parentElement.getAttribute(\"original-index\");\n        _taskController__WEBPACK_IMPORTED_MODULE_1__.handleTask.updateStatus(statusIndex);\n        sectionSwitcher();\n    }\n});\n\n//Edits item in array and DOM\ndocument.getElementById(\"edit-submit\").addEventListener(\"click\", function() {\n    if (formValidate(\"editModal\")) {\n        let newPriority = document.querySelector('input[name=\"edit-priority\"]:checked').value;\n        let newTitle = document.getElementById(\"edit-title\").value;\n        let newDescription = document.getElementById(\"edit-description\").value;\n        let newDueDate = document.getElementById(\"edit-date\").value;\n        const [year, month, day] = newDueDate.split(\"-\");\n        newDueDate = `${parseInt(month)}/${parseInt(day)}/${year}`\n        let newCategory = document.getElementById(\"edit-category\").value;\n\n        if (newCategory === \"add\") {\n            newCategory = document.getElementById(\"edit-text-category\").value.toLowerCase();\n            _taskController__WEBPACK_IMPORTED_MODULE_1__.handleTask.addCategory(newCategory);\n            _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.displayUpdateCategory();\n        } \n\n        _taskController__WEBPACK_IMPORTED_MODULE_1__.handleTask.editItem(editIndex, newPriority, newTitle, newDescription, newDueDate, newCategory);\n        _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.modalControl.hideEditModal();\n        sectionSwitcher();\n    }\n});\n\ndocument.getElementById(\"edit-category-submit\").addEventListener(\"click\", function() {\n    if (formValidate(\"editCategoryModal\")) {\n        newCategory = document.getElementById(\"edit-category-sidebar\").value;\n        currentSection = newCategory;\n        _taskController__WEBPACK_IMPORTED_MODULE_1__.handleTask.editCategory(oldCategory, newCategory);\n        _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.modalControl.hideEditCategoryModal();\n        _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.displayUpdateCategory();\n        sectionSwitcher();\n    };\n})\n\n//Deletes item from array and DOM\ndocument.getElementById(\"delete-item\").addEventListener(\"click\", function() {\n    _taskController__WEBPACK_IMPORTED_MODULE_1__.handleTask.deleteItem(editIndex);\n    _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.modalControl.hideEditModal();\n    _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.displayTask(_taskController__WEBPACK_IMPORTED_MODULE_1__.handleTask.itemArray);\n});\n\n//Displays all tasks\ndocument.getElementById(\"view-all\").addEventListener(\"click\", function() {\n    viewAll();\n});\n\n//Today-only task filter\ndocument.getElementById(\"today\").addEventListener(\"click\", function() {\n    today();\n});\n\n//This week-only task filter\ndocument.getElementById(\"this-week\").addEventListener(\"click\", function() {\n    thisWeek();\n});\n\ndocument.getElementById(\"completed-tasks\").addEventListener(\"click\", function() {\n    completedTasks();\n});\n\n\nfunction viewAll() {\n    _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.tableTitle(\"Viewing All Tasks\");\n    let currentArray = _taskController__WEBPACK_IMPORTED_MODULE_1__.handleTask.allCurrentTasks();\n    _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.displayTask(currentArray, currentTheme);\n    currentSection = \"viewAll\";\n    addBtn.style.visibility = \"visible\";\n    catBtn.style.visibility = \"hidden\";\n    _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.highlightSection(\"view-all\");\n}\n\nfunction today() {\n    currentSection = \"today\";\n    let dailyArray = _taskController__WEBPACK_IMPORTED_MODULE_1__.handleTask.dailyFilter();\n    _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.displayTask(dailyArray, currentTheme);\n    _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.tableTitle(\"Viewing Today's Tasks\");\n    addBtn.style.visibility = \"visible\";\n    catBtn.style.visibility = \"hidden\";\n    _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.highlightSection(\"today\");\n}\n\nfunction thisWeek() {\n    currentSection = \"thisWeek\";\n    let weeklyArray = _taskController__WEBPACK_IMPORTED_MODULE_1__.handleTask.weeklyFilter();\n    _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.displayTask(weeklyArray, currentTheme);\n    _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.tableTitle(\"Viewing This Week's Tasks\");\n    addBtn.style.visibility = \"visible\";\n    catBtn.style.visibility = \"hidden\";\n    _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.highlightSection(\"this-week\");\n}\n\nfunction completedTasks() {\n    currentSection = \"completedTasks\";\n    let completedArray = _taskController__WEBPACK_IMPORTED_MODULE_1__.handleTask.completedFilter();\n    _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.displayTask(completedArray, currentTheme);\n    _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.tableTitle(\"Viewing Completed Tasks\");\n    addBtn.style.visibility = \"hidden\";\n    catBtn.style.visibility = \"hidden\";\n    _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.highlightSection(\"completed-tasks\");\n}\n\nfunction catSection(selectedCategory) {\n    currentSection = selectedCategory;\n    let categoryArray = _taskController__WEBPACK_IMPORTED_MODULE_1__.handleTask.categoryFilter(selectedCategory);\n    _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.tableTitle(\"Viewing all \" + selectedCategory + \" tasks\");\n    _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.displayTask(categoryArray, currentTheme);\n    _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.highlightSection(selectedCategory);\n    _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.setRemoveCategory(selectedCategory);\n    catBtn.style.visibility = \"visible\";\n    addBtn.style.visibility = \"visible\";\n}\n\ndocument.getElementById(\"mobile-sidebar-toggle\").addEventListener(\"click\", function() {\n    const sidebar = document.querySelector(\".sidebar\");\n    const menuLineList = document.querySelectorAll(\".menu-line\");\n\n    if (sidebar.style.display === \"flex\") {\n        sidebar.style.display = \"none\";\n        menuLineList.forEach((line) => {\n            line.classList.remove(\"active\");\n        });\n    } else {\n        sidebar.style.display = \"flex\";\n        menuLineList.forEach((line) => {\n            line.classList.add(\"active\");\n        });\n    }\n});\n\nif (storedTheme) {\n    document.documentElement.setAttribute('data-theme', storedTheme)\n}\n\nif (storedTheme === \"dark\") {\n    document.querySelector(\".header img\").setAttribute(\"src\", \"images/logo-dark.png\")\n    document.getElementById(\"sun\").setAttribute(\"src\", \"images/sun-dark.svg\");\n    document.getElementById(\"moon\").setAttribute(\"src\", \"images/moon-dark.svg\");\n}\n\ndocument.querySelector('.toggle-section input[type=\"checkbox\"]').addEventListener(\"change\", (e) => {\n    if (e.target.checked) {\n        currentTheme = \"dark\"\n        localStorage.setItem('theme', \"dark\");\n        document.documentElement.setAttribute(\"data-theme\", \"dark\");\n        document.querySelector(\".header img\").setAttribute(\"src\", \"/images/logo-dark.png\")\n        document.getElementById(\"sun\").setAttribute(\"src\", \"./images/sun-dark.svg\");\n        document.getElementById(\"moon\").setAttribute(\"src\", \"../images/moon-dark.svg\");\n        viewAll();\n    } else {\n        currentTheme = \"light\"\n        localStorage.setItem('theme', \"light\");\n        document.documentElement.setAttribute(\"data-theme\", \"light\");\n        document.querySelector(\".header img\").setAttribute(\"src\", \"dist/images/logo-light.png\")\n        document.getElementById(\"sun\").setAttribute(\"src\", \"./dist/images/sun-light.svg\");\n        document.getElementById(\"moon\").setAttribute(\"src\", \"../dist/images/moon-light.svg\");\n        viewAll();\n    }\n})\n\n\n\ndocument.getElementById(\"category-submit\").addEventListener(\"click\", function() {\n    if (formValidate(\"categoryModal\")) {\n        const newCategory = document.getElementById(\"category-category\").value.toLowerCase();\n        _taskController__WEBPACK_IMPORTED_MODULE_1__.handleTask.addCategory(newCategory);\n        _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.displayUpdateCategory();\n        _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.modalControl.hideCategoryModal();\n        _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.resetForms();\n        catSection(newCategory);\n    };\n})\n\ndocument.getElementById(\"delete-category\").addEventListener(\"click\", function() {\n    _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.modalControl.hideEditCategoryModal();\n\n    _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.modalControl.activateContainer();\n    document.getElementById(\"delete-category-name\").innerText = oldCategory;\n    document.querySelector(\".delete-category-warning\").style.display = \"flex\"\n    \n\n    document.getElementById(\"confirm-delete\").addEventListener(\"click\", function() {\n        _taskController__WEBPACK_IMPORTED_MODULE_1__.handleTask.deleteCategory(oldCategory);\n        document.querySelector(\".delete-category-warning\").style.display = \"none\";\n        _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.modalControl.deactivateContainer();\n        _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.displayUpdateCategory();\n        viewAll();\n    });\n\n    document.getElementById(\"cancel-delete\").addEventListener(\"click\", function() {\n        document.querySelector(\".delete-category-warning\").style.display = \"none\";\n        _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.modalControl.showEditCategoryModal();\n\n    });\n});\n\nfunction sectionSwitcher() {\n    switch(currentSection) {\n        case \"viewAll\":\n            viewAll();\n            break;\n        case \"today\":\n            today();\n            break;\n        case \"thisWeek\":\n            thisWeek();\n            break;  \n        case \"completedTasks\":\n            completedTasks();\n            break;\n    };\n\n    if (currentSection != \"viewAll\" && currentSection != \"today\" && currentSection != \"thisWeek\" && currentSection != \"completedTasks\") {\n        catSection(currentSection);\n    }\n\n    _displayController__WEBPACK_IMPORTED_MODULE_0__.displayController.resetForms();\n}\n\nviewAll()\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/taskController.js":
/*!*******************************!*\
  !*** ./src/taskController.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"handleTask\": () => (/* binding */ handleTask)\n/* harmony export */ });\n//Handles the to-do item and category objects and arrays\nconst handleTask = (function() {\n\n    let itemArray = [];\n    let categories = ['personal', 'work'];\n\n    //Creates a to-do item\n    const itemFactory = (status, priority, title, description, dueDate, category) => {\n        return { status, priority, title, description, dueDate, category};\n    }\n\n    //Sorts array by date\n    function sortArray(array) {\n        array.sort((a,b) => a.dueDate > b.dueDate ? 1 : -1);\n    }\n\n    //Adds a to-do item\n    function addItem(newItem) {\n        itemArray.push(newItem);\n        sortArray(itemArray);\n    }\n\n    //Edits a to-do item\n    function editItem(index, priority, title, description, dueDate, category) {\n        itemArray[index].priority = priority;\n        itemArray[index].title = title;\n        itemArray[index].description = description;\n        itemArray[index].dueDate = dueDate;\n        itemArray[index].category = category; \n        sortArray(itemArray);\n    }\n\n    //Removes a to-do item\n    function deleteItem(index) {\n        itemArray.splice(index, 1);\n        sortArray(itemArray);\n    }\n\n    //Provides array of all tasks due this week\n    function weeklyFilter() {\n        const date = new Date();\n        let currentDate = date.toISOString().slice(0,10);\n        \n        const weekDate = date.setDate(date.getDate() + 7);\n        let nextWeekDate = date.toISOString().slice(0,10);\n\n        let newArr = [];\n\n        for (let i=0;i<itemArray.length;i++) {\n            if (itemArray[i].dueDate >= currentDate && itemArray[i].dueDate <= nextWeekDate && itemArray[i].status === false) {\n                let newObj = itemArray[i];\n                newObj.dataSet = i;\n                newArr.push(newObj);\n            };\n        };\n\n        return newArr;\n    }\n\n    //Provides array of all incomplete tasks\n    function allCurrentTasks() {\n        let newArr = [];\n        for (let i=0;i<itemArray.length;i++) {\n            if (itemArray[i].status === false) {\n                let newObj = itemArray[i];\n                newObj.dataSet = i;\n                newArr.push(newObj);\n            };\n        };\n\n        return newArr;\n    }\n\n    //Provides array of all tasks due today\n    function dailyFilter() {\n        const date = new Date();\n        let currentDate = date.toISOString().slice(0,10);\n\n        let newArr = [];\n\n        for (let i=0;i<itemArray.length;i++) {\n            if (itemArray[i].dueDate == currentDate && itemArray[i].status === false) {\n                let newObj = itemArray[i];\n                newObj.dataSet = i;\n                newArr.push(newObj);\n            };\n        };\n\n        return newArr;\n    }\n\n    //Provides array of all tasks of a specific category\n    function categoryFilter(selectedCategory) {\n        let newArr = [];\n\n        for(let i=0;i<itemArray.length;i++) {\n            if (itemArray[i].category.toLowerCase() == selectedCategory.toLowerCase() && itemArray[i].status === false) {\n                let newObj = itemArray[i];\n                newObj.dataSet = i;\n                newArr.push(newObj);\n            };\n        };\n        \n        return newArr;\n    }\n\n    //Provides array of all completed tasks\n    function completedFilter() {\n        let newArr = [];\n\n        for(let i=0;i<itemArray.length;i++) {\n            if (itemArray[i].status === true) {\n                let newObj = itemArray[i];\n                newObj.dataSet = i;\n                newArr.push(newObj);\n            };\n        };\n\n        return newArr;\n    }\n\n    //Adds category to category array\n    function addCategory(name) {\n        if (categories.includes(name.toLowerCase()) === false) {\n            categories.push(name);\n        } else {\n            return;\n        };\n    }\n\n    //Edits category name\n    function editCategory(oldCategory, newCategory) {\n        if (categories.includes(newCategory.toLowerCase()) === false) {\n            for (let i=0;i<itemArray.length;i++) {\n                if (itemArray[i].category === oldCategory) {\n                    itemArray[i].category = newCategory;\n                };\n            };\n\n            for (let i=0;i<categories.length;i++) {\n                if (categories[i] === oldCategory) {\n                    categories[i] = newCategory;\n                };\n            };\n        } else {\n            return;\n        };\n    }\n\n    //Removes category from category array\n    function deleteCategory(category) {\n        for (let i=0;i<itemArray.length;i++) {\n            if (itemArray[i].category === category) {\n                itemArray.splice(i);\n            };\n        };\n\n        for (let i=0;i<categories.length;i++) {\n            if (categories[i] === category) {\n                categories.splice(i, 1);\n            };\n        };\n    }\n\n    //Updates status of item\n    function updateStatus(statusIndex) {\n        if (itemArray[statusIndex].status === false) {\n            return itemArray[statusIndex].status = true;\n        } else {\n            return itemArray[statusIndex].status = false;\n        };\n    }\n\n    return { allCurrentTasks, updateStatus, completedFilter, addItem, itemFactory, editItem, deleteItem, weeklyFilter, dailyFilter, categoryFilter, itemArray, categories, addCategory, editCategory, deleteCategory }\n})();\n\n\n\n//# sourceURL=webpack://todo-list/./src/taskController.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;