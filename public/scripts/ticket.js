let ticket = JSON.parse(localStorage.getItem("ticket"))

console.log(ticket)

let date = new Date(ticket.created_at);
const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
};


function setColor(c) {
    document.getElementsByTagName('h2')[0].style.color = c;
    document.getElementsByTagName('h2')[1].style.color = c;
    document.getElementsByTagName('h2')[2].style.color = c;
}

let ticketContainer = document.getElementsByClassName('ticket')[0];

if (ticket.status == 'open') {
    ticketContainer.style.backgroundColor = "#f7e5e9"
    setColor('#fa808b')
}
if (ticket.status == 'pending') {
    ticketContainer.style.backgroundColor = "rgb(214, 235, 255)"
    setColor('#5aa2e7')
}
if (ticket.status == 'solved') {
    ticketContainer.style.backgroundColor = "rgb(231, 255, 235)"
    setColor('#4cb35d')
}

document.getElementById('no').innerHTML = "Ticket Number: " + ticket.id
document.getElementById('date').innerHTML = "Created at " + date.toLocaleDateString(undefined, options) + '<br> by ' + ticket.assignee_id
document.getElementById('status').innerHTML = "Status: " + ticket.status
document.getElementById('subject').innerHTML = ticket.subject
document.getElementById('desc').innerHTML = ticket.description