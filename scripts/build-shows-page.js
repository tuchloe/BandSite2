const concertsContainer = document.getElementById('concerts-container');
const api = new BandSiteApi(API_KEY); 

function renderConcertTable(concerts) {
  concertsContainer.innerHTML = '';
  const table = document.createElement('table');
  table.classList.add('concert-table');

  const headerRow = document.createElement('tr');
  const headers = ['Date', 'Venue', 'Location', ' '];
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  concerts.forEach(concert => {
    const row = document.createElement('tr');
    
    const dateCell = document.createElement('td');
    dateCell.textContent = concert.date;
    row.appendChild(dateCell);

    const venueCell = document.createElement('td');
    venueCell.textContent = concert.venue;
    row.appendChild(venueCell);

    const locationCell = document.createElement('td');
    locationCell.textContent = `${concert.city}, ${concert.country}`;
    row.appendChild(locationCell);

    const actionCell = document.createElement('td');
    const button = document.createElement('button');
    button.textContent = 'BUY TICKETS';
    button.classList.add('buy-button');
    button.addEventListener('click', () => handleConcertClick(row));
    actionCell.appendChild(button);
    row.appendChild(actionCell);

    table.appendChild(row);
  });

  concertsContainer.appendChild(table);
}

function handleConcertClick(selectedRow) {
  const allRows = document.querySelectorAll('.concert-table tr');
  allRows.forEach(row => row.classList.remove('selected'));
  selectedRow.classList.add('selected');
}

async function loadConcerts() {
  try {
    const concerts = await api.getShows();
    renderConcertTable(concerts);
  } catch (error) {
    console.error('Error loading concerts:', error);
  }
}

window.onload = function() {
  loadConcerts();
};



