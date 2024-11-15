// Event listener for form submission to add tasks
document.getElementById('taskForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const taskInput = document.getElementById('taskInput').value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;

  // Get existing tasks from localStorage or initialize an empty array
  const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
  
  // Add the new task
  taskList.push({ task: taskInput, start: startDate, end: endDate });
  
  // Save updated task list back to localStorage
  localStorage.setItem('tasks', JSON.stringify(taskList));

  // Clear the form
  document.getElementById('taskForm').reset();
  
  // Re-render the task list
  renderTasks();
});

// Function to render tasks from localStorage
function renderTasks() {
  const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskListElement = document.getElementById('taskList');
  
  // Clear the task list in the DOM before rendering
  taskListElement.innerHTML = '';

  // Loop through each task and display it
  taskList.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.task} (From: ${item.start} To: ${item.end})`;
      
      // Create a delete button for each task
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.style.marginLeft = '10px';
      
      // Add event listener to delete the task when the button is clicked
      deleteButton.addEventListener('click', () => {
          deleteTask(index); // Pass the task index to delete
      });

      // Append the delete button to the task list item
      li.appendChild(deleteButton);
      
      // Append the task list item to the task list element in the DOM
      taskListElement.appendChild(li);
  });
}

// Function to delete a task from the list
function deleteTask(index) {
  const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
  
  // Remove the task at the given index
  taskList.splice(index, 1);
  
  // Save the updated task list back to localStorage
  localStorage.setItem('tasks', JSON.stringify(taskList));
  
  // Re-render the task list
  renderTasks();
}

// Initial rendering of tasks when the page loads
document.addEventListener('DOMContentLoaded', function() {
  renderTasks();
});