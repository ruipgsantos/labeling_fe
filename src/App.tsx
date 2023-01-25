
import './App.css';
import { Select, TextField, Container, Button, Box, AppBar, Toolbar } from "@mui/material"
import Typography from '@mui/material/Typography';
import LoginButton from "./components/LoginButton";

function App() {
  return (
    <Container >
      <AppBar position='static'>
        <Toolbar sx={{ display: "flex" }}>
          <Typography variant="h6">Case Labbeling</Typography>

        </Toolbar>
      </AppBar>

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
  );
}

export default App;
