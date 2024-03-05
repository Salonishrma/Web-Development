const todolist = [
    { name: 'Pay Bills', completed: false },
    { name: 'See the Doctor', completed: false },
    { name: 'Go Shopping', completed: false }
];

ShowList();

function ShowList() {
    let todolistHTML = '';
    let completedListHTML = '';

    todolist.forEach((todoObject, index) => {
        const { name, completed } = todoObject;
        const checkboxHTML = `<input type="checkbox" class="js-checkbox" data-index="${index}" ${completed ? 'checked' : ''}>`;
        const html = `<div>${checkboxHTML} ${name}</div>
                      <button class="js-Edit-todo-button" data-index="${index}">Edit</button>
                      <button class="js-delete-todo-button" data-index="${index}">Delete</button>`;

        if (completed) {
            completedListHTML += html;
        } else {
            todolistHTML += html;
        }
    });

    document.querySelector('.js-todo-list').innerHTML = todolistHTML;
    document.querySelector('.js-completed-list').innerHTML = completedListHTML;

    document.querySelectorAll('.js-Edit-todo-button').forEach(editButton => {
        editButton.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            editData(index);
        });
    });

    document.querySelectorAll('.js-delete-todo-button').forEach(deleteButton => {
        deleteButton.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            todolist.splice(index, 1);
            ShowList();
        });
    });

    document.querySelectorAll('.js-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const index = e.target.getAttribute('data-index');
            fun1(index);
        });
    });
}

function editData(index) {
    const newName = prompt('Edit the Item');
    if (newName !== null) {
        todolist[index].name = newName;
        ShowList();
    }
}

function fun1(index) {
    todolist[index].completed = !todolist[index].completed;
    ShowList();
}

document.querySelector('.js-add-todo-button').addEventListener('click', () => {
    addTodo();
});

function addTodo() {
    const inputName = document.querySelector('.js-name-input');
    const name = inputName.value;

    todolist.push({
        name,
        completed: false
    });

    inputName.value = '';
    ShowList();
}