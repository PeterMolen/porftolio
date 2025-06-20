import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import App from './App.tsx'

const theme = createTheme({
  palette: {
    mode: 'light', // Byt till 'dark' om du föredrar mörkt läge
    primary: {
      main: '#6366f1', // Indigo
    },
    secondary: {
      main: '#10b981', // Green
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
