// Add Card Function
function addCard() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const userData = JSON.parse(localStorage.getItem(loggedInUser));

    const playerName = document.getElementById('playerName').value;
    const team = document.getElementById('team').value;
    const year = document.getElementById('year').value;
    const condition = document.getElementById('condition').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const cardBrand = document.getElementById('cardBrand').value;

    // Create a card object with the new fields
    const card = { playerName, team, year, condition, cardNumber, cardBrand };

    // Add card to user's collection and save back to localStorage
    userData.cards.push(card);
    localStorage.setItem(loggedInUser, JSON.stringify(userData));

    document.getElementById('cardForm').reset();
    displayCards();
}

// Display Cards Function
function displayCards() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const userData = JSON.parse(localStorage.getItem(loggedInUser));

    const cardsList = document.getElementById('cardsList');
    cardsList.innerHTML = '';  // Clear existing cards

    // Update card count in the dropdown
    const cardCount = userData.cards.length;
    document.getElementById('cardCount').textContent = `Cards: ${cardCount}`;

    // Display each card with additional fields
    userData.cards.forEach((card, index) => {
        const cardItem = document.createElement('li');
        cardItem.textContent = `${card.playerName} - ${card.team} - ${card.year} - ${card.condition} - Card #${card.cardNumber} - ${card.cardBrand}`;

        // Delete button for each card
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteCard(index);

        cardItem.appendChild(deleteButton);
        cardsList.appendChild(cardItem);
    });
}

// Function to sign up a new user
function signUp() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    if (localStorage.getItem(username)) {
        alert('Username already exists. Please choose a different username.');
        return;
    }

    // Save user data to localStorage
    const userData = { password: password, cards: [] };
    localStorage.setItem(username, JSON.stringify(userData));

    alert('Account created successfully! Please log in.');
    window.location.href = 'login.html';
}

// Function to log in
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const userData = JSON.parse(localStorage.getItem(username));

    if (userData && userData.password === password) {
        localStorage.setItem('loggedInUser', username);
        window.location.href = 'index.html';
    } else {
        alert('Incorrect username or password. Please try again.');
    }
}

// Function to check if a user is logged in
function checkLoginStatus() {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
        // Redirect to login page if not logged in
        window.location.href = 'login.html';
    }
}

// Function to log out
function logOut() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
}
