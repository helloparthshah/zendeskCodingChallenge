let page = 1;
let nextPage = null
let prevPage = null
getTickets(page);

function cngPage(n) {
    if (nextPage == null && n == 1)
        return;
    if (prevPage == null && n == -1)
        return;
    page += n;
    document.getElementById('page').innerHTML = page;
    getTickets(page);

}

function createDiv(ticket) {
    const newDiv = document.createElement("div");
    newDiv.classList += "ticket ";
    newDiv.classList += "clickable";
    newDiv.onclick = function () {
        localStorage.setItem("ticket", JSON.stringify(ticket))
        window.open("/ticket", "_self")
        // alert(ticket)
    }
    if (ticket.status == 'open')
        newDiv.style.backgroundColor = "#ED9998"
    if (ticket.status == 'pending')
        newDiv.style.backgroundColor = "#A7C7E7"
    if (ticket.status == 'solved')
        newDiv.style.backgroundColor = "#D5FFDD"
    newDiv.innerHTML = ticket.subject;
    return newDiv;
}

function getTickets(pg) {
    document.getElementById('ticketList').innerHTML = ""
    fetch(`/tickets?page=${pg}&per_page=25`)
        .then((response) => {
            if (!response.ok) {
                const newDiv = document.createElement("div");
                newDiv.classList += "ticket";
                newDiv.innerHTML = "Sorry, unable to fetch tickets at this time. " + response.statusText
                document.getElementById('ticketList').appendChild(newDiv)
                return
            }
            response.json().then(data => {
                document.getElementById('count').innerHTML = "Displaying " + ((page - 1) * 25 + 1) + "-" + (page * 25 > data.count ? data.count : page * 25) + " tickets out of " + data.count;
                nextPage = data.next_page
                prevPage = data.previous_page
                for (let ticket in data.tickets)
                    document.getElementById('ticketList').appendChild(createDiv(data.tickets[ticket]));
            })
        }).catch(() => {
            const newDiv = document.createElement("div");
            newDiv.classList += "ticket";
            newDiv.innerHTML = "Sorry, unable to fetch tickets at this time. "
            document.getElementById('ticketList').appendChild(newDiv)
        })
}