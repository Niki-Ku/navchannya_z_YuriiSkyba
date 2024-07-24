const calendar = document.getElementById('calendar-cels')
const selectDate = document.getElementById('select-date')
const lightboxContent = document.getElementById('lightbox-content')


const noteForm = document.createElement('form')
const noteFormInputTitle = document.createElement('input')
const noteFormInputText = document.createElement('input')
const inputTitleLabel = document.createElement('label')

// creating cels of calendar
for (let i = 1; i <= 31; i++){
    const day = document.createElement('div')
    const option = document.createElement('option')

    day.classList.add('day')
    option.value = i
    option.innerHTML = i

    day.id = i
    day.innerHTML = i

    calendar.appendChild(day)
    selectDate.appendChild(option)
}

//highlight selected cel
document.addEventListener('click', function(e){
    const allDays = document.querySelectorAll('.day')
    const selectedDay = document.getElementById(e.target.id)

    allDays.forEach(day => day.classList.remove('selected'))
    if (calendar.contains(e.target) && e.target !== calendar){
        selectedDay.classList.add('selected')
    }
})

//call lightbox on dblclick
calendar.addEventListener('dblclick', (e) => {
    const celId = e.target.id
    console.log(celId)
    callLightbox()
    fillLightbox(celId)
    document.getElementById('note-form').addEventListener('submit', (e) => handleSubmitNoteForm(e, celId))
    // add function to fill lightbox with form and events
    renderNotes(getNotesFromLocal(celId))
    }
)

//remove lightbox and inner conten on click outside
lightbox.addEventListener('click', function(e){
    if (e.target !== e.currentTarget) return
    lightbox.classList.remove('active')
    // document.getElementById('note-form').innerHTML = ''
    lightboxContent.innerHTML = ''
    console.log(document.getElementById('note-form'))
})

function callLightbox(){
    //removed id parameter maybe should give it back after
    // console.log(id)
    document.body.classList.add('lock')
    // dayNumber.innerHTML = id
    // console.log(id)
    lightbox.classList.add('active')
    // console.log(1)
    // generateNotes(getNotesFromLocal(id), id)
    //one problem here

    // lightboxForm(id)
}

function fillLightbox(celId){
    // should return day number    form to submit   events planed on this data 
    const noteDay = document.createElement('h3')
    const noteForm = createForm()
    const notesDiv = document.createElement('div')

    noteDay.innerText = celId

    lightboxContent.appendChild(noteDay)
    lightboxContent.appendChild(noteForm)
    lightboxContent.appendChild(notesDiv)

}

function createForm(){
    const inputTextLabel = document.createElement('label')
    const noteFormSubmitButton = document.createElement('button')

    noteForm.id = 'note-form'
    noteFormInputTitle.type = 'text'
    noteFormInputTitle.id = 'input-title'
    noteFormInputText.type = 'text'
    noteFormInputText.id = 'input-text'
    inputTitleLabel.setAttribute('for', 'input-title')
    inputTitleLabel.innerHTML = 'Note Title'
    inputTextLabel.setAttribute('for', 'input-text')
    inputTextLabel.innerHTML = 'Note Text'
    noteFormSubmitButton.innerHTML = 'Submit'

    noteForm.appendChild(inputTextLabel)
    noteForm.appendChild(noteFormInputText)
    noteForm.appendChild(inputTitleLabel)
    noteForm.appendChild(noteFormInputTitle)
    noteForm.appendChild(noteFormSubmitButton)

    return noteForm
}

function handleSubmitNoteForm(event, celId){
    event.preventDefault()
    
    console.log(celId)
    console.log('submitted')

    let noteTitle = noteFormInputTitle.value
    let noteText = noteFormInputText.value

    if (!noteTitle || !noteText){
        console.log('no')
    }else{
        let notesFromLocal = getNotesFromLocal(celId)
        console.log(notesFromLocal)
    
        // let note = !notesFromLocal ? [{noteTitle: noteTitle, noteText: noteText, noteId: generateId(), celId: celId }] : [{
        //     noteTitle: noteTitle,
        //     noteText: noteText,
        //     noteId: generateId(),
        //     celId: celId
        // },
        // ...notesFromLocal]
    
        function getN(){
            if (!notesFromLocal){
                return [{noteTitle: noteTitle, noteText: noteText, noteId: generateId(), celId: celId }]
            }else{
                return [{
                        noteTitle: noteTitle,
                        noteText: noteText,
                        noteId: generateId(),
                        celId: celId
                    },
                    ...notesFromLocal]
            }
        }
        note = getN()
        console.log(note)
    
        localStorage.setItem(`${celId}`, JSON.stringify(note))
    
        noteFormInputText.value = ''
        noteFormInputTitle.value = ''
    }

}

function renderNotes(notesArr){
    console.log(notesArr)
}


function getNotesFromLocal(id){
    return JSON.parse(localStorage.getItem(id))
}

function generateId(){
    return 'id' + Math.random().toString(16).slice(2)
}

