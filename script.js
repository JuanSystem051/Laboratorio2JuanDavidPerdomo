const eventForm = document.getElementById('event-form');
const eventTitle = document.getElementById('event-title');
const eventDate = document.getElementById('event-date');
const eventsList = document.getElementById('events-list');
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search-button');
const deleteAllButton = document.getElementById('delete-all');

let events = JSON.parse(localStorage.getItem('events')) || [];

function displayEvents(filteredEvents = events) {
    eventsList.innerHTML = '';
    filteredEvents.forEach((event, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${event.title} - ${event.date}</span>
            <button onclick="deleteEvent(${index})">Eliminar</button>
        `;
        eventsList.appendChild(li);
    });
}

function addEvent(event) {
    event.preventDefault();
    const title = eventTitle.value.trim();
    const date = eventDate.value;
    
    if (title === '' || date === '') {
        alert('Por favor, completa todos los campos');
        return;
    }

    events.push({ title, date });

    localStorage.setItem('events', JSON.stringify(events));

    eventForm.reset();

    displayEvents();
}

function deleteEvent(index) {
    events.splice(index, 1);
    localStorage.setItem('events', JSON.stringify(events));
    displayEvents();
}

function deleteAllEvents() {
    if (confirm('¿Estás seguro de que deseas eliminar todos los eventos?')) {
        events = []; 
        localStorage.setItem('events', JSON.stringify(events)); 
        displayEvents();
    }
}

function filterEvents() {
    const query = searchInput.value.toLowerCase();
    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(query) || event.date.includes(query)
    );

    displayEvents(filteredEvents);
}

eventForm.addEventListener('submit', addEvent);

searchButton.addEventListener('click', filterEvents);

deleteAllButton.addEventListener('click', deleteAllEvents);

window.addEventListener('load', displayEvents);