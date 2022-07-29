const handleTask = (function() {

    let itemArray = [];
    let categories = ['personal', 'work'];

    const itemFactory = (status, priority, title, description, dueDate, category) => {
        return { status, priority, title, description, dueDate, category};
    }

    function sortArray(array) {
        array.sort((a,b) => a.dueDate > b.dueDate ? 1 : -1);
    }

    function addItem(newItem) {
        itemArray.push(newItem);
        sortArray(itemArray);
        console.log(itemArray);
    }

    function editItem(index, priority, title, description, dueDate, category) {
        itemArray[index].priority = priority;
        itemArray[index].title = title;
        itemArray[index].description = description;
        itemArray[index].dueDate = dueDate;
        itemArray[index].category = category;

        console.log(itemArray);
    }

    function deleteItem(index) {
        itemArray.splice(index, 1);
        sortArray(itemArray);
    }

    function weeklyFilter() {
        const date = new Date();
        let currentDate = date.toISOString().slice(0,10);
        
        const weekDate = date.setDate(date.getDate() + 7);
        let nextWeekDate = date.toISOString().slice(0,10);

        let newArr = [];

        for (let i=0;i<itemArray.length;i++) {
            if (itemArray[i].dueDate >= currentDate && itemArray[i].dueDate <= nextWeekDate) {
                newArr.push(itemArray[i]);
            };
        };

        return newArr;
    }

    function dailyFilter() {
        const date = new Date();
        let currentDate = date.toISOString().slice(0,10);

        let newArr = [];

        for (let i=0;i<itemArray.length;i++) {
            if (itemArray[i].dueDate == currentDate) {
                newArr.push(itemArray[i]);
            };
        };

        return newArr;
    }

    function categoryFilter(selectedCategory) {
        let newArr = [];

        for(let i=0;i<itemArray.length;i++) {
            if (itemArray[i].category == selectedCategory) {
                newArr.push(itemArray[i]);
            };
        };
        
        return newArr;
    }

    function addCategory(name) {
        categories.push(name);
    }

    function editCategory(oldCategory, newCategory) {
        if (categories.includes(newCategory) == false) {
            for (let i=0;i<itemArray.length;i++) {
                if (itemArray[i].category === oldCategory) {
                    itemArray[i].category = newCategory;
                }
            }

            for (let i=0;i<categories.length;i++) {
                if (categories[i] === oldCategory) {
                    categories[i] = newCategory;
                }
            }
        } else {
            return;
        }
    }

    function deleteCategory(category) {
        for (let i=0;i<itemArray.length;i++) {
            if (itemArray[i].category === category) {
                itemArray.splice(i);
            }
        }

        for (let i=0;i<categories.length;i++) {
            if (categories[i] === category) {
                categories.splice(i, 1);
            }
        }
    }



    return { addItem, itemFactory, editItem, deleteItem, weeklyFilter, dailyFilter, categoryFilter, itemArray, categories, addCategory, editCategory, deleteCategory }
})();




export { handleTask }