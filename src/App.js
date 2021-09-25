import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { useWordingLoader } from './utils/wordingSystem';

import appStore from './store/app';
import walletStatus from './store/walletStatus';

import GlobalStyle from './components/GlobalStyle';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MySamuraiPage from './pages/MySamuraiPage';

const reducer = combineReducers({
  app: appStore.reducer,
  walletStatus: walletStatus.reducer
});

const store = createStore(reducer);

const App = ({ wording, Router = BrowserRouter }) => {
  const wordingLoaded = useWordingLoader(wording ?? '/wordings/main.json?v=202106201530');

  return (
    <Provider store={store}>
      <Helmet>
        <title>KATANA N' SAMURAI</title>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;700;900&display=swap" rel="stylesheet"></link>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" rel="stylesheet"></link>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" rel="stylesheet"></link>
      </Helmet>
      <GlobalStyle/>
      <Router>
        { !wordingLoaded &&
          <div>網站內容準備中，請稍候</div>
        }
        { wordingLoaded &&
          <>
            <Header />
            <Switch>
              <Route path="/" exact={true} component={HomePage} />
              <Route path="/?to=heading" exact={true} component={HomePage} />
              <Route path="/?to=intro" exact={true} component={HomePage} />
              <Route path="/?to=news" exact={true} component={HomePage} />
              <Route path="/?to=gallery" exact={true} component={HomePage} />
              <Route path="/?to=social-class" exact={true} component={HomePage} />
              <Route path="/?to=road-map" exact={true} component={HomePage} />
              <Route path="/?to=card" exact={true} component={HomePage} />
              <Route path="/?to=purchase" exact={true} component={HomePage} />
              <Route path="/?to=description" exact={true} component={HomePage} />
              <Route path="/?to=about" exact={true} component={HomePage} />
              <Route path="/my-samurai" exact={true} component={MySamuraiPage} />
            </Switch>
            <Footer />
          </>
        }
      
      </Router>
    </Provider>
  );
}

export default App;
