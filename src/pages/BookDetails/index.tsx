import React, { useState, useEffect } from 'react';
import { Book } from '../../models/Book';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonLoading, IonToast, IonBackButton, IonButtons } from '@ionic/react';
import { BookService } from '../../services/BookService';
import { useParams } from 'react-router';
import './index.css';

type Params = {
  bookID?: string
}

const BooksDetails: React.FC = () => {

  const [showLoading, setShowLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [book, setBook] = useState<Book>();
  const [nota, setNota] = useState<number>(0);
  const params: Params = useParams();

  useEffect(() => {
    setMessageLoading('Carregando detalhes do Livro...');
    setShowLoading(true);
    if (params.bookID) {
      BookService.getBook(params.bookID)
        .then((value) => {
          setBook(value);

          setMessageLoading('Calculando nota do Livro...');
          BookService.getReviews(value)
            .then((value) => {

              let somaNota: number = 0;
              value.forEach((review) => {
                somaNota += review.rating;
              })

              setNota(somaNota / (value.length > 0 ? value.length : 1));
            })
            .catch(() => {
              setShowToast(true);
            })

          setShowLoading(false);

        })
        .catch(() => {
          setShowLoading(false);
          setShowToast(true);
        });
    }
    else {
      setShowToast(true);
    }
  }, [])


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>

          {!book ? (
            <IonTitle>Livro</IonTitle>
          ) : (
              <IonTitle>{book.title}</IonTitle>
            )}

        </IonToolbar>
      </IonHeader>

      <IonContent>
        < IonToast isOpen={showToast} message={"Não foi possível carregar a lista de livros"} duration={2000} onDidDismiss={() => setShowToast(false)} />

        {!book ? (
          <IonLoading isOpen={showLoading} message={messageLoading} />
        ) :
          (<>
            <div className="book">
              <img style={{ width: "200px" }} src={book.cover} alt="" />
              <p><IonLabel className="titlebook" >{book.title}</IonLabel></p>
            </div>
            <div className="detailbook">
              <IonLabel>Por: {book.author.name}</IonLabel>
              <IonLabel>Quantidade disponível: {book.quantity}</IonLabel>
              <IonLabel>Nota: {nota}</IonLabel>
            </div>
          </>)}

      </IonContent>
    </IonPage>
  )
}

export default BooksDetails;