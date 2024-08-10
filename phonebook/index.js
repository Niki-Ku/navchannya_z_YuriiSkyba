const form = document.getElementById('form')
const searchForm = document.getElementById('search-form')
const searchDiv = document.getElementById('search-div')
const lightbox = document.getElementById('lightbox')

const findContact = () => {
    const val = document.getElementById('search-input').value
    const hr = document.createElement('hr')
    searchDiv.innerHTML = ''

    let contacts = getContacts()
    contacts = contacts.filter(contact => contact.name.toLowerCase() === val.toLowerCase() || Number(contact.number) === Number(val))

    searchDiv.innerHTML = contacts.length === 0 ? '<p>No contact was found</p>' : ''
    appendContactToParent(contacts, searchDiv)
    searchDiv.appendChild(hr)
    document.getElementById('search-input').value = ''
}

const appendContactToParent = (arr, parent) => {
    arr.forEach(contact => {
        const div = document.createElement('div')
        div.setAttribute('id', contact.id)
        div.innerHTML =  `
        <h4>${contact.name}</h4>
        <p>${contact.number}</p>
        <button onclick="deleteContact('${contact.id}')">Delete Contact</button>
        <button onclick="editContact('${contact.id}')">Edit Contact</button>
        `
        parent.appendChild(div)
    })
}

const addContact = () => {
    const name = document.getElementById('name').value
    const number = document.getElementById('number').value

    addContactToLocal(generateId(), name, number)
    generateContacts()

    document.getElementById('name').value = ''
    document.getElementById('number').value = ''
}

const generateContacts = () => {
    const contactsDiv = document.getElementById('contact')
    const contacts = getContacts()
    contactsDiv.innerHTML = ''
    if (contacts) {
        appendContactToParent(contacts, contactsDiv)
    }
}

const editContact = (id) => {
    const lightbox = document.getElementById('lightbox')
    const div = document.createElement('div')
    const oldContact = findContactById(id)[0]

    div.innerHTML = `
    <label for="edit-name">Name</label>
    <input type="text" id="edit-name" value="${oldContact.name}" required>
    <label for="edit-number">Number</label>
    <input type="number" id="edit-number" value="${oldContact.number}" required>
    <button onclick="save('${id}')">Edit</button>
    `
    div.classList.add('lightbox-inner')
    lightbox.appendChild(div)
    lightbox.classList.add('show')
}

const save = (id) => {
    const name = document.getElementById('edit-name').value
    const number = document.getElementById('edit-number').value

    deleteContact(id)
    addContactToLocal(id, name, number)
    generateContacts()

    document.getElementById('edit-name').value = ''
    document.getElementById('edit-number').value = ''
    lightbox.classList.remove('show')
    lightbox.innerHTML = ''
}

const deleteContact = (id) =>{
    removeContactFromLocal(id)
    generateContacts()
    searchDiv.innerHTML = ''
}

const addContactToLocal = (id, name, number) => {
    let contacts = getContacts() || []
    const newContact = {id: id, name, number}
    contacts.unshift(newContact)
    localStorage.setItem('contacts', JSON.stringify(contacts))
}

const removeContactFromLocal = (id) => {
    let contacts = getContacts()
    contacts = contacts.filter(contact => contact.id !== id)
    localStorage.setItem('contacts', JSON.stringify(contacts))
}

const findContactById = (id) => {
    let contacts = getContacts()
    return contacts = contacts.filter(contact => contact.id === id)
}

const getContacts = () => {
    return JSON.parse(localStorage.getItem('contacts'))
}

const generateId = () => {
    return 'id' + Math.random().toString(16).slice(2)
}

lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox){
        lightbox.classList.remove('show')
        lightbox.innerHTML = ''
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault()
    addContact()
    document.getElementById('search-div').innerHTML = ''
})

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    findContact()
})

generateContacts()
