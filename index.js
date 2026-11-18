const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

const initialTasks = {
  task1: "Сделать проектную работу",
  task2: "Полить цветы",
  task3: "Пройти туториал по Реакту",
  task4: "Сделать фронт для своего проекта",
  task5: "Прогуляться по улице в солнечный день",
  task6: "Помыть посуду",
};

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks !== null) {
    return JSON.parse(savedTasks);
  }

  return Object.values(initialTasks);
}

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

  deleteButton.addEventListener("click", () => {
    clone.remove();

    const items = getTasksFromDOM();
    saveTasks(items);
  });

  duplicateButton.addEventListener("click", () => {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);
    listElement.prepend(newItem);

    const items = getTasksFromDOM();
    saveTasks(items);
  });

  editButton.addEventListener("click", () => {
    textElement.setAttribute("contenteditable", "true");
    textElement.focus();
  });

  textElement.addEventListener("blur", () => {
    textElement.setAttribute("contenteditable", "false");

    const items = getTasksFromDOM();
    saveTasks(items);
  });

  return clone;
}

function getTasksFromDOM() {
  const itemsNamesElements = listElement.querySelectorAll(".to-do__item-text");
  const tasks = [];

  itemsNamesElements.forEach((itemNameElement) => {
    tasks.push(itemNameElement.textContent);
  });

  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const item = inputElement.value.trim();

  if (item === "") {
    return;
  }

  listElement.prepend(createItem(item));

  items = getTasksFromDOM();
  saveTasks(items);
  inputElement.value = "";
});

let items = loadTasks();

items.forEach((item) => {
  const newItem = createItem(item);
  listElement.append(newItem);
});

