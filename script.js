
document.addEventListener('DOMContentLoaded', () => {
    
    const taskInput = document.getElementById
    ('task-input');
    const addTaskBtn = document.getElementById
    ('add-task-btn');
    const taskList = document.getElementById
    ('task-list');
    const emptyImage = document.querySelector('.empty-image');

    const todosContainer = document.querySelector('.todos-container');

    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';   
    };

    const addTask = (text, completed = false) => {
        const taskText = text || taskInput.value.trim();
        if(!taskText) {
            return;
        }

        const li = document.createElement('li');
        li.innerHTML =  `
        <input type="checkbox" class="checkbox" ${
            completed ? 'checked' : ''}/>
        <span>${taskText}</span>
        <div class ="task-buttons">
            <button class="edit-btn"><i
            class="fa-solid fa-pen"></i></button>
            <button class="delete-btn"><i
            class="fa-solid fa-trash"></i></button>
        </div>
        `;
        
        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-btn');

        if (completed) {
            li.classList.add('completed');
            editBtn.disabled = true;
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none';
        }

        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? '0.5' : '1';
            editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
        });

        editBtn.addEventListener('click', () => {
            if(!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                toggleEmptyState();
            }
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            toggleEmptyState();
        });

        taskList.appendChild(li);
        taskInput.value = '';
        toggleEmptyState();
    };

    addTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addTask();
    });

    taskInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    });

    const pinBtn = document.getElementById('pin-btn');
    const pinIcon = pinBtn.querySelector('i');

    let isPinned = true;

    pinBtn.addEventListener('click', () => {
        isPinned = !isPinned;

        window.electronAPI.togglePin();

        if (isPinned) {
            pinIcon.classList.remove('fa-thumbtack');
            pinIcon.classList.add('fa-thumbtack');
            pinIcon.style.transform = "rotate(0deg)";
            pinIcon.style.opacity = "1";
        } else {
            pinIcon.style.transform = "rotate(45deg)";
            pinIcon.style.opacity = "0.6";
        }
    });

    const closeBtn = document.getElementById('close-btn');

    closeBtn.addEventListener('click', () => {
        document.querySelector('.todo-app').innerHTML = `
            <div class="end-screen">
                <h1>another productive session!</h1>
                <img src="images/empty-image.png" alt="empty" height="120" width="120">
                <p>have a good rest of your day &lt;3</p>
            </div>
        `;
            setTimeout(() => {
            window.electronAPI.closeWindow();
        }, 3500);
    });
});