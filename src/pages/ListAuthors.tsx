import React, { useEffect, useState } from 'react';
import { IonLabel, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLoading, IonButton, IonIcon, IonToast } from '@ionic/react';
import { AuthorService } from '../services/AuthorService';
import { Author } from '../models/Author';
import { useHistory } from 'react-router';

const ListAuthors: React.FC = () => {

  const [autores, setAutores] = useState<Author[]>([]);
  const [showLoading, setshowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setshowLoading(true);

    AuthorService.getAuthors()
      .then((value) => {
        setAutores(value);

        setshowLoading(false);

      }).catch(() => {
        setShowToast(true);
      });

  }, [])

  const handleShowBooksOfAuthor = (authorID: string) => {
    history.push(`/author/books/${authorID}`)
  }

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Autores</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonLoading isOpen={showLoading} message={'Carregando autores...'} />
        <IonToast isOpen={showToast} message={"Ocorreu um erro ao tentar carregar a lista de Autores..."} duration={2000} onDidDismiss={() => setShowToast(false)} />
        <IonList>
          {autores.map((author, ) => {
            return (
              <IonItem key={author.objectId} button onClick={() => handleShowBooksOfAuthor(author.objectId)}>
                <IonLabel>{author.name}</IonLabel>
              </IonItem>
            )
          })}
        </IonList>
      </IonContent>
    </IonPage >

  )
}

export default ListAuthors;