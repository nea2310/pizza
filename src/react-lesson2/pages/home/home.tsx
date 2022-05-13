import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import './home.scss';
import { IProduct } from '~/interface.d';
import { urlBuilder } from '~r/routes';
import { cartAddItem, cartRemoveItem } from '~s/actions/cart';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '~c/Login/Login';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { userUnset } from '~s/actions/user';
import { collection, addDoc, getDocs } from "firebase/firestore";
import db from './../../firebase';

const Home = () => {

  const addToDB = async () => {

    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getFromDB = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      console.log(doc.data());
    });
  };





  const props: any = useSelector(state => {
    return state;
  });
  const dispatch = useDispatch();
  const isAuthed = !!props.user.user.token;
  const email = props.user.user.email;
  const name = props.user.user.name;
  const surname = props.user.user.surname;

  const userDocID = props.user.user.userDocID;

  /*в зависимости от того, авторизован ли пользователь, отображаем либо приветстсвие, 
  либо форму для ввода логина и пароля*/
  const loginForm =
    isAuthed ? (
      <div>
        <h1>Welcome {`${name} ${surname}!`}</h1>
        <button
          onClick={() => {
            dispatch(userUnset());
          }}
        >
          Log out {email}
        </button>
      </div>
    ) :
      (<div>
        <h1>Login</h1>
        <Login />
        <p>or <Link to={'/register'}>register</Link></p>
      </div>);



  const products = props.productItems.productItems;
  /*создаем карточки продуктов*/
  let productsCards = null;

  if (products.length) {
    productsCards = products.map(
      (product: IProduct) => {
        let inCart =
          props.cart.cartItems.some(
            (cartItem: any) => product.id === cartItem.id);
        let btn;
        if (inCart) {
          btn = <Button
          // variant="danger" onClick={() => {
          //   dispatch(cartRemoveItem(userDocID, product.id));
          // }
          // }
          >
            Remove from cart
          </Button>;
        }
        else {
          btn = <Button variant="success"
          // onClick={() => dispatch(cartAddItem(product.id))}
          >
            Add to cart
          </Button>;
        }

        return <div className={''} key={product.id}>
          <Card>
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                <strong>Price: {product.price}</strong>
              </Card.Text>
              <Link to={urlBuilder('productPage', { id: product.id })}>
                Get more...
              </Link>
              <hr />
              {btn}
            </Card.Body>
          </Card>
        </div>;
      });
  }

  return (
    <div>
      <button onClick={() => addToDB()}>Add to DB</button>
      <button onClick={() => getFromDB()}>Get from DB</button>
      <main className='home'>
        {loginForm}
        <ul className='items'>
          {productsCards}
        </ul>
      </main>
    </div>
  );
};


export default Home;