window.onload = function() {
    const betsTableBody = document.getElementById('betsTable').getElementsByTagName('tbody')[0];
    
    const bets = JSON.parse(localStorage.getItem('bets')) || [];

    // Check if there are no bets
    if (bets.length === 0) {
        const row = betsTableBody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 5;
        cell.innerText = "No bets placed yet.";
        return;
    }

    bets.forEach(bet => {
        const row = betsTableBody.insertRow();
        row.insertCell(0).innerText = bet.racecourse;
        row.insertCell(1).innerText = bet.horseNumber;
        row.insertCell(2).innerText = `$${parseFloat(bet.betAmount).toFixed(2)}`;
        row.insertCell(3).innerText = bet.betType.join(", ");
        row.insertCell(4).innerText = bet.dateTime;
    });
};

