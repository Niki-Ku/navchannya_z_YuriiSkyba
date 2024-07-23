const calendar = document.getElementById('calendar-cels')
const selectDateForm = document.getElementById('select-date-form')
const selectDate = document.getElementById('select-date')
const lightbox = document.getElementById('lightbox')
const dayNumber = document.getElementById('lightbox-day')


selectDateForm.addEventListener('submit', function(e){
    e.preventDefault()
    callLightbox(selectDate.value)
})

// creating cels of calendar
for (let i = 1; i <= 31; i++){
    const day = document.createElement('div')
    day.classList.add('day')
    day.id = i
    day.innerHTML = i
    calendar.appendChild(day)
    selectDate.innerHTML += `<option value="${i}">${i}</option>`
}

calendar.addEventListener('dblclick', (e) => {
    callLightbox(e.target.id)
    console.log(2)
    }
)

lightbox.addEventListener('click', function(e){
    if (e.target !== e.currentTarget) return
    lightbox.classList.remove('active')
    document.getElementById('lightbox-notes').innerHTML = ''
})




document.addEventListener('click', function(e){
    const allDays = document.querySelectorAll('.day')
    const selectedDay = document.getElementById(e.target.id)

    allDays.forEach(day => day.classList.remove('selected'))
    if (calendar.contains(e.target) && e.target !== calendar){
        // console.log(e.target)
        selectedDay.classList.add('selected')
    }
})

function callLightbox(id){
    console.log(2)
    document.body.classList.add('lock')
    dayNumber.innerHTML = id
    // console.log(id)
    lightbox.classList.add('active')
    // console.log(1)
    generateNotes(getNotesFromLocal(id), id)
    //one problem here

    lightboxForm(id)
}

function lightboxForm(celId){
    document.getElementById('add-event-from').addEventListener('submit', function(e){
        console.log(2)
        console.log('second start')
        e.preventDefault()
        let noteTitle = document.getElementById('add-event-from-title').value
        let noteDescription = document.getElementById('add-event-from-description').value

        // console.log(noteTitle)
        // console.log(noteDescription)

        let notesFromLocal = getNotesFromLocal(celId)

        let note = !notesFromLocal ? [{noteTitle: noteTitle, noteDescription: noteDescription, noteId: generateId(), celId: celId }] : [{
            noteTitle: noteTitle,
            noteDescription: noteDescription,
            noteId: generateId(),
            celId: celId
        },
        ...notesFromLocal];

        // console.log(note)

        noteTitle = ''   // doesn't work 
        noteDescription = ''

        // localStorage.removeItem(`${celId}`)
        localStorage.setItem(`${celId}`, JSON.stringify(note))
        const newNotes = getNotesFromLocal(celId)
        generateNotes(newNotes, celId)
    })
}


function generateNotes(notesArr, celId){
    // console.log(1)
    console.log(2)
    console.log(notesArr)
    // console.log(generateNotesHtml(notesArr))
    let notesDiv = document.getElementById('lightbox-notes')
    notesDiv.innerHTML = ''
    notesDiv.innerHTML = generateNotesHtml(notesArr, celId)

    let notesFromLocal = getNotesFromLocal(celId)
    console.log(notesFromLocal)

    if(document.querySelectorAll('.delete')){
        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', function(e) {
                console.log(e.target.dataset.noteId)
                console.log('click')
                // button.parentElement.remove()

                notesFromLocal.forEach(note => {
                    if (note.noteId === e.target.dataset.noteId){
                        console.log('yes')
                    }
                })
                console.log(notesFromLocal)
                const result = notesFromLocal.filter(note => note.noteId !== e.target.dataset.noteId)
                console.log(result)
                localStorage.removeItem(`${celId}`)
                localStorage.setItem(`${celId}`, JSON.stringify(result))
                //update local storage
                console.log(2)
                generateNotes(result, celId)
            })
        })
    }
}


function getNotesFromLocal(id){
    // console.log(1)
    // console.log(2)
    const localStorageData = JSON.parse(localStorage.getItem(id))
    // console.log(localStorageData)
    return localStorageData
}

function generateNotesHtml(notesArr, celId){
    // console.log(1)
    let notesHtml = ''
    if (notesArr){
        const nodesForCel = notesArr.filter(node => node.celId === celId)
        nodesForCel.forEach(note => {
            notesHtml += `
            <div class="note">
                <h3>${note.noteTitle}</h3>
                <p>${note.noteDescription}</p>
                <button class="delete" data-note-id="${note.noteId}">Delete</button>
            </div>
            `
        })
        // console.log(notesHtml)
    }
return notesHtml
}



function generateId(){
    return 'id' + Math.random().toString(16).slice(2)
}


//give special id to every note
//on click delete this note from local storage
// rerun generateNotes function

