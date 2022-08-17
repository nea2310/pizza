import React from 'react';
import './product-single.scss';

export default function (props: any) {
  const ingredients = props.ingredients.join(', ');

  return (
    <div className='product-single'>
      <h1 className='product-single__name'>{props.name}</h1>
      <div className='product-single__ingredients'>
        <strong>Состав: {ingredients}</strong>
      </div>

      <div className='product-single__img-wrapper'>
        <img className='product-single__img'
          src={props.image} alt={props.title} />
      </div>

      <div className='product-single__price'>
        <strong>Цена: {props.price}р.</strong>
      </div>

      <props.linkComponent
        className='product-single__back-link'
        to={props.backUrl}>Вернуться к меню</props.linkComponent>
    </div>
  );
}