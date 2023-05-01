// ELEMENTS 

const todoBtn = document.querySelector(".todo-btn");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const todoDiv = document.querySelector('.todo-div');
const todoFilter = document.querySelector('.todo-filter');

// EVENTS

document.addEventListener('DOMContentLoaded', getTodos);

todoBtn.addEventListener('click', addTodos);
todoFilter.addEventListener('click', filterTodos);

// FUNCTIONS

function addTodos(e) {
    e.preventDefault();

    // DIV CREATION

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-div');

    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.innerText = todoInput.value;

    // TRASH BUTTON
    const trashBtn = document.createElement('button');
    trashBtn.classList.add('trash-btn');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';

    // COMPLETE BUTTON
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.innerHTML = '<i class="fas fa-pen"></i>';

    if (todoInput.value == '') {
        return;
    }
    
    todoDiv.appendChild(todoItem);

    // Add todos to local
    saveTodosToLocal(todoInput.value);

    todoDiv.appendChild(editBtn);
    todoDiv.appendChild(completeBtn);
    todoDiv.appendChild(trashBtn);

    todoList.appendChild(todoDiv);
    todoInput.value = '';

    trashBtn.addEventListener('click', (e) => {
        const item = e.target;
        const todo = item.parentElement;
        const mTodo = todo.parentElement;
        
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', (e) => {
            mTodo.removeChild(todo);
        });
    });

    completeBtn.addEventListener('click', (e) => {
        const item = e.target;
        const todo = item.parentElement;
        
        todo.classList.toggle('complete');
        trashBtn.style.opacity = '1';
        editBtn.classList.toggle('no-pointer');
    });

    let elementCount = 0;
    editBtn.addEventListener('click', (e) => {

        completeBtn.style.pointerEvents = 'none';

        if (elementCount == 1) return;

        const editingForm = document.createElement('form');
        const editInput = document.createElement('input');
        const editOkBtn = document.createElement('button');
        
        editingForm.prepend(editOkBtn);
        editingForm.prepend(editInput);
        todoDiv.prepend(editingForm);
       
        todoDiv.style.transition = '.3s ease all';

        // Edit Input 
        editInput.classList.add('edit-input');
        editInput.autofocus;

        // Edit ok button
        editOkBtn.innerHTML = '<i class="fas fa-check"></i>'
        editOkBtn.classList.add('edit-ok');

        editInput.value = todoItem.innerText;
        todoItem.innerText = '';

        elementCount ++;  
        
        editOkBtn.addEventListener('click', e => {
            e.preventDefault();
            todoItem.innerText = editInput.value;
            editingForm.remove();
            editInput.remove();
            editOkBtn.remove();
            elementCount = 0;       
            completeBtn.style.pointerEvents = 'all';     
        });
    });

}

function filterTodos(e) {

    const todos = todoList.childNodes;

    todos.forEach(todo => {
        switch (e.target.value) {
            case 'all': 
                todo.style.display = 'flex';
                break;

            case 'complete':
                if (todo.classList.contains('complete')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;

            case 'uncompleted':
                if (!(todo.classList.contains('complete'))) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });

}

function saveTodosToLocal(todo) {
    // check if already there

    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {

    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(todo => {
        // DIV CREATION

        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-div');

        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        todoItem.innerText = todo;
        todoDiv.appendChild(todoItem);

        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.innerHTML = '<i class="fas fa-pen"></i>';
        todoDiv.appendChild(editBtn);

        // COMPLETE BUTTON
        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-btn');
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(completeBtn);

        // TRASH BUTTON
        const trashBtn = document.createElement('button');
        trashBtn.classList.add('trash-btn');
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(trashBtn);

        // if (todoInput.value == '') {
        //     return;
        // }

        todoList.appendChild(todoDiv);

        trashBtn.addEventListener('click', (e) => {
            const item = e.target;
            const todo = item.parentElement;
            const mTodo = todo.parentElement;
            
            todo.classList.add('fall');
            removeLocalTodos(todo);
            todo.addEventListener('transitionend', (e) => {
                mTodo.removeChild(todo);
            });
        });
    
        completeBtn.addEventListener('click', (e) => {
            const item = e.target;
            const todo = item.parentElement;
            
            todo.classList.toggle('complete');
            trashBtn.style.opacity = '1';
            editBtn.classList.toggle('no-pointer');
        });
    
        let elementCount = 0;
        editBtn.addEventListener('click', (e) => {
    
            completeBtn.style.pointerEvents = 'none';
    
            if (elementCount == 1) return;
    
            const editingForm = document.createElement('form');
            const editInput = document.createElement('input');
            const editOkBtn = document.createElement('button');
            
            editingForm.prepend(editOkBtn);
            editingForm.prepend(editInput);
            todoDiv.prepend(editingForm);
           
            todoDiv.style.transition = '.3s ease all';
    
            // Edit Input 
            editInput.classList.add('edit-input');
            editInput.autofocus;
    
            // Edit ok button
            editOkBtn.innerHTML = '<i class="fas fa-check"></i>'
            editOkBtn.classList.add('edit-ok');
    
            editInput.value = todoItem.innerText;
            todoItem.innerText = '';
    
            elementCount ++;  
            
            editOkBtn.addEventListener('click', e => {
                e.preventDefault();
                todoItem.innerText = editInput.value;
                editingForm.remove();
                editInput.remove();
                editOkBtn.remove();
                elementCount = 0;       
                completeBtn.style.pointerEvents = 'all';     
            });
        });
    });
}

function removeLocalTodos(todo) {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem('todos', JSON.stringify(todos));
}
