import { combineReducers } from 'redux';
import {
  RECEIVE_DECKS,
  RECEIVE_DECK,
  ADD_DECK,
  ADD_CARD,
  SET_SELECTED_DECK,
} from '../actions/actionTypes';


const decks = (state = {}, action) => {
  const {
    decks: allDecks,
    deck,
    title,
    card,
  } = action;

  switch (action.type) {
    case RECEIVE_DECKS:
      return { ...state, ...allDecks };
    case RECEIVE_DECK:
      return { ...state, [deck.title]: deck };
    case ADD_DECK:
      return { ...state, [title]: { title, questions: [] } };
    case ADD_CARD:
      return {
        ...state,
        [title]: {
          ...state[title],
          questions: [...state[title].questions, card],
        },
      };
    default:
      return state;
  }
};

const selectedDeck = (state = {}, action) => {
  const { title } = action;
  switch (action.type) {
    case SET_SELECTED_DECK:
      return title;
    default:
      return state;
  }
};

export default combineReducers({ decks, selectedDeck });
