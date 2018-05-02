import { RECEIVE_DECKS, RECEIVE_DECK, ADD_DECK } from './actionTypes';
import { getDecks, getDeck, saveDeckTitle } from '../utils/storage';

export const receiveDecks = decks => ({ type: RECEIVE_DECKS, decks });
export const receiveDeck = deck => ({ type: RECEIVE_DECK, deck });
export const addDeck = title => ({ type: ADD_DECK, title });

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
