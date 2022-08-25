/*Этот код использует ref с целью научиться использовать открытую часть API функционального компонента,
т.е. вызывать методы дочернего компонента снаружи (из родительского компонента) напрямую
*/

import React, { RefObject, useRef } from 'react';
import './minmax.scss';
import AppLazyInputWithRef from '../lazy/lazy';
import { IAppLazyInputRef, IAppMinMaxProps } from '../../../interface';

const AppMinMax = (props: IAppMinMaxProps) => {
  const lazyInput = useRef<IAppLazyInputRef>() as RefObject<IAppLazyInputRef>;

  const increase = () => {
    set(props.cnt + 1);
  };

  const decrease = () => {
    set(props.cnt - 1);
  };


  /*
  * Если значение в диапазоне между min и max -> вернуть это значение
  * Если меньше min - > вернуть min 
  * Если больше max - > вернуть max
   */
  const set = (newCnt: number) => {
    let cnt = Math.min(Math.max(newCnt, props.min), props.max);
    props.onChange(cnt);
    return cnt;
  };


  /*
  * Получить от дочернего компонента AppLazyInputWithRef событие (blur или keyup)
  
  * Пропустить введенное в инпут значение (e.target.value) через метод set 
  (чтобы оставить как есть или привести к значению min или max, если оно выходит за диапазон)
  
  * Если значение, полученное после обработки методом set,
  отличается от того, что изначально ввели в инпут (e.target.value) ->
  вызвать в дочернем элементе AppLazyInputWithRef метод setValue для установки этого значения в инпут
  
  */

  const onChange = (e: React.FocusEvent<HTMLInputElement>) => {
    let cnt = parseInt(e.target.value);
    let realCnt = set(isNaN(cnt) ? props.min : cnt);

    if (realCnt.toString() !== e.target.value) {
      const element = lazyInput.current;
      if (!element) return;
      element.setValue(String(realCnt));
    }
  };


  return (
    <div>
      <button onClick={decrease}>-</button>
      <AppLazyInputWithRef
        nativeProps={{ type: 'text', className: '' }}
        value={props.cnt}
        onChange={onChange}
        ref={lazyInput}
      />
      <button onClick={increase}>+</button>
    </div>
  );
};


export default AppMinMax;