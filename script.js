// Add a new task
document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskDueDate = document.getElementById('taskDueDate').value;

    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <div class="task-content">
            <span class="task-name">${taskName}</span>
            <span class="task-description">${taskDescription}</span>
            <span class="task-due-date">Due: ${taskDueDate}</span>
        </div>
        <div class="task-actions">
            <button class="edit-btn">✏️</button>
            <button class="delete-btn">🗑️</button>
        </div>
        <form class="edit-form" style="display: none;">
            <input type="text" class="edit-task-name" value="${taskName}" required>
            <input type="text" class="edit-task-description" value="${taskDescription}">
            <input type="date" class="edit-task-due-date" value="${taskDueDate}" required>
            <button type="submit" class="save-btn">Save</button>
        </form>
    `;
    document.getElementById('taskList').appendChild(taskItem);

    // Clear the form
    document.getElementById('taskForm').reset();
});

// Remove a task
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        event.target.closest('li').remove();
    }
});

// Edit a task
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-btn')) {
        const taskItem = event.target.closest('li');
        const editForm = taskItem.querySelector('.edit-form');
        editForm.style.display = 'block';
    }
});

// Save edited task
document.addEventListener('submit', function(event) {
    if (event.target.classList.contains('edit-form')) {
        event.preventDefault();
        const taskItem = event.target.closest('li');
        const updatedName = taskItem.querySelector('.edit-task-name').value;
        const updatedDescription = taskItem.querySelector('.edit-task-description').value;
        const updatedDueDate = taskItem.querySelector('.edit-task-due-date').value;

        taskItem.querySelector('.task-name').textContent = updatedName;
        taskItem.querySelector('.task-description').textContent = updatedDescription;
        taskItem.querySelector('.task-due-date').textContent = `Due: ${updatedDueDate}`;

        event.target.style.display = 'none';
    }
});

// Sort tasks
document.getElementById('sortOptions').addEventListener('change', function(event) {
    const sortBy = event.target.value;
    const taskList = document.getElementById('taskList');
    const tasks = Array.from(taskList.children);

    tasks.sort((a, b) => {
        if (sortBy === 'name') {
            return a.querySelector('.task-name').textContent.localeCompare(b.querySelector('.task-name').textContent);
        } else if (sortBy === 'date') {
            const dateA = new Date(a.querySelector('.task-due-date').textContent.split('Due: ')[1]);
            const dateB = new Date(b.querySelector('.task-due-date').textContent.split('Due: ')[1]);
            return dateA - dateB; // Ascending order for dates
        } else if (sortBy === 'newest') {
            return tasks.indexOf(b) - tasks.indexOf(a); // Assuming 'newest' means the last added task
        } else if (sortBy === 'oldest') {
            return tasks.indexOf(a) - tasks.indexOf(b); // Assuming 'oldest' means the first added task
        }
    });

    taskList.innerHTML = '';
    tasks.forEach(task => taskList.appendChild(task));
});