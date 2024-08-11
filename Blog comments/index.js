// create code to receive form data

const receiveComment = () => {
    const comment = document.getElementById('comment').value

    addCommentToStorage(comment)
}
// save comment to local storage
// clear form data
// generate comments from local storage on page

// comment should have a section with a form to reply on comment
// button to delete comment by id 
// comment should have attributes as id text and replied comments as object {}

const addCommentToStorage = (comment) => {
    const comments = getCommentsFromLocal()
    const newComment = {id: generateId(), comment, comments:{}}
}

const generateId = () => {
    return 'id' + Math.random().toString(16).slice(2)
}

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault()
    receiveComment()
})