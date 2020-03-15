import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import React from 'react';
import './Home.css';
import { personCircleOutline, book } from 'ionicons/icons';
import { Route, Redirect } from 'react-router';
import ListAuthors from './ListAuthors';
import ListBooks from './ListBooks';

const Home: React.FC = () => {
  return (

    <IonTabs>
      <IonRouterOutlet>
        <Route path="/authors" component={ListAuthors} exact />
        <Route path="/books" component={ListBooks} exact />
        <Redirect from="/home" to="/authors" exact />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">

        <IonTabButton tab="authors" href="/authors">
          <IonIcon icon={personCircleOutline} />
          <IonLabel>Autores</IonLabel>
        </IonTabButton>

        <IonTabButton tab="books" href="/books">
          <IonIcon icon={book} />
          <IonLabel>Livros</IonLabel>
        </IonTabButton>

      </IonTabBar>
    </IonTabs>

  );
};

export default Home;
