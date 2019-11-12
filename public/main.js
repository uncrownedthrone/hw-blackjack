const qs = e => document.querySelector(e);

const ranks = [
  "Ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King"
];
const suits = ["Spades", "Diamonds", "Clubs", "Hearts"];

const deck = [];
const playerHand = [];
const dealerHand = [];

const show = true;
const hide = false;

const getCardValue = rank => {
  if (rank === "Ace") {
    return 11;
  } else if (rank === "King" || rank === "Queen" || rank === "Jack") {
    return 10;
  } else {
    return parseInt(rank);
  }
};

const shuffleDeck = () => {
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      const card = {
        rank: ranks[j],
        suit: suits[i],
        value: getCardValue(ranks[j]),
        imageUrl: ranks[j] + "_of_" + suits[i] + ".svg"
      };
      deck.push(card);
    }
  }
  for (let i = 0; i < deck.length; i++) {
    const j = Math.floor(Math.random() * 52);
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  console.log(deck);
  beginGame();
};

const dealCard = (deckFrom, handTo, imageContainer, showHide) => {
  handTo.push(deckFrom.pop());

  const cardLi = document.createElement("li");
  const img = document.createElement("img");
  if (showHide) {
    img.src = "./images/cards/" + handTo[handTo.length - 1].imageUrl;
    img.alt = "./images/cards/card_back.svg";
  } else {
    img.alt = "./images/cards/" + handTo[handTo.length - 1].imageUrl;
    img.src = "./images/cards/card_back.svg";
  }
  cardLi.appendChild(img);

  qs(imageContainer).appendChild(cardLi);
};

const showSum = (hand, sumContainer) => {
  let playerSum = 0;
  for (let i = 0; i < hand.length; i++) {
    playerSum += hand[i].value;
  }
  qs(sumContainer).textContent = playerSum;
  return playerSum;
};

const dealerPlays = () => {
  flipCard(".dealerHand");
  while (showSum(dealerHand, ".dealerSum") < 17) {
    dealCard(deck, dealerHand, ".dealerHand", show);
  }
  checkScore();
  qs(".hitButton").disabled = true;
  qs(".standButton").disabled = true;
};

const flipCard = imageContainer => {
  for (let i = 0; i < qs(imageContainer).children.length; i++) {
    const img = qs(imageContainer).children[i].children[0];
    const temp = img.src;
    img.src = img.alt;
    img.alt = temp;
  }
};

const beginGame = () => {
  dealCard(deck, playerHand, ".playerHand", show);
  dealCard(deck, dealerHand, ".dealerHand", hide);
  dealCard(deck, playerHand, ".playerHand", show);
  dealCard(deck, dealerHand, ".dealerHand", hide);

  if (showSum(playerHand, ".playerSum") == 21) {
    dealerPlays();
  }
};

const checkScore = () => {
  const playerSum = showSum(playerHand, ".playerSum");
  const dealerSum = showSum(dealerHand, ".dealerSum");
  if (dealerSum > 21) {
    qs(".playerSum").textContent = playerSum + " - WINS";
    qs(".dealerSum").textContent = dealerSum + " - BUSTS";
    qs(".hitButton").disabled = true;
    qs(".standButton").disabled = true;
    qs(".dealerHitButton").disabled = true;
  } else if (playerSum > 21) {
    qs(".playerSum").textContent = playerSum + " - BUSTS";
    qs(".dealerSum").textContent = dealerSum + " - WINS";
    qs(".hitButton").disabled = true;
    qs(".dealerHitButton").disabled = true;
    qs(".standButton").disabled = true;
  } else if (dealerSum > playerSum) {
    qs(".playerSum").textContent = playerSum + " - LOSES";
    qs(".dealerSum").textContent = dealerSum + " - WINS";
    qs(".hitButton").disabled = true;
    qs(".standButton").disabled = true;
    qs(".dealerHitButton").disabled = true;
  } else if (dealerSum < playerSum) {
    qs(".playerSum").textContent = playerSum + " - WINS";
    qs(".dealerSum").textContent = dealerSum + " - LOSES";
    qs(".hitButton").disabled = true;
    qs(".standButton").disabled = true;
    qs(".dealerHitButton").disabled = true;
  } else if (dealerHand.length != playerHand.length && dealerSum === 21) {
    qs(".playerSum").textContent = playerSum + " - PUSH";
    qs(".dealerSum").textContent = dealerSum + " - PUSH";
    qs(".hitButton").disabled = true;
    qs(".standButton").disabled = true;
    qs(".dealerHitButton").disabled = true;
    if (dealerHand.length == 2) {
      qs(".playerSum").textContent = playerSum + " - LOSES";
      qs(".dealerSum").textContent = dealerSum + " - WINS";
      qs(".hitButton").disabled = true;
      qs(".standButton").disabled = true;
      qs(".dealerHitButton").disabled = true;
    } else if (playerHand.length == 2) {
      qs(".playerSum").textContent = playerSum + " - WINS";
      qs(".dealerSum").textContent = dealerSum + " - LOSES";
      qs(".hitButton").disabled = true;
      qs(".standButton").disabled = true;
      qs(".dealerHitButton").disabled = true;
    } else {
      qs(".playerSum").textContent = playerSum + " - PUSH";
      qs(".dealerSum").textContent = dealerSum + " - PUSH";
      qs(".hitButton").disabled = true;
      qs(".standButton").disabled = true;
      qs(".dealerHitButton").disabled = true;
    }
  } else {
    qs(".playerSum").textContent = playerSum + " - PUSH";
    qs(".dealerSum").textContent = dealerSum + " - PUSH";
    qs(".hitButton").disabled = true;
    qs(".standButton").disabled = true;
    qs(".dealerHitButton").disabled = true;
  }
  qs(".hitButton").disabled = true;
  qs(".standButton").disabled = true;
};

const hitPlayer = () => {
  const hitPlayerHand = deck.pop();
  playerHand.push(hitPlayerHand);
  const playerHandLiTwo = document.createElement("li");
  const imgTwo = document.createElement("img");
  imgTwo.src = "./images/cards/" + hitPlayerHand.imageUrl;
  playerHandLiTwo.appendChild(imgTwo);
  qs(".playerHand").appendChild(playerHandLiTwo);

  const playerSum = showSum(playerHand, ".playerSum");
  if (playerSum == 21) {
    dealerPlays();
  } else if (playerSum > 21) {
    flipCard(".dealerHand");
    showSum(dealerHand, ".dealerSum");
    qs(".winner").textContent = "Dealer Wins";
    qs(".hitButton").disabled = true;
    qs(".standButton").disabled = true;
  }
};

const hitDealer = () => {
  for (let n = 0; n < 1; n++) {
    const hitDealerHand = deck.pop();
    dealerHand.push(hitDealerHand);
    const dealerHandLiTwo = document.createElement("li");
    const imgTwo = document.createElement("img");
    imgTwo.src = "./images/cards/" + hitDealerHand.imageUrl;
    dealerHandLiTwo.appendChild(imgTwo);
    qs(".dealerHand").appendChild(dealerHandLiTwo);
    showSum(dealerHand, ".dealerSum");
  }
};

const replay = () => {
  location.reload();
};

document.addEventListener("DOMContentLoaded", shuffleDeck);
qs(".standButton").addEventListener("click", dealerPlays);
qs(".hitButton").addEventListener("click", hitPlayer);
qs(".resetButton").addEventListener("click", replay);
