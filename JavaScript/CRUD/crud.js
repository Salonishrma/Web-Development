const crud = [
    {
        Name: 'Ramesh',
        Id: 'Fadatare',
        Designation: 'Director',
        DOB: '1998-09-14',
        Gender: 'Male'
    },
    {
        Name: 'Ayush',
        Id: 'Ayu19@gmail.com',
        Designation: 'CEO',
        DOB: '2000-09-04',
        Gender: 'Male'
    }
];

fun1();

function fun1() {
    let Details = '';

    crud.forEach((crudObject, index) => {
        const {Name, Id, Designation, DOB, Gender} = crudObject;
        const html = `<div>${Name}</div>
                      <div>${Id}</div>
                      <div>${Designation}</div>
                      <div>${DOB}</div>
                      <div>${Gender}</div>
                      <button class="js-Edit-crud-button" data-index="${index}">
                          Edit
                      </button>
                      <button class="js-delete-crud-button" data-index="${index}">
                          Delete
                      </button>`;
        Details += html;
    });

    document.querySelector('.js-list').innerHTML = Details;

    document.getElementById('searchButton').addEventListener('click', searchEmployee);

    function searchEmployee() {
        const searchInput = document.getElementById('searchName').value.toLowerCase();
        const result = crud.find(employee => employee.Name.toLowerCase() === searchInput);

        if (result) {
            const { Name, Id, Designation, DOB, Gender } = result;
            const output= `Name: ${Name}\nEmail ID: ${Id}\nDesignation: ${Designation}\nDOB: ${DOB}\nGender: ${Gender}`;
            alert(output);
        } else {
            alert('Sorry!This Employee is not in our Company.Thank You');
        }
    }

    document.querySelectorAll('.js-Edit-crud-button')
        .forEach(editButton => {
            editButton.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                editData(index);
            });
        });

    document.querySelectorAll('.js-delete-crud-button')
        .forEach(deleteButton => {
            deleteButton.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                crud.splice(index, 1);
                fun1();
            });
        });
}

document.querySelector('.js-add-crud-button')
    .addEventListener('click', () => {
        addData();
    });

document.querySelector('.js-filter-button')
    .addEventListener('click', () => {
        filterData();
    });


function addData() {
    const inputName = document.querySelector('.js-name-input');
    const Name = inputName.value;
    const inputId = document.querySelector('.js-id-input');
    const Id = inputId.value;
    const inputDesignation = document.querySelector('.js-designation-input');
    const Designation = inputDesignation.value;
    const inputDOB = document.querySelector('.js-date-input');
    const DOB = inputDOB.value;
    const inputGender = document.querySelector('input[name="gender"]:checked');
    const Gender = inputGender ? inputGender.value : '';
    
    if (Name === '' || Id === '' || Designation === '' || DOB === '' || Gender === '') {
        alert('Please fill in all fields.');
        return; 
    }
    
    crud.push({
        Name,
        Id,
        Designation,
        DOB,
        Gender
    });

    inputName.value = '';
    inputId.value = '';
    inputDesignation.value = '';
    inputDOB.value = '';
    document.querySelectorAll('input[name="gender"]').forEach(radio => radio.checked = false);
    fun1();

}

function editData(index) {
    const {Name, Id, Designation, DOB, Gender} = crud[index];
    const inputName = document.querySelector('.js-name-input');
    const inputId = document.querySelector('.js-id-input');
    const inputDesignation = document.querySelector('.js-designation-input');
    const inputDOB = document.querySelector('.js-date-input');
    const inputGender = document.querySelector('.js-gender-input');

    inputName.value = Name;
    inputId.value = Id;
    inputDesignation.value = Designation;
    inputDOB.value = DOB;
    if (inputGender) inputGender.checked = true;

    crud.splice(index, 1);
    fun1();
}

function filterData() {
    const designationFilter = document.querySelector('.js-designation-filter').value.trim().toLowerCase();
    let filteredCrud = crud;

    if (designationFilter) {
        filteredCrud = filteredCrud.filter(employee => employee.Designation.toLowerCase().includes(designationFilter));
    }

    let Details = '';

    filteredCrud.forEach((crudObject, index) => {
        const {Name, Id, Designation, DOB, Gender} = crudObject;
        const html = `<div class="crud-row">${Name}</div>
                      <div class="crud-row">${Id}</div>
                      <div class="crud-row">${Designation}</div>
                      <div class="crud-row">${DOB}</div>
                      <div class="crud-row">${Gender}</div>
                      <button class="js-Edit-crud-button" data-index="${index}">
                          Edit
                      </button>
                      <button class="js-delete-crud-button" data-index="${index}">
                          Delete
                      </button>`;
        Details += html;
    });

    document.querySelector('.crud-grid').innerHTML = Details;

    document.querySelectorAll('.js-Edit-crud-button')
        .forEach(editButton => {
            editButton.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                editData(index);
            });
        });

    document.querySelectorAll('.js-delete-crud-button')
        .forEach(deleteButton => {
            deleteButton.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                crud.splice(index, 1);
                filterData(); // Update the filtered view after deletion
            });
        });
}
