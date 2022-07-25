const handleTask = (function() {

    let itemArray = [];

    const itemFactory = (priority, title, description, dueDate, category) => {
        return { priority, title, description, dueDate, category};
    }

    function addItem(newItem) {
        itemArray.push(newItem);
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
    }

    return { addItem, itemFactory, editItem, deleteItem, itemArray }
})();




export { handleTask }