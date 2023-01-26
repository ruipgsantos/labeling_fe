
import { TextField, Container, Box, AppBar, Toolbar, CircularProgress } from "@mui/material"
import Typography from '@mui/material/Typography';
import { useState, useCallback } from "react";
import Conditions from "./components/ConditionsList";
import LoginButton from './components/LoginButton';
import useCase from "./hooks/UseCase";
import { LoadingButton } from "@mui/lab";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<string>();
  const { caseList, currentCase, nextCase, useCaseLoading } = useCase({ selectedCondition, mayFetch: isLoggedIn });


  const checkLogin = useCallback((loggedIn: boolean | undefined) => {
    setIsLoggedIn(!!loggedIn);
  }, [])

  return (
    <Container >
      <AppBar position='static'>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Case Labbeling</Typography>
          <LoginButton onAction={checkLogin} />
        </Toolbar>
      </AppBar>

      {isLoggedIn ? <Container>
        {caseList.length > 0 ?
          <Box>
            <Box component="main"
              sx={{
                display: "flex",
                flexDirection: "column",
                m: 1
              }}
            >
              <Box sx={{ flexGrow: 2 }}>
                <Typography variant='h6'>Please review this case:</Typography>
                {useCaseLoading ? <CircularProgress /> : <TextField sx={{ width: 1 }}
                  multiline disabled value={currentCase?.text} />}
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant='h6'> Select condition:</Typography>
                <Conditions setSelectedCondition={setSelectedCondition} />
              </Box>
            </Box>

            <Box justifyContent="space-between">
              <LoadingButton loading={useCaseLoading} variant="contained"
                onClick={() => {
                  nextCase();
                  setSelectedCondition(undefined);
                }}>
                Next Case
              </LoadingButton>
            </Box>
          </Box> :
          <Typography variant='h6'>You are done!!</Typography>}
      </Container>
        : <Typography variant='h6'>Please Login</Typography>
      }
    </Container >
  );
}

export default App;


