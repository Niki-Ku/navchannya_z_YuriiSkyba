const form = document.getElementById('form')
const searchForm = document.getElementById('search-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    addContact()
    document.getElementById('search-div').innerHTML = ''
})

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    findContact()
})

const getContacts = () => {
    return JSON.parse(localStorage.getItem('contacts'))
}

const findContact = () => {
    const val = document.getElementById('search-input').value
    const searchDiv = document.getElementById('search-div')
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
        `
        div.addEventListener('click', (e) => {
            console.log(e.target.id)
        }, true)
        parent.appendChild(div)
    })
}

const addContact = () => {
    const name = document.getElementById('name').value
    const number = document.getElementById('number').value
    let contacts = getContacts() || []
    const contact = {id: generateId(), name, number}
    contacts.unshift(contact)
    localStorage.setItem('contacts', JSON.stringify(contacts))
    document.getElementById('name').value = ''
    document.getElementById('number').value = ''
    generateContacts()
}

const generateContacts = () => {
    const contactsDiv = document.getElementById('contact')
    contactsDiv.innerHTML = ''
    const contacts = getContacts()
    if (contacts) {
        appendContactToParent(contacts, contactsDiv)
    }
}

generateContacts()

const deleteContact = (id) =>{
    let contacts = getContacts()
    contacts = contacts.filter(contact => contact.id !== id)
    localStorage.setItem('contacts', JSON.stringify(contacts))
    generateContacts()
    findContact()
}



const generateId = () => {
    return 'id' + Math.random().toString(16).slice(2)
}