const handleTask = (function() {

    let itemArray = [];

    const itemFactory = (priority, title, description, dueDate, category) => {
        return { priority, title, description, dueDate, category};
    }

    function addItem(newItem) {
        itemArray.push(newItem);
        console.log(itemArray);
    }

    return { addItem, itemFactory }
})();




export { handleTask }