import React from 'react';
import Recoil from 'recoil';
import { rachioDataSelector } from './KyruState';

function RachioData() {
  const rachioData = Recoil.useRecoilValue(rachioDataSelector) ; 
  console.log("RachioData") ;

  return (
    <div>
      { JSON.stringify(rachioData) }
    </div>
  ) ;
}

function RachioSuspense() {
  console.log ("RachioSuspence");
  return (
  <div>
    Loading Rachio Data ...
  </div>
  );
    
}

export default function RachioView() {
  console.log("RachioView") ;

  return (
    <React.Suspense fallback=<RachioSuspense/> >
      <RachioData/>
    </React.Suspense>
  ) ;
}
