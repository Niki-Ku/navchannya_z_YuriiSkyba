const calendar = document.getElementById('calendar-cels')
const selectDate = document.getElementById('select-date')
const lightboxContent = document.getElementById('lightbox-content')
const lightbox = document.getElementById('lightbox')
const lightboxDay = document.getElementById('lightbox-day')
const notesDiv = document.getElementById('lightbox-notes')
const form = document.getElementById('add-event-from')
const selectForm = document.getElementById('select-date-form')
let selectedDay = null

for (let i = 1; i <= 31; i++){
    const day = document.createElement('div')
    const option = document.createElement('option')
    day.classList.add('day')
    option.value = i
    option.innerHTML = i
    day.id = `day-${i}`
    day.innerHTML = `
    <h2>Day ${i}</h2>
    <p id="plans-${i}">${isPlans(getNotes(i))}</p>
    `
    calendar.appendChild(day)
    selectDate.appendChild(option)

    day.addEventListener('click', () => {
        selectDay(i)
    })

    day.addEventListener('dblclick', () => {
        callLightbox(i)
    })
}

function isPlans(arr){
    return arr !== null && arr.length > 0 ? "You have plans on this day" : ''
}

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox){
        lightbox.classList.remove('active')
    }
})

selectForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const day = document.getElementById('select-date').value
    if (day){
        selectDay(day)
        callLightbox(day)
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    addNote()
})

function selectDay(day){
    if (selectedDay) {
       document.getElementById(`day-${selectedDay}`).classList.remove('selected')
    }
    selectedDay = day
    document.getElementById(`day-${day}`).classList.add('selected')
}

function callLightbox(day){
    lightboxDay.innerText = `Day ${day}`
    lightbox.classList.add('active')
    selectedDay = day 
    updateNotesDiv()
}

function updateNotesDiv(){
    let notes = getNotes(selectedDay) || [];
    notesDiv.innerHTML = ''
    notes.forEach(note => {
        const noteDiv = document.createElement('div')
        noteDiv.classList.add('note')
        noteDiv.innerHTML =`
            <h4>${note.title}</h4>
            <p>${note.text}</p>
            <button onclick="deleteNote('${note.id}')">Delete</button>
        `
        notesDiv.appendChild(noteDiv)
    });
}

function getNotes(day){
    return JSON.parse(localStorage.getItem(day))
}

function addNote(){
    const title = document.getElementById('add-event-from-title').value
    const text = document.getElementById('add-event-from-description').value
    let notes = getNotes(selectedDay) || []
    const note = {id: generateId(), title, text}
    notes.unshift(note)
    localStorage.setItem(selectedDay, JSON.stringify(notes))
    document.getElementById('add-event-from-title').value = ''
    document.getElementById('add-event-from-description').value = ''
    updateNotesDiv()
    document.getElementById(`plans-${selectedDay}`).innerText = isPlans(getNotes(selectedDay))

}

function deleteNote(noteId){
    let notes = getNotes(selectedDay)
    notes = notes.filter(note => note.id !== noteId)
    localStorage.setItem(selectedDay, JSON.stringify(notes))
    updateNotesDiv()
    document.getElementById(`plans-${selectedDay}`).innerHTML = isPlans(getNotes(selectedDay))
}

function generateId(){
    return 'id' + Math.random().toString(16).slice(2)
}

