const allRooms = document.getElementById('rooms');
const createRoomForm = document.getElementById('create-room');
const hotel = JSON.parse(localStorage.getItem('hotel')) || [];
const bookRoomForm = document.getElementById('book-room');

createRoomForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const roomNumber = document.getElementById('room-number-input').value;
  const newRoom = new CreateRoom(roomNumber);
  hotel.push(newRoom);
  localStorage.setItem('hotel', JSON.stringify(hotel));
  document.getElementById('room-number-input').value = '';
  console.log(newRoom);
})

bookRoomForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const visitor = document.getElementById('visitor').value;
  const roomN = document.getElementById('book-room-input').value;
  const roomToBook = hotel.filter(obj => obj.number == roomN);
  const allOtherRooms = hotel.filter(obj => obj.number != roomN);

  BookRoom.call(roomToBook[0], visitor);
  allOtherRooms.push(roomToBook[0]);
  localStorage.setItem('hotel', JSON.stringify(allOtherRooms));

  document.getElementById('book-room-input').value = '';
  document.getElementById('visitor').value = '';
  console.log('room is booked');
})

document.getElementById('show-info').addEventListener('click', ()=>{
  let info = JSON.parse(localStorage.getItem('hotel'));
  let bookedRooms = info.filter(room => room.isBooked);
  console.log(bookedRooms);
})

function CreateRoom (number){
  this.number = number;
  this.name = `room${number}`;
  this.isBooked = false;
  this.visitor = '';

};

function BookRoom (visitor) {
  this.isBooked = true;
  this.visitor = visitor;
};
