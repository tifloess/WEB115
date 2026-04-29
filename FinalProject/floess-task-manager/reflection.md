# Project Reflection
## Tabitha Floess
## WEB115 Final Project

For this project, I created a task manager using HTML, CSS, and JavaScript. I started by looking at the project requirements and making sure my page had the main form elements it needed. This included a task name input, a priority dropdown, checkboxes for important and completed tasks, and a submit button. I also added a section where the tasks are displayed after the user adds them.

In JavaScript, I stored the tasks in an array. Each task is an object with information like the task name, priority, important status, completed status, ID number, and the date it was added. This helped me keep the task information organized. I used JavaScript to add tasks to the page, delete tasks, edit tasks, and mark them as completed or important.

One challenge was making sure the page updated correctly whenever a task changed. I used innerHTML to display the tasks again after changes were made. I also used JavaScript style properties to make important tasks red and completed tasks have a strikethrough. 

Another challenge was checking for empty task names, so I added a message when the user tries to submit a blank task. This project helped me practice working with forms, objects, and event-handling.

I also found the responsive design part challenging because the form and task cards did not initially look good on smaller displays. I had to adjust the CSS with media queries so the inputs, checkboxes, buttons, and task information stacked better on mobile devices.