/*Этот код использует ref с целью научиться использовать открытую часть API функционального компонента,
т.е. вызывать методы дочернего компонента снаружи (из родительского компонента) напрямую
*/

import React, { RefObject, useRef } from 'react';
import { IAppLazyInputRef, IAppMinMaxProps } from '../../../interface';
import AppLazyInputWithRef from '../lazy-input/LazyInput';
import './min-max.scss';

const MinMax: React.FC<IAppMinMaxProps> = (props) => {
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
    <div className="min-max">
      <button
        className="min-max__button"
        aria-label="уменьшить количество"
        onClick={decrease}
      >
        -
      </button>
      <AppLazyInputWithRef
        nativeProps={{ type: 'text', className: 'min-max__input' }}
        value={props.cnt}
        onChange={onChange}
        ref={lazyInput}
      />
      <button
        className="min-max__button"
        aria-label="увеличить количество"
        onClick={increase}
      >
        +
      </button>
    </div>
  );
};

export default MinMax;
