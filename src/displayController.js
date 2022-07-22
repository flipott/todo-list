//Initialize DOM
const addModal = document.getElementById("add-item");
const closeModal = document.getElementById("modal-close");

//Show or hide modal depending on button click
let modalControl = (function() {

    addModal.addEventListener("click", function(){
        showModal();
    });

    closeModal.addEventListener("click", function(){
        hideModal();
    });

    function showModal() {
        document.querySelector(".modal").style.display = "flex";
    }

    function hideModal() {
        document.querySelector(".modal").style.display = "none";
    }

    return { showModal, hideModal }
})();


export { modalControl }