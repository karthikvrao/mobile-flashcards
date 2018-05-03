import { TabNavigator } from 'react-navigation';
import DeckList from './DeckList';
import NewDeck from './NewDeck';


const Home = TabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
      },
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'grey',
      indicatorStyle: {
        backgroundColor: 'white',
      },
      labelStyle: {
        fontWeight: 'bold',
      },
      style: {
        backgroundColor: 'black',
      },
    },
  },
);

export default Home;
