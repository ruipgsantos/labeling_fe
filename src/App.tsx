
import { TextField, Container, Button, Box, AppBar, Toolbar } from "@mui/material"
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import Conditions from "./components/Conditions";
import LoginButton from './components/LoginButton';
import useLogin from "./hooks/UseLogin";
import axios from "axios";
import useCase from "./hooks/UseCase";
import { LoadingButton } from "@mui/lab";

function App() {

  const { loading, isLoggedIn, loginError, doLogin, doLogout } = useLogin();
  const [selectedCondition, setSelectedCondition] = useState<string>();

  const { currentCase, addToCase, nextCase, useCaseLoading } = useCase();

  useEffect(() => {
    console.log("current case changed:");
    console.log(currentCase);
  }, [currentCase])

  return (
    <Container >
      <AppBar position='static'>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Case Labbeling</Typography>
          <LoginButton props={{ loading, isLoggedIn, doLogin, doLogout }} />
        </Toolbar>
      </AppBar>

      {isLoggedIn() ? <Container>
        <Box component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            m: 1
          }}
        >
          <Box sx={{ flexGrow: 2 }}>
            <Typography variant='h6'> Please review this case:</Typography>
            <TextField sx={{ width: 1 }}
              multiline disabled value={currentCase?.text} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='h6'> Select condition:</Typography>
            <Conditions setSelectedCondition={setSelectedCondition} />
          </Box>
        </Box>

        <Box justifyContent="space-between">
          <LoadingButton loading={useCaseLoading} variant="contained"
            onClick={nextCase}>
            Next Case
          </LoadingButton>
        </Box>
      </Container>
        : <Typography variant='h6'> Please Login</Typography>
      }
    </Container >
  );
}

export default App;


