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
const suits = ['Spades', 'Diamonds', 'Clubs', 'Hearts']
const deck = []

const playerHand = []
const dealerHand = []
const show = true
const hide = false

// getting the value of the cards
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
const shuffleDeck = () => {
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

// starts game and deals cards
const beginGame = () => {
  dealCard(deck, playerHand, '.playerHand', show)
  dealCard(deck, playerHand, '.playerHand', show)
  dealCard(deck, dealerHand, '.dealerHand', hide)
  dealCard(deck, dealerHand, '.dealerHand', hide)

  showSum(playerHand, '.playerSum')
}

// show the value of the players cards
const showSum = (hand, sumContainer) => {
  let playerSum = 0
  for (let i = 0; i < hand.length; i++) {
    playerSum += hand[i].value
    console.log(playerSum)
  }
  qs(sumContainer).textContent = playerSum
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
  qs(imageContainer).appendChild(cardLi)
}

// dealer plays his hand when player stands
const dealerPlays = () => {
  flipCard('.dealerHand')
  showSum(dealerHand, '.dealerSum')
  qs('.standButton').disabled = true
  qs('.hitButton').disabled = true
}

// dealer shows cards when player hits stand
const flipCard = (imageContainer) => {
  for (let i = 0; i < qs(imageContainer).children.length; i++) {
    const img = qs(imageContainer).children[i].children[0]
    const temp = img.src
    img.src = img.alt
    img.alt = temp
  }
}

const hitPlayer = () => {
  for (let i = 0; i < 1; i++) {
    const hitPlayerHand = deck.pop()
    playerHand.push(hitPlayerHand)
    const playerHandLiTwo = document.createElement('li')
    const imgTwo = document.createElement('img')
    imgTwo.src = './images/cards/' + hitPlayerHand.imageUrl
    playerHandLiTwo.appendChild(imgTwo)
    qs('.playerHand').appendChild(playerHandLiTwo)
    showSum(playerHand, '.playerSum')
  }
  if (playerHand > 21) {
    qs('.playerSum').textContent = 'BUSTS'
    qs('.dealerSum').textContent = 'WINS'
    qs('.hitButton').disabled = true
    qs('.dealerHitButton').disabled = true
    qs('.standButton').disabled = true
  } else if (playerHand === 20) {
    qs('.playerSum').textContent = 'WINS'
    qs('.dealerSum').textContent = 'BUSTS'
    qs('.hitButton').disabled = true
    qs('.standButton').disabled = true
  }
}

const hitDealer = () => {
  for (let i = 0; i < 1; i++) {
    const hitDealerHand = deck.pop()
    dealerHand.push(hitDealerHand)
    const dealerHandLiTwo = document.createElement('li')
    const imgTwo = document.createElement('img')
    imgTwo.src = './images/cards/' + hitDealerHand.imageUrl
    dealerHandLiTwo.appendChild(imgTwo)
    qs('.dealerHand').appendChild(dealerHandLiTwo)
    showSum(dealerHand, '.dealerSum')
  }
  if (dealerHand <= 17) {
    qs('.dealerHitButton').disabled = true
  }
  if (dealerHand > 21) {
    qs('.playerSum').textContent = 'WINS'
    qs('.dealerSum').textContent = 'BUSTS'
    qs('.hitButton').disabled = true
    qs('.standButton').disabled = true
    qs('.dealerHitButton').disabled = true
  } else if (dealerHand === 21) {
    qs('.playerSum').textContent = 'BUSTS'
    qs('.dealerSum').textContent = 'WINS'
    qs('.hitButton').disabled = true
    qs('.standButton').disabled = true
    qs('.dealerHitButton').disabled = true
  } else if (dealerHand > 21) {
    qs('.playerSum').textContent = 'WINS'
    qs('.dealerSum').textContent = 'BUSTS'
    qs('.hitButton').disabled = true
    qs('.standButton').disabled = true
    qs('.dealerHitButton').disabled = true
  } else if (dealerHand > playerHand) {
    qs('.playerSum').textContent = 'WINS'
    qs('.dealerSum').textContent = 'BUSTS'
    qs('.hitButton').disabled = true
    qs('.standButton').disabled = true
    qs('.dealerHitButton').disabled = true
  }
}

const resetGame = () => {
  location.reload()
}

document.addEventListener('DOMContentLoaded', shuffleDeck)
qs('.standButton').addEventListener('click', dealerPlays)
qs('.hitButton').addEventListener('click', hitPlayer)
qs('.dealerHitButton').addEventListener('click', hitDealer)
qs('.resetButton').addEventListener('click', resetGame)
