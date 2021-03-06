import React from 'react';
import { Grid, TextField, FormLabel, Button } from '@material-ui/core';
import 'fontsource-roboto';
import Recoil from 'recoil';
import { ViewType, viewTypeAtom, rachioApiKeyAtom } from './KyruState';
import KyruAppBar from './KyruAppBar';

function RachioSignIn() {
  let [apiKey, setAPIKey] = React.useState("") ;
  let setAPIKeyValue = Recoil.useSetRecoilState(rachioApiKeyAtom) ;
  let setViewType = Recoil.useSetRecoilState(viewTypeAtom) ;

  // handle keystrokes in username text field
  function handleAPIKeyChange (event) {
    setAPIKey (event.target.value) ;
  }

  // handle submit api key button click
  async function handleClickButtonSubmit (event) {
    event.preventDefault();
    setAPIKeyValue(apiKey);
    setViewType(ViewType.MAIN);
  }

  // render the component
  return (
    <div>
      <Grid container direction="column" justify="flex-end" alignItems="stretch" alignContent="center" spacing={1}>
        <Grid item>
          <KyruAppBar/>
        </Grid>
        <Grid item>
          <FormLabel>Rachio API Key</FormLabel>
        </Grid>
        <form>
          <Grid item>
            <TextField label="API Key" value={apiKey} onChange={handleAPIKeyChange} variant="outlined" type="text" fullWidth={true}/>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" fullWidth={true} onClick={handleClickButtonSubmit}>Submit</Button>
          </Grid>
        </form>
      </Grid>
    </div>
  ) ;
}

export default RachioSignIn;
