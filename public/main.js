// DONE: player gets card from shuffled deck
// DONE: dealer gets card from shuffled deck
// TODO: DISPLAY: player and dealer cards

// TODO: add up player card values
// TODO: add up dealer card values

// TODO: compare card values to see who won
// TODO: assign buttons for HIT STAND and RESET
// TODO: logic for dealer hitting or standing
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

const main = () => {
  createShuffleDeck()
  deal(player)
  deal(dealer)
}

document.addEventListener('DOMContentLoaded', main)
