import { StackNavigator } from 'react-navigation';
import Home from './Home';
import DeckDetail from './DeckDetail';
import Quiz from './Quiz';
import AddCard from './AddCard';


const Root = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'Mobile Flashcards',
      },
    },
    DeckDetail: {
      screen: DeckDetail,
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        title: 'Quiz',
      },

    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        title: 'Add Card',
      },
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: 'white',
    },
  },
);

export default Root;
