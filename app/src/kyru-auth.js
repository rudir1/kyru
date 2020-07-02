import React from 'react';
import Recoil from 'recoil';

export let ViewType = {
KYRU_SIGN_IN: 'Kyru Sign In',
RAHIO_SIGN_IN: 'Rachio Sign In',
MAIN: 'Main',
} ;
Object.freeze(ViewType);

export let AtomKeys = {
VIEW_TYPE: 'kyru.io.viewType',
API_KEY: 'kyru.io.apiKey',
}
Object.freeze(AtomKeys);

// view type
export const viewTypeValue = Recoil.atom({
  key: AtomKeys.VIEW_TYPE,
  default: undefined,
});

// rachio api key
export const apiKeyValue = Recoil.atom({
  key: AtomKeys.API_KEY,
  default: "",
});

export function KyruState () {
  let [viewType, setViewType] = Recoil.useRecoilState(viewTypeValue);
  let [apiKey, setApiKey] = Recoil.useRecoilState(apiKeyValue);
  let storage = window.sessionStorage ;

  function checkStorageKey(key, initialValue, setKey) {
    let value = storage.getItem(key) ;

    if (value === null) {
      // console.log ("checkStorageKey: key " + key + " not found") ;
      storage.setItem(key, initialValue) ;
      setKey(initialValue) ;
    }
    else {
      // console.log ("checkStorageKey: key " + key + " value " + value + " found") ;
      setKey(value) ;
    }
  }

  // this is called on the first render
  React.useEffect (() => {
    checkStorageKey(AtomKeys.VIEW_TYPE, ViewType.KYRU_SIGN_IN, setViewType);
    checkStorageKey(AtomKeys.API_KEY, '', setApiKey);
  // eslint-disable-next-line
  }, []) ;

  // this is called when viewType changes
  React.useEffect (() => {
    storage.setItem(AtomKeys.VIEW_TYPE, viewType) ;
  // eslint-disable-next-line
  }, [viewType]);

  // this is called when apiKey changes
  React.useEffect (() => {
    storage.setItem(AtomKeys.API_KEY, apiKey) ;
  // eslint-disable-next-line
  }, [apiKey]);

  // use session storage to clear all items from storage
//   React.useEffect (() => {
//     return (() => { storage.clear(); }) ;
//   }) ;

  // console.log ("KyruState: Rendering") ;
  return null ;
} ;

