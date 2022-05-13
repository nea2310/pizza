import React from 'react';
import './product-card.scss';
import { Link } from 'react-router-dom';
import { urlBuilder } from '~r/routes';

export default function (props: any) {


  return (
    <>
      <Link className='product-card__link'
        to={urlBuilder('productPage', { id: props.pizzaid })}>
        <h4
          className='product-card__header'>{props.name}</h4>
        <div className='product-card__img-wrapper'>
          <img
            className='product-card__img'
            src={props.image} alt="" />
        </div>

      </Link>
      <div className='product-card__info'>
        <strong className='product-card__price'>
          Цена: {props.price}р.</strong>
        <strong className='product-card__avl'>{props.isavl}</strong>
      </div>
    </>
  );
}