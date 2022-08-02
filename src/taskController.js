//Handles the to-do item and category objects and arrays
const handleTask = (function() {

    let itemArray = [];
    let categories = ['personal', 'work'];

    //Creates a to-do item
    const itemFactory = (status, priority, title, description, dueDate, category) => {
        return { status, priority, title, description, dueDate, category};
    }

    //Sorts array by date
    function sortArray(array) {
        array.sort((a,b) => a.dueDate > b.dueDate ? 1 : -1);
    }

    //Adds a to-do item
    function addItem(newItem) {
        itemArray.push(newItem);
        sortArray(itemArray);
    }

    //Edits a to-do item
    function editItem(index, priority, title, description, dueDate, category) {
        itemArray[index].priority = priority;
        itemArray[index].title = title;
        itemArray[index].description = description;
        itemArray[index].dueDate = dueDate;
        itemArray[index].category = category; 
        sortArray(itemArray);
    }

    //Removes a to-do item
    function deleteItem(index) {
        itemArray.splice(index, 1);
        sortArray(itemArray);
    }

    //Provides array of all tasks due this week
    function weeklyFilter() {
        const date = new Date();
        let currentDate = date.toISOString().slice(0,10);
        
        const weekDate = date.setDate(date.getDate() + 7);
        let nextWeekDate = date.toISOString().slice(0,10);

        let newArr = [];

        for (let i=0;i<itemArray.length;i++) {
            if (itemArray[i].dueDate >= currentDate && itemArray[i].dueDate <= nextWeekDate && itemArray[i].status === false) {
                let newObj = itemArray[i];
                newObj.dataSet = i;
                newArr.push(newObj);
            };
        };

        return newArr;
    }

    //Provides array of all incomplete tasks
    function allCurrentTasks() {
        let newArr = [];
        for (let i=0;i<itemArray.length;i++) {
            if (itemArray[i].status === false) {
                let newObj = itemArray[i];
                newObj.dataSet = i;
                newArr.push(newObj);
            };
        };

        return newArr;
    }

    //Provides array of all tasks due today
    function dailyFilter() {
        const date = new Date();
        let currentDate = date.toISOString().slice(0,10);

        let newArr = [];

        for (let i=0;i<itemArray.length;i++) {
            if (itemArray[i].dueDate == currentDate && itemArray[i].status === false) {
                let newObj = itemArray[i];
                newObj.dataSet = i;
                newArr.push(newObj);
            };
        };

        return newArr;
    }

    //Provides array of all tasks of a specific category
    function categoryFilter(selectedCategory) {
        let newArr = [];

        for(let i=0;i<itemArray.length;i++) {
            if (itemArray[i].category == selectedCategory && itemArray[i].status === false) {
                let newObj = itemArray[i];
                newObj.dataSet = i;
                newArr.push(newObj);
            };
        };
        
        return newArr;
    }

    //Provides array of all completed tasks
    function completedFilter() {
        let newArr = [];

        for(let i=0;i<itemArray.length;i++) {
            if (itemArray[i].status === true) {
                let newObj = itemArray[i];
                newObj.dataSet = i;
                newArr.push(newObj);
            };
        };

        return newArr;
    }

    //Adds category to category array
    function addCategory(name) {
        if (categories.includes(name.toLowerCase()) === false) {
            categories.push(name);
        } else {
            return;
        };
    }

    //Edits category name
    function editCategory(oldCategory, newCategory) {
        if (categories.includes(newCategory.toLowerCase()) === false) {
            for (let i=0;i<itemArray.length;i++) {
                if (itemArray[i].category === oldCategory) {
                    itemArray[i].category = newCategory;
                };
            };

            for (let i=0;i<categories.length;i++) {
                if (categories[i] === oldCategory) {
                    categories[i] = newCategory;
                };
            };
        } else {
            return;
        };
    }

    //Removes category from category array
    function deleteCategory(category) {
        for (let i=0;i<itemArray.length;i++) {
            if (itemArray[i].category === category) {
                itemArray.splice(i);
            };
        };

        for (let i=0;i<categories.length;i++) {
            if (categories[i] === category) {
                categories.splice(i, 1);
            };
        };
    }

    //Updates status of item
    function updateStatus(statusIndex) {
        if (itemArray[statusIndex].status === false) {
            return itemArray[statusIndex].status = true;
        } else {
            return itemArray[statusIndex].status = false;
        };
    }

    return { allCurrentTasks, updateStatus, completedFilter, addItem, itemFactory, editItem, deleteItem, weeklyFilter, dailyFilter, categoryFilter, itemArray, categories, addCategory, editCategory, deleteCategory }
})();

export { handleTask }