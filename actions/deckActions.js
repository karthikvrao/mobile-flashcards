import { RECEIVE_DECKS, RECEIVE_DECK, ADD_DECK, ADD_CARD } from './actionTypes';
import { getDecks, getDeck, saveDeckTitle, addCardToDeck } from '../utils/storage';

export const receiveDecks = decks => ({ type: RECEIVE_DECKS, decks });
export const receiveDeck = deck => ({ type: RECEIVE_DECK, deck });
export const addDeck = title => ({ type: ADD_DECK, title });
export const addCard = (title, card) => ({ type: ADD_CARD, title, card });

// Thunk action creators
export const getDecksTAC = () => dispatch => (
  getDecks().then(data => (data === null ? {} : dispatch(receiveDecks(data))))
);

export const getDeckTAC = title => dispatch => (
  getDeck(title).then(data => dispatch(receiveDeck(data)))
);

export const addDeckTAC = title => dispatch => (
  saveDeckTitle(title).then(() => dispatch(addDeck(title)))
);

export const addCardToDeckTAC = (title, card) => dispatch => (
  addCardToDeck(title, card).then(() => dispatch(addCard(title, card)))
);
