// Predefined admin credentials
const adminCredentials = {
    username: 'admin',
    password: 'admin123'
};

// Bets array to store placed bets
const bets = [];

// Event listener for the login form submission
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check credentials
    if (username === adminCredentials.username && password === adminCredentials.password) {
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        // Show error message
        document.getElementById('message').innerText = 'Invalid username or password';
    }
});

// Event listener for the bet form submission
document.getElementById('betForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const racecourse = document.getElementById('racecourse').value; // Get manually entered racecourse
    const horseNumber = document.getElementById('horseNumber').value;
    const betAmount = parseFloat(document.getElementById('betAmount').value).toFixed(2); // Format to 2 decimal places
    const betTypes = Array.from(document.querySelectorAll('input[name="betType"]:checked')) // Get selected bet types
        .map(checkbox => checkbox.value);

    // Store the bet for each selected bet type
    betTypes.forEach(betType => {
        bets.push({ racecourse, horseNumber, betAmount, betType });
    });

    // Calculate total bet amount if both win and place are selected
    let totalBetAmount = parseFloat(betAmount);
    if (betTypes.includes('win') && betTypes.includes('place')) {
        totalBetAmount *= 2; // Double the amount if betting on both
    }
    totalBetAmount = totalBetAmount.toFixed(2); // Format to 2 decimal places

document.getElementById('betForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const racecourse = document.getElementById('racecourse').value;
    const horseNumber = document.getElementById('horseNumber').value;
    const betAmount = parseFloat(document.getElementById('betAmount').value).toFixed(2);
    const betTypes = Array.from(document.querySelectorAll('input[name="betType"]:checked')).map(checkbox => checkbox.value);

    const betData = {
        racecourse,
        horseNumber,
        betAmount,
        betType: betTypes,
        dateTime: new Date().toLocaleString()
    };

    const bets = JSON.parse(localStorage.getItem('bets')) || [];
    bets.push(betData);
    localStorage.setItem('bets', JSON.stringify(bets));

    document.getElementById('betMessage').innerText = `Bet placed: $${betAmount} on Horse #${horseNumber} at ${racecourse}.`;
    document.getElementById('betForm').reset();
});



    // Show confirmation message
    const types = betTypes.join(" and ");
    const message = `Bet placed: $${betAmount} on Horse #${horseNumber} at ${racecourse} for ${types}. Total: $${totalBetAmount}`;
    document.getElementById('betMessage').innerText = message;

    // Show print button
    document.getElementById('printButton').style.display = 'block';

    // Add print functionality
    document.getElementById('printButton').onclick = function() {
        const printWindow = window.open('', '', 'height=400,width=600');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Bet Confirmation</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                            background-color: #f8f8f8;
                        }
                        h2 {
                            text-align: center;
                            color: #333;
                        }
                        p {
                            font-size: 18px;
                            margin: 10px 0;
                        }
                        .summary {
                            border: 1px solid #ccc;
                            padding: 15px;
                            border-radius: 5px;
                            background-color: #fff;
                        }
                        .summary p {
                            margin: 5px 0;
                        }
                    </style>
                </head>
                <body>
                    <h2>Bet Confirmation</h2>
                    <div class="summary">
                        <p><strong>Racecourse:</strong> ${racecourse}</p>
                        <p><strong>Horse Number:</strong> #${horseNumber}</p>
                        <p><strong>Bet Amount:</strong> $${betAmount}</p>
                        <p><strong>Bet Type:</strong> ${types}</p>
                        <p><strong>Total Bet Amount:</strong> $${totalBetAmount}</p>
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    // Clear input fields
    document.getElementById('racecourse').value = ''; // Reset the racecourse input
    document.getElementById('horseNumber').value = '';
    document.getElementById('betAmount').value = '';
    document.querySelectorAll('input[name="betType"]:checked').forEach(checkbox => {
        checkbox.checked = false; // Deselect checkboxes
    });
});


// Log bets to the console for verification (optional)
console.log(bets);
