const todolist=[{
    name:'make dinnner',
    dueDate :'2022-12-22'
    },{
       name: 'wash dishes',
       dueDate :'2022-12-22'
    }];


renderTodoList();

function renderTodoList(){

    let todolistHTML='';

    todolist.forEach((todoObject,index) => {
        const {name,dueDate}=todoObject;
       // const name=todoObject.name;
        //const dueDate=todoObject.dueDate;
        const html =
        `<div>${name}</div>
        <div>${dueDate}</div>
        <button  class="delete-todo-button js-delete-todo-button">
            Delete 
        </button>`;
        todolistHTML+=html;
    });
    document.querySelector('.js-todo-list').innerHTML = todolistHTML;
   document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton,index)=>{
        deleteButton.addEventListener('click',() =>{
         todolist.splice(index,1);
         renderTodoList();
        });
   });
}

document.querySelector('.js-add-todo-button')
.addEventListener('click',() =>{
    addTodo();
})
function addTodo(){
   const inputElement = document.querySelector('.js-name-input');
   const name =inputElement.value;
   const dateinputElement =document.querySelector('.js-due-date-input');
   const dueDate = dateinputElement.value;
   /*used to push the element in array*/
   todolist.push({
        //name:name,
        //dueDate :dueDate,
        name,
        dueDate
   });
 
   /*to make empty after adding*/
   inputElement.value=' ';
   dateinputElement.value=' ';
   renderTodoList();
}