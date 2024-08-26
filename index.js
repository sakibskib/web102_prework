// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // Loop over each game object in the array
    for (let i = 0; i < games.length; i++) {
        const game = games[i];

        // Create a new div element, which will become the game card
        const gameCard = document.createElement('div');

        // Add the class 'game-card' to the div's class list
        gameCard.classList.add('game-card');

        // Set the inner HTML using a template literal to display some info about each game
        gameCard.innerHTML = `
            <img src="${game.image}" alt="${game.name}" class="game-img" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Goal: $${game.goal.toLocaleString()}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
        `;

        // Append the game card to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// Wait until the DOM is fully loaded to execute the code
document.addEventListener('DOMContentLoaded', () => {
    // Call the function using GAMES_JSON to add games to the page
    addGamesToPage(GAMES_JSON);

    // Calculate and display the total number of contributions
    const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
    const contributionsCard = document.getElementById("num-contributions");
    contributionsCard.innerHTML = totalContributions.toLocaleString();

    // Calculate and display the total amount raised
    const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
    const raisedCard = document.getElementById("total-raised");
    raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

    // Display the total number of games
    const totalGames = GAMES_JSON.length;
    const gamesCard = document.getElementById("num-games");
    gamesCard.innerHTML = totalGames.toLocaleString();

    // Calculate the number of unfunded games
    const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

    // Create a template string using the ternary operator
    const unfundedGamesString = `
        A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} ${totalGames === 1 ? 'game' : 'games'}. 
        Currently, ${unfundedGamesCount} ${unfundedGamesCount === 1 ? 'game remains' : 'games remain'} unfunded. 
        We need your help to fund these amazing games!
    `;

    // Create a new paragraph element and add it to the descriptionContainer
    const descriptionContainer = document.getElementById("description-container");
    const unfundedGamesParagraph = document.createElement('p');
    unfundedGamesParagraph.innerHTML = unfundedGamesString;
    descriptionContainer.appendChild(unfundedGamesParagraph);

    // Calculate the top two most funded games
    const sortedGames = GAMES_JSON.sort((a, b) => b.pledged - a.pledged);
    const [topGame, secondGame, ...rest] = sortedGames;

    // Grab the containers for displaying the top games
    const firstGameContainer = document.getElementById("first-game");
    const secondGameContainer = document.getElementById("second-game");

    // Create elements to display the top game names
    const topGameElement = document.createElement('h4');
    topGameElement.textContent = topGame.name;
    firstGameContainer.appendChild(topGameElement);

    const secondGameElement = document.createElement('h4');
    secondGameElement.textContent = secondGame.name;
    secondGameContainer.appendChild(secondGameElement);
});

// Functions for filtering and other operations

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    console.log("Unfunded Games:", unfundedGames.length);

    addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    console.log("Funded Games:", fundedGames.length);

    addGamesToPage(fundedGames);
}

function showAllGames() {
    deleteChildElements(gamesContainer);

    addGamesToPage(GAMES_JSON);
}

// Add event listeners to buttons
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener('click', filterUnfundedOnly);

const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener('click', filterFundedOnly);

const allBtn = document.getElementById("all-btn");
allBtn.addEventListener('click', showAllGames);

// Implement the search function (optional bonus feature)
function searchGames() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const filteredGames = GAMES_JSON.filter(game => game.name.toLowerCase().includes(query));

    deleteChildElements(gamesContainer);
    addGamesToPage(filteredGames);
}


// /*****************************************************************************
//  * Challenge 2: Review the provided code. The provided code includes:
//  * -> Statements that import data from games.js
//  * -> A function that deletes all child elements from a parent element in the DOM
// */

// // import the JSON data about the crowd funded games from the games.js file
// import GAMES_DATA from './games.js';

// // create a list of objects to store the data about the games using JSON.parse
// const GAMES_JSON = JSON.parse(GAMES_DATA)

// // remove all child elements from a parent element in the DOM
// function deleteChildElements(parent) {
//     while (parent.firstChild) {
//         parent.removeChild(parent.firstChild);
//     }
// }

// /*****************************************************************************
//  * Challenge 3: Add data about each game as a card to the games-container
//  * Skills used: DOM manipulation, for loops, template literals, functions
// */

// // grab the element with the id games-container
// function addGamesToPage(games) {
//     // Loop over each game object in the array
//     for (let i = 0; i < games.length; i++) {
//         const game = games[i];

//         // Create a new div element, which will become the game card
//         const gameCard = document.createElement('div');

//         // Add the class 'game-card' to the div's class list
//         gameCard.classList.add('game-card');

//         // Set the inner HTML using a template literal to display some info about each game
//         gameCard.innerHTML = `
//             <img src="${game.image}" alt="${game.name}" class="game-img" />
//             <h3>${game.name}</h3>
//             <p>${game.description}</p>
//             <p>Goal: $${game.goal.toLocaleString()}</p>
//             <p>Pledged: $${game.pledged.toLocaleString()}</p>
//         `;

//         // Append the game card to the games-container
//         gamesContainer.appendChild(gameCard);
//     }
// }

// // Call the function using GAMES_JSON
// addGamesToPage(GAMES_JSON);


// // Call the function using GAMES_JSON
// addGamesToPage(GAMES_JSON);


// // Call the function using GAMES_JSON
// addGamesToPage(GAMES_JSON);
// // later, we'll call this function using a different list of games


// /*************************************************************************************
//  * Challenge 4: Create the summary statistics at the top of the page displaying the
//  * total number of contributions, amount donated, and number of games on the site.
//  * Skills used: arrow functions, reduce, template literals
// */

// // grab the contributions card element
// const contributionsCard = document.getElementById("num-contributions");

// // use reduce() to count the number of total contributions by summing the backers
// // Calculate the total number of contributions
// const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

// // Display the result in the contributionsCard
// contributionsCard.innerHTML = totalContributions.toLocaleString();


// // set the inner HTML using a template literal and toLocaleString to get a number with commas


// // grab the amount raised card, then use reduce() to find the total amount raised
// const raisedCard = document.getElementById("total-raised");

// // set inner HTML using template literal
// // Calculate the total amount raised
// const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// // Display the result in the raisedCard
// raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;


// // grab number of games card and set its inner HTML
// const gamesCard = document.getElementById("num-games");
// // Display the total number of games
// const totalGames = GAMES_JSON.length;
// gamesCard.innerHTML = totalGames.toLocaleString();


// /*************************************************************************************
//  * Challenge 5: Add functions to filter the funded and unfunded games
//  * total number of contributions, amount donated, and number of games on the site.
//  * Skills used: functions, filter
// */

// // show only games that do not yet have enough funding
// function filterUnfundedOnly() {
//     deleteChildElements(gamesContainer);

//     // use filter() to get a list of games that have not yet met their goal


//     // use the function we previously created to add the unfunded games to the DOM

// }

// // show only games that are fully funded
// function filterFundedOnly() {
//     deleteChildElements(gamesContainer);

//     // use filter() to get a list of games that have met or exceeded their goal


//     // use the function we previously created to add unfunded games to the DOM

// }

// // show all games
// function showAllGames() {
//     deleteChildElements(gamesContainer);

//     // add all games from the JSON data to the DOM

// }

// // select each button in the "Our Games" section
// const unfundedBtn = document.getElementById("unfunded-btn");
// const fundedBtn = document.getElementById("funded-btn");
// const allBtn = document.getElementById("all-btn");

// // add event listeners with the correct functions to each button


// /*************************************************************************************
//  * Challenge 6: Add more information at the top of the page about the company.
//  * Skills used: template literals, ternary operator
// */

// // grab the description container
// const descriptionContainer = document.getElementById("description-container");

// // use filter or reduce to count the number of unfunded games


// // create a string that explains the number of unfunded games using the ternary operator


// // create a new DOM element containing the template string and append it to the description container

// /************************************************************************************
//  * Challenge 7: Select & display the top 2 games
//  * Skills used: spread operator, destructuring, template literals, sort 
//  */

// const firstGameContainer = document.getElementById("first-game");
// const secondGameContainer = document.getElementById("second-game");

// const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
//     return item2.pledged - item1.pledged;
// });

// // use destructuring and the spread operator to grab the first and second games

// // create a new element to hold the name of the top pledge game, then append it to the correct element

// // do the same for the runner up item