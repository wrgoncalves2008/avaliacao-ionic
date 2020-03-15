import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLoading, IonToast, IonButtons, IonBackButton } from '@ionic/react';
import { Book } from '../models/Book';
import { BookService } from '../services/BookService';
import BookList from '../components/BookList';
import { useParams } from 'react-router';

type Params = {
  authorID?: string
}

const ListBooks: React.FC = () => {

  const [books, setBooks] = useState<Book[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const params: Params = useParams();

  useEffect(() => {
    setShowLoading(true);

    if (!params.authorID) {
      BookService.getBooks().then((value) => {
        setBooks(value);

        setShowLoading(false);
      }
      ).catch(() => {
        setShowToast(true)
      });
    }
    else {
      BookService.getBookOfAuthor(params.authorID)
        .then((value) => {
          setBooks(value);
          setShowLoading(false);
        }
        ).catch(() => {
          setShowLoading(false);
          setShowToast(true)
        });

    }
  }
    , [])

  return (
    <IonPage id="books">
      <IonHeader>
        <IonToolbar color="primary">
          {params.authorID ? (
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
          ) : (
              <></>
            )}
          < IonTitle > Livros</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonLoading isOpen={showLoading} message={'Carregando Livros...'} />
        <IonToast isOpen={showToast} message={"Ocorreu um erro ao tentar carrgar a lista de livros..."} duration={2000} onDidDismiss={() => setShowToast(false)} />

        <BookList books={books} />

      </IonContent>

    </IonPage >
  )
}

export default ListBooks;