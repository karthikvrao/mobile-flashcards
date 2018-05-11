import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'MobileFlashcards:Decks';

const getDecks = () => (
  AsyncStorage.getItem(DECKS_STORAGE_KEY).then(JSON.parse)
);

const getDeck = title => (
  AsyncStorage.getItem(DECKS_STORAGE_KEY).then(result => JSON.parse(result[title]))
);

const saveDeckTitle = title =>
  AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result) => {
    if (result === null) {
      return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: { title, questions: [] },
      }));
    }

    const data = JSON.parse(result);
    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({
      ...data,
      [title]: { title, questions: [] },
    }));
  });

const addCardToDeck = (title, card) =>
  AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result) => {
    const data = JSON.parse(result);
    // Assuming that a deck with given title exists
    data[title].questions = data[title].questions.concat([].push(card));
    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  });

export { getDecks, getDeck, saveDeckTitle, addCardToDeck };
