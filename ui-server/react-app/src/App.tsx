import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBody from './AppBody';

function App() {
  const theme = createMuiTheme({
    palette: {
      type: "light"
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBody/>
    </ThemeProvider>
  );
}

export default App;
