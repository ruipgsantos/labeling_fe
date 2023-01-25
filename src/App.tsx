
import { Select, TextField, Container, Button, Box, AppBar, Toolbar } from "@mui/material"
import Typography from '@mui/material/Typography';
import LoginButton from './components/LoginButton';
import useLogin from "./hooks/UseLogin";

function App() {

  const { loading, isLoggedIn, loginError, doLogin, doLogout } = useLogin();

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
            m: 1
          }}
        >
          <Box sx={{ flexGrow: 2 }}>
            <Typography variant='h6'> Please review this case:</Typography>
            <TextField sx={{ width: 1 }}
              multiline disabled >Asdasdasdassda</TextField>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='h6'> Select condition:</Typography>
            <Select sx={{ width: 1 }} multiple native></Select>
          </Box>
        </Box>

        <Box justifyContent="space-between">
          <Button variant="contained">Next Case</Button>
        </Box>
      </Container>
        : <Typography variant='h6'> Please Login</Typography>
      }
    </Container >
  );
}

export default App;


