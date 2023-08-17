import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { StatusContextProvider } from './context/status-context.tsx';
import { AuthContextProvider } from "./context/auth-context.tsx";
import { TeamContextProvider } from './context/team-form-context.tsx';
import { LeagueContextProvider } from './context/league-form-context.tsx';
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <StatusContextProvider>
        <LeagueContextProvider>
          <TeamContextProvider>
            <App />
          </ TeamContextProvider>
        </LeagueContextProvider>
      </ StatusContextProvider>
    </AuthContextProvider>
  </StrictMode >,
)
