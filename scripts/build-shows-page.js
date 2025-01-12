buyTicketButton1 = document.getElementById('buy-ticket-form-1');
buyTicketButton2 = document.getElementById('buy-ticket-form-2');
buyTicketButton3 = document.getElementById('buy-ticket-form-3');
buyTicketButton4 = document.getElementById('buy-ticket-form-4');
buyTicketButton5 = document.getElementById('buy-ticket-form-5');
buyTicketButton6 = document.getElementById('buy-ticket-form-6');

function buyTicket(event) {
    event.preventDefault();
}

buyTicketButton1.addEventListener('submit', buyTicket);
buyTicketButton2.addEventListener('submit', buyTicket);
buyTicketButton3.addEventListener('submit', buyTicket);
buyTicketButton4.addEventListener('submit', buyTicket);
buyTicketButton5.addEventListener('submit', buyTicket);
buyTicketButton6.addEventListener('submit', buyTicket);