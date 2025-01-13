// buyTicketButton1 = document.getElementById('buy-ticket-form-1');
// buyTicketButton2 = document.getElementById('buy-ticket-form-2');
// buyTicketButton3 = document.getElementById('buy-ticket-form-3');
// buyTicketButton4 = document.getElementById('buy-ticket-form-4');
// buyTicketButton5 = document.getElementById('buy-ticket-form-5');
// buyTicketButton6 = document.getElementById('buy-ticket-form-6');

// buyTicketButton1.addEventListener('submit', buyTicket);
// buyTicketButton2.addEventListener('submit', buyTicket);
// buyTicketButton3.addEventListener('submit', buyTicket);
// buyTicketButton4.addEventListener('submit', buyTicket);
// buyTicketButton5.addEventListener('submit', buyTicket);
// buyTicketButton6.addEventListener('submit', buyTicket);

const buyTicketFormCl = 'shows__buy-ticket-form';
const showsLabelCl = 'shows__label';
const showInfoBoldTextCl = 'shows__show-info-text-bold';
const showInfoTextCl = 'shows__show-info-text';
const buyTicketButtonCl = 'shows__buy-ticket-button';
const horizontalLineClass = 'shows__horizontal-line'; 


const shows = [
    {
        date: 'Mon Sept 09 2024',
        venue: 'Ronald Lane',
        location: 'San Francisco, CA'
    },

    {
        date: 'Tue Sept 17 2024',
        venue: 'Pier 3 East',
        location: 'San Francisco, CA'
    },

    {
        date: 'Sat Oct 12 2024',
        venue: 'View Lounge',
        location: 'San Francisco, CA'
    },

    {
        date: 'Sat Nov 16 2024',
        venue: 'Hyatt Agency',
        location: 'San Francisco, CA'
    },
    
    {
        date: 'Fri Nov 29 2024',
        venue: 'Mascow Center',
        location: 'San Francisco, CA'
    },

    {
        date: 'Wed Dec 18 2024',
        venue: 'Press Club',
        location: 'San Francisco, CA'
    }
];

function buyTicket(event) {
    event.preventDefault();
}

function createShowForm(date, venue, location) {
    const showForm = document.createElement('form');
    const dateLabel = document.createElement('label');
    const dateEL = document.createElement('span');
    const venueLabel = document.createElement('label');
    const venueEL = document.createElement('span');
    const locationLabel = document.createElement('label');
    const locationEL = document.createElement('span');
    const buyTicketButton = document.createElement('button');

    showForm.classList.add(buyTicketFormCl);
    dateLabel.classList.add(showsLabelCl);
    dateEL.classList.add(showInfoBoldTextCl);
    venueLabel.classList.add(showsLabelCl);
    venueEL.classList.add(showInfoTextCl);
    locationLabel.classList.add(showsLabelCl);
    locationEL.classList.add(showInfoTextCl);
    buyTicketButton.classList.add(buyTicketButtonCl);

    dateLabel.textContent = 'DATE';
    dateEL.textContent = date;
    venueLabel.textContent = 'VENUE';
    venueEL.textContent = venue;
    locationLabel.textContent = 'LOCATION';
    locationEL.textContent = location;
    buyTicketButton.textContent = 'BUY TICKETS';
    buyTicketButton.type = 'submit';
    buyTicketButton.addEventListener('click', buyTicket);

    showForm.appendChild(dateLabel);
    showForm.appendChild(dateEL);
    showForm.appendChild(venueLabel);
    showForm.appendChild(venueEL);
    showForm.appendChild(locationLabel);
    showForm.appendChild(locationEL);
    showForm.appendChild(buyTicketButton);

    return showForm;
}

function renderShows() {
    const showsEl = document.getElementById('shows-table');

    for(let show of shows) {
        showsEl.appendChild(createShowForm(show.date, show.venue, show.location));
        const horizontalLine = document.createElement('div');
        horizontalLine.classList.add(horizontalLineClass);
        showsEl.appendChild(horizontalLine);
    }
}

renderShows();