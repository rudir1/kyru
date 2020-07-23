import Recoil from 'recoil';
import axios from 'axios';

// the current view seen by the user
export let ViewType = {
KYRU_SIGN_IN: 'Kyru Sign In',
RACHIO_SIGN_IN: 'Rachio Sign In',
MAIN: 'Main',
} ;
Object.freeze(ViewType);

// keys for atoms
export let AtomKeys = {
VIEW_TYPE: 'kyru.io.viewType',
RACHIO_API_KEY: 'kyru.io.rachioApiKey',
}
Object.freeze(AtomKeys);

// atom list
let atomMap = {} ;

// keys for selectors
export let SelectorKeys = {
RACHIO_DATA: 'kyru.io.rachioData',
}
Object.freeze(SelectorKeys);

// view type
export const viewTypeAtom = Recoil.atom({
  key: AtomKeys.VIEW_TYPE,
  default: ViewType.KYRU_SIGN_IN,
  persistence_UNSTABLE: { type: true },
});

atomMap[AtomKeys.VIEW_TYPE] = viewTypeAtom ;

// rachio api key
export const rachioApiKeyAtom = Recoil.atom({
  key: AtomKeys.RACHIO_API_KEY,
  default: "",
  persistence_UNSTABLE: { type: true },
});

atomMap[AtomKeys.RACHIO_API_KEY] = rachioApiKeyAtom ;

// rachio data
export const rachioDataSelector = Recoil.selector({
  key: SelectorKeys.RACHIO_DATA,
  get: async ({get}) => {
    let apiKey = get(rachioApiKeyAtom);
    console.log ("rachioDataSelector 1");
    const personId = await axios ({
      url: 'https://api.rach.io/1/public/person/info',
      method: 'get',
      headers: {'X-Requested-With': 'XMLHttpRequest',
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + apiKey },

    });
    console.log ("rachioDataSelector 2");
    const personInfo = await axios ({
      url: 'https://api.rach.io/1/public/person/' + personId.data.id,
      method: 'get',
      headers: {'X-Requested-With': 'XMLHttpRequest',
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + apiKey, },

    });
  
    console.log ("rachioDataSelector 3 ", personInfo);
    let deviceInfo = {} ;

    personInfo.data.devices.forEach((deviceItem, deviceIndex) => {
      if (! ('devices' in deviceInfo)) {
        deviceInfo.devices = [] ;
      }

      let thisDevice = {id: deviceItem.id,
                        name: deviceItem.name,
                        enabled: deviceItem.enabled,
                        zones: []} ;

      deviceItem.zones.forEach((zoneItem, zoneIndex) => {
        let thisZone = {id: zoneItem.id,
                        zoneNumber: zoneItem.zoneNumber,
                        name: zoneItem.name,
                        enabled: zoneItem.enabled,
                       };

        thisDevice.zones.push (thisZone) ;
      }) ;

      deviceInfo.devices.push (thisDevice)
    }) ;

    return deviceInfo;
  },
});

// local storage in browser
let storage = window.localStorage ;

// clear all of the browser storage
export function clearStorage() {
    storage.clear();
}

// state initialization
export const initializeAtomFromStorage = ({set}) => {
  for(const key in AtomKeys) {
    const storageKey = AtomKeys[key];
    const storageValue = storage.getItem(storageKey);

    if (storageValue !== null) {
      const parsedStorageValue = JSON.parse(storageValue) ;
      set(atomMap[storageKey], parsedStorageValue.value);
    }
  }
}

export function KyruState () {
  // state persistence
  Recoil.useTransactionObservation_UNSTABLE(({atomValues, atomInfo, modifiedAtoms}) => {
    for (const modifiedAtom of modifiedAtoms) {
      const storageValue = {} ;
      storageValue['value'] = atomValues.get(modifiedAtom) ;
      storage.setItem(
        modifiedAtom,
        JSON.stringify(storageValue),
      );
    }
  });

  return null ;
} ;

