const form = document.getElementById('form')

const createTask = () => {
    const title = document.getElementById('title-input').value
    const text = document.getElementById('text-input').value
    let tasks = getTasks() || []
    const task = {id: generateId(), isDone:false, title, text}
    tasks.unshift(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    document.getElementById('title-input').value = ''
    document.getElementById('text-input').value = ''
    generateTasks()
}


const generateTasks = () => {
    const tasks = getTasks()
    const taskList = document.getElementById('tasklist')
    taskList.innerHTML = ''
    if (tasks){
        tasks.forEach(task => {
            const li = document.createElement('li')
            li.innerHTML = `
            <div>
                <h4>${task.title}</h4>
                <p>${task.text}</p>
                <button onclick="deleteTask('${task.id}')">Delete</button>
                <button onclick="taskDone('${task.id}')">Done</button>
            </div>
            `
            li.classList.add('task') 
            if (task.isDone){li.classList.add('done')}
            taskList.appendChild(li)
        });
    }
}

const getTasks = () => {
    return JSON.parse(localStorage.getItem('tasks'))
}

const deleteTask = (id) => {
    let tasks = getTasks()
    tasks = tasks.filter(task => task.id !== id)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    generateTasks()
}

const taskDone = (id) => {
    let tasks = getTasks()
    tasks = tasks.map(task => task.id === id ? {...task, isDone: !task.isDone} : task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    generateTasks()
}

generateTasks()

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    createTask()
})

const generateId = () => {
    return 'id' + Math.random().toString(16).slice(2)
}
