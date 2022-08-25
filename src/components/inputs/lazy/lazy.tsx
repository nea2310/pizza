/*Этот код использует forwardRef с целью научиться создавать открытую часть API функционального компонента,
т.е. объявлять в компоненте методы, которые можно вызывать снаружи (из родительского компонента) напрямую
*/


import React, {
  useRef, useEffect, useState,
  useImperativeHandle, forwardRef,
  ForwardRefRenderFunction,
  RefObject
} from 'react';

import { IAppLazyInputRef, IAppLazyInputProps } from '../../../interface';

const AppLazyInput: ForwardRefRenderFunction<IAppLazyInputRef,
  IAppLazyInputProps> =
  ((props, ref) => {

    /*запоминаем в стейт текущее значение value из пропсов*/
    const [val, setVal] = useState(String(props.value));
    /*Если props.value меняется - вызываем коллбэк*/
    useEffect(() => {
      let inp = nativeInput.current as HTMLInputElement;
      if (
        /* Если новое значение props.value не равно фактическому значению инпута -> 
        установить props.value в инпут и обновить стейт компонента (стейт хранит текущее значение props.value, 
        с которым мы сравниваем новое, которое приходит в пропсах )
        */
        props.value != inp.value
      ) {
        inp.value = String(props.value);
        setVal(String(props.value));
      }
    }, [props.value]);

    const nativeInput = useRef<HTMLInputElement>() as RefObject<HTMLInputElement>;;

    /*useImperativeHandle позволяет прокидывать описанные в нем функции наружу (т.е. формирует открытое API компонента)*/
    useImperativeHandle<IAppLazyInputRef, IAppLazyInputRef>(ref, () => ({
      setValue: (val: string) => {
        const element = nativeInput.current as HTMLInputElement
        element.value = val;
      },
    }), []);

    const checkChange = (e: React.FocusEvent<HTMLInputElement>) => {
      if (props.value.toString() !== e.target.value) {
        props.onChange(e);
      }
    };

    const checkEnterKey = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        checkChange(e as unknown as
          React.FocusEvent<HTMLInputElement>);
      }
    };

    return (
      <input {...props.nativeProps}
        defaultValue={props.value}
        onBlur={checkChange}
        onKeyUp={checkEnterKey}
        ref={nativeInput}
      />
    );
  });



/*Если функция обернута в forwardRef, в ней становится доступен аргумент ref - 
это тот самый ref, который передаем в аргумент useImperativeHandle
*/
export default forwardRef(AppLazyInput);



