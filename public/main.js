// DONE: player gets card from shuffled deck
// DONE: dealer gets card from shuffled deck
// DONE: add up player card values
// DONE: add up dealer card values
// DONE: get card images to show up
// DONE: display player and dealer cards

// TODO: compare card values to see who won
// TODO: assign buttons for HIT STAND and RESET
// TODO: logic for dealer hitting or standing
// TODO: reset game button

// defining ranks
const ranks = [
  'Ace',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'Jack',
  'Queen',
  'King'
]

// defining suits
const suits = ['Spades', 'Diamonds', 'Clubs', 'Hearts']

const deck = []
const playerHand = []
const dealerHand = []
const show = true
const hide = false

// getting the value of the card
const getCardValue = (rank) => {
  if (rank === 'Ace') {
    return 11
  } else if (rank === 'King' || rank === 'Queen' || rank === 'Jack') {
    return 10
  } else {
    return parseInt(rank)
  }
}

// shuffling deck and getting card images for each
const main = () => {
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      const card = {
        rank: ranks[j],
        suit: suits[i],
        value: getCardValue(ranks[j]),
        imageUrl: ranks[j] + '_of_' + suits[i] + '.svg'
      }
      deck.push(card)
    }
  }
  for (let i = 0; i < deck.length; i++) {
    const j = Math.floor(Math.random() * 52)
    const temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }
  console.log(deck)
  beginGame()
}

// show the value of the players cards
const showSum = (hand, sumContainer) => {
  let playerSum = 0
  for (let i = 0; i < hand.length; i++) {
    playerSum += hand[i].value
  }
  document.querySelector(sumContainer).textContent = playerSum
}

// deals 2 cards face up for player and 2 face down for dealer
const dealCard = (deckFrom, handTo, imageContainer, showHide) => {
  handTo.push(deckFrom.pop())

  const cardLi = document.createElement('li')
  const img = document.createElement('img')
  if (showHide) {
    img.src = './images/cards/' + handTo[handTo.length - 1].imageUrl
    img.alt = './images/cards/card_back.svg'
  } else {
    img.alt = './images/cards/' + handTo[handTo.length - 1].imageUrl
    img.src = './images/cards/card_back.svg'
  }
  cardLi.appendChild(img)
  document.querySelector(imageContainer).appendChild(cardLi)
}

// dealer plays his hand when player stands
const dealerPlays = () => {
  flipCard('.dealerHand')
  showSum(dealerHand, '.dealerSum')
}

// dealer shows cards when player hits stand
const flipCard = (imageContainer) => {
  for (
    let i = 0;
    i < document.querySelector(imageContainer).children.length;
    i++
  ) {
    const img = document.querySelector(imageContainer).children[i].children[0]
    const temp = img.src
    img.src = img.alt
    img.alt = temp
  }
}

// starts game and shows player card values
const beginGame = () => {
  dealCard(deck, playerHand, '.playerHand', show)
  dealCard(deck, dealerHand, '.dealerHand', hide)
  dealCard(deck, playerHand, '.playerHand', show)
  dealCard(deck, dealerHand, '.dealerHand', hide)

  showSum(playerHand, '.playerSum')
}

document.addEventListener('DOMContentLoaded', main)

// dealer plays when player stands
document.querySelector('.standButton').addEventListener('click', dealerPlays)
