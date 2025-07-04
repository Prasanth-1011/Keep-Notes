
// Hide initial hardcoded container
document.querySelector(".Container").style.display = "none";

// Select elements
const addBtn = document.querySelector(".Add-Button");
const popup = document.querySelector(".Popup");
const popupAddBtn = document.querySelector(".Popup-Added");
const notesContainer = document.querySelector(".Notes");
const popupTitleInput = document.querySelectorAll(".Popup-Contents")[0];
const popupContentInput = document.querySelectorAll(".Popup-Contents")[1];

const editPopup = document.querySelector(".Edit-Popup");
const editTitleInput = document.querySelectorAll(".Edit-Popup-Contents")[0];
const editContentInput = document.querySelectorAll(".Edit-Popup-Contents")[1];
const editConfirmBtn = document.querySelector(".Edit-Popup-Added");

let currentEditContainer = null;

// Show Add Note Popup
addBtn.addEventListener("click", () => {
    popup.style.display = "flex";
    popupTitleInput.value = "";
    popupContentInput.value = "";
});

// Handle Add Note
popupAddBtn.addEventListener("click", (e) => {
    e.preventDefault(); // prevent refresh

    const title = popupTitleInput.value.trim();
    const content = popupContentInput.value.trim();

    if (!title || !content) return;

    createNoteContainer(title, content);

    popup.style.display = "none";
});

// Create Note Container
function createNoteContainer(title, content) {
    const container = document.createElement("div");
    container.classList.add("Container");

    const titleElem = document.createElement("p");
    titleElem.classList.add("Title");
    titleElem.innerText = title;

    const contentElem = document.createElement("div");
    contentElem.classList.add("Contents");
    contentElem.innerText = content;

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("Button");

    const editBtn = document.createElement("button");
    editBtn.classList.add("Edit");
    editBtn.innerText = "Edit";
    editBtn.onclick = () => {
        currentEditContainer = container;
        editTitleInput.value = title;
        editContentInput.value = content;
        editPopup.style.display = "flex";
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("Delete");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => container.remove();

    buttonDiv.appendChild(editBtn);
    buttonDiv.appendChild(deleteBtn);

    container.appendChild(titleElem);
    container.appendChild(contentElem);
    container.appendChild(buttonDiv);

    notesContainer.appendChild(container);
}

// Handle Edit Confirm
editConfirmBtn.addEventListener("click", (e) => {
    e.preventDefault(); // prevent refresh

    const newTitle = editTitleInput.value.trim();
    const newContent = editContentInput.value.trim();

    if (!newTitle || !newContent) return;

    currentEditContainer.querySelector(".Title").innerText = newTitle;
    currentEditContainer.querySelector(".Contents").innerText = newContent;

    editPopup.style.display = "none";
});

// Optional: Hide popups when clicking outside
window.addEventListener("click", (e) => {
    if (e.target === popup) popup.style.display = "none";
    if (e.target === editPopup) editPopup.style.display = "none";
});