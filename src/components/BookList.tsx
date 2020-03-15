import React from 'react';
import { Book } from '../models/Book';
import { IonList, IonItem, IonAvatar, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router';

type ListOfBooks = {
  books: Book[];
}

const BookList: React.FC<ListOfBooks> = ({ books }) => {

  const history = useHistory();

  const handleShowDetails = (id: string) => {
    history.push(`/book/${id}`);
  }

  return (
    <>
      <IonList>
        {books.map((book, ) => {
          return (
            <IonItem key={book.objectId} button onClick={() => handleShowDetails(book.objectId)}>
              <IonAvatar style={{ margin: "0 10px" }}>
                <img src={book.cover} alt="" />
              </IonAvatar>

              <IonLabel>
                {book.title}
                <h4>Autor: {book.author.name}</h4>
                <h4>Exemplares: {book.quantity}</h4>
              </IonLabel>

            </IonItem>
          )
        }
        )}
      </IonList>
    </>
  )
}

export default BookList;