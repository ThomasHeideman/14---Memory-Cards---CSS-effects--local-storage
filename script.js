'use strict';
const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const anwserEl = document.getElementById('anwser');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

//  Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

//Store card Data
const cardsData = getCardsData();

// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _',
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data',
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable',
//   },
// ];

// create all cards

function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}
//create single card in the DOM
function createCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');
  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
        <div class="inner-card">
          <div class="inner-card-front">
            <div class="inner-card-header">
                <h2>Question</h2>
            </div>
            <div class="inner-card-body">
                <p>${data.question} </p>
            </div>
          </div>
          <div class="inner-card-back">
            <div class="inner-card-header">
                <h2>Anwser</h2>
            </div>
            <div class="inner-card-body">
             <p>${data.anwser}</p>
            </div>
          </div>
        </div>
  `;

  card.addEventListener('click', () => card.classList.toggle('show-anwser'));

  cardsContainer.appendChild(card);

  //add to DOM cards
  cardsEl.push(card);

  updateCurrentText();
}

// show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`;
}

// get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// add Cards to local storage
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}
createCards();

// event listeners

// next Button
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard = currentActiveCard + 1;
  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
});
//prev Button
prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card';
  currentActiveCard = currentActiveCard - 1;
  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }
  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
});

// show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));
// hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// add new card
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const anwser = anwserEl.value;

  if (question.trim() && anwser.trim()) {
    const newCard = { question, anwser };
    createCard(newCard);
    questionEl.value = '';
    anwserEl.value = '';

    addContainer.classList.remove('show');
    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

// clear cards button
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  window.location.reload();
});
