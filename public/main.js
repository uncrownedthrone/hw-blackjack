// DONE: player gets card from shuffled deck
// DONE: dealer gets card from shuffled deck
// DONE: add up player card values
// DONE: add up dealer card values

// TODO: compare card values to see who won
// TODO: assign buttons for HIT STAND and RESET
// TODO: logic for dealer hitting or standing
// TODO: display player and dealer cards
// TODO: reset game button

const qs = (e) => document.querySelector(e)

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
const suits = ['Hearts', 'Clubs', 'Spades', 'Diamonds']

const deck = []
const dealer = []
const player = []
let playerOneTotal = 0
let playerTwoTotal = 0

// get card value
const getCardValue = (rank) => {
  if (rank === 'Ace') {
    return 11
  } else if (rank === 'King' || rank === 'Queen' || rank === 'Jack') {
    return 10
  } else {
    return parseInt(rank)
  }
}

// shuffles deck
const createShuffleDeck = () => {
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      const card = {
        rank: ranks[j],
        suit: suits[i],
        value: getCardValue(ranks[j])
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
}

// deals player and dealer cards
const deal = (key) => {
  for (let i = 0; i < 2; i++) {
    const topCard = deck.pop()
    key.push(topCard)
  }
  console.log(player, 'playerHand')
  console.log(dealer, 'dealerHand')
}

// get value of player and dealer hands
// make sure hit value adds to total as cards are added
const getValueOfAllCards = () => {
  let valueOfPlayersHand = 0
  player.forEach((card) => {
    valueOfPlayersHand = valueOfPlayersHand + card.value
  })
  let valueOfDealersHand = 0
  dealer.forEach((card) => {
    valueOfDealersHand = valueOfDealersHand + card.value
  })
  // return valueOfPlayersHand
  console.log(valueOfDealersHand)
  // return valueOfPlayersHand
  console.log(valueOfPlayersHand)
}

// hit and stand buttons
const hitButton = () => {
  const hitCard = deck.pop()
  player.push(hitCard)
  console.log(player, 'playerHandAfterHit')
}

const main = () => {
  createShuffleDeck()
  deal(player)
  deal(dealer)
  getValueOfAllCards()
}

document.addEventListener('DOMContentLoaded', main)
// ask mark
qs('.playerHit').addEventListener('click')
