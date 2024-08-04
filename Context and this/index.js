// const allRooms = document.getElementById('rooms');
// const createRoomForm = document.getElementById('create-room');
// const hotel = JSON.parse(localStorage.getItem('hotel')) || [];
// const bookRoomForm = document.getElementById('book-room');

// createRoomForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const roomNumber = document.getElementById('room-number-input').value;
//   const newRoom = new CreateRoom(roomNumber);
//   hotel.push(newRoom);
//   localStorage.setItem('hotel', JSON.stringify(hotel));
//   document.getElementById('room-number-input').value = '';
//   console.log(newRoom);
// })

// bookRoomForm.addEventListener('submit', (e)=>{
//   e.preventDefault();
//   const visitor = document.getElementById('visitor').value;
//   const roomN = document.getElementById('book-room-input').value;
//   const roomToBook = hotel.filter(obj => obj.number == roomN);
//   const allOtherRooms = hotel.filter(obj => obj.number != roomN);

//   BookRoom.call(roomToBook[0], visitor);
//   allOtherRooms.push(roomToBook[0]);
//   localStorage.setItem('hotel', JSON.stringify(allOtherRooms));

//   document.getElementById('book-room-input').value = '';
//   document.getElementById('visitor').value = '';
//   console.log('room is booked');
// })

// document.getElementById('show-info').addEventListener('click', ()=>{
//   let info = JSON.parse(localStorage.getItem('hotel'));
//   let bookedRooms = info.filter(room => room.isBooked);
//   console.log(bookedRooms);
// })

// function CreateRoom (number){
//   this.number = number;
//   this.name = `room${number}`;
//   this.isBooked = false;
//   this.visitor = '';

// };

// function BookRoom (visitor) {
//   this.isBooked = true;
//   this.visitor = visitor;
// };


class Room {
  constructor(number) {
    this.number = number;
    this.name = `room${number}`;
    this.isBooked = false;
    this.visitor = '';
  }

  book(visitor) {
    if (!this.isBooked) {
      this.isBooked = true;
      this.visitor = visitor;
    } else {
      console.error(`Room ${this.number} is already booked.`);
    }
  }
}

function initializeHotelFromStorage() {
  const storedHotel = localStorage.getItem('hotel');
  if (storedHotel) {
    try {
      const parsedHotel = JSON.parse(storedHotel);
      return new Map(parsedHotel.map(([key, value]) => [key, Object.assign(new Room(), value)]));
    } catch (error) {
      console.error('Failed to parse hotel data:', error);
    }
  }
  return new Map(); 
}

const hotel = initializeHotelFromStorage();

document.getElementById('create-room').addEventListener('submit', (e) => {
  e.preventDefault();
  const roomNumber = document.getElementById('room-number-input').value;
  if (!hotel.has(roomNumber)) {
    const newRoom = new Room(roomNumber);
    hotel.set(roomNumber, newRoom);
    localStorage.setItem('hotel', JSON.stringify(Array.from(hotel.entries())));
    document.getElementById('room-number-input').value = '';
    console.log(`Room ${roomNumber} created:`, newRoom);
  } else {
    console.log(`Room ${roomNumber} already exists.`);
  }
});

document.getElementById('book-room').addEventListener('submit', (e) => {
  e.preventDefault();
  const visitor = document.getElementById('visitor').value;
  const roomNumber = document.getElementById('book-room-input').value;
  if (hotel.has(roomNumber)) {
    hotel.get(roomNumber).book(visitor);
    localStorage.setItem('hotel', JSON.stringify(Array.from(hotel.entries())));
    document.getElementById('book-room-input').value = '';
    document.getElementById('visitor').value = '';
    console.log(`Room ${roomNumber} is booked for ${visitor}`);
  } else {
    console.log(`Room ${roomNumber} does not exist.`);
  }
});

document.getElementById('show-info').addEventListener('click', () => {
  let info = Array.from(hotel.values());
  console.log('Current hotel state:', info);
});


// .has   .set    Map   Class .assign