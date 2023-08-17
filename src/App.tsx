import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import { Suspense, lazy } from "react";
import { useAuthContext } from "./hooks/user-operations";
import { useStatusContext } from "./hooks/action-status";
import Modal from "./components/GeneralStuff/Modal";
import Message from "./components/GeneralStuff/Message";
import Loader from "./components/GeneralStuff/Loader";
const Home = lazy(() => import("./pages/Home"))
const GetStarted = lazy(() => import("./pages/GetStarted"))
const Signup = lazy(() => import("./pages/Signup"))
const Login = lazy(() => import("./pages/Login"))
const Compare = lazy(() => import("./pages/Compare"))
const Leagues = lazy(() => import("./pages/Leagues"))
const LeagueDetails = lazy(() => import("./pages/LeagueDetails"))
const TeamDetails = lazy(() => import("./pages/TeamDetails"))
const NewLeague = lazy(() => import("./pages/NewLeague"))
const Navbar = lazy(() => import("./components/GeneralStuff/Navbar"))
const Footer = lazy(() => import("./components/GeneralStuff/Footer"))

const queryClient = new QueryClient();

export default function App() {
  const { status: { activeMessage, kind, message } } = useStatusContext()
  const { state: { rol, token } } = useAuthContext()

  return (
    <>
      <Suspense fallback={<Loader />}>
        <QueryClientProvider client={queryClient}>
          <HashRouter basename='/'>
            <Navbar />
            <Routes>
              <Route index element={<Home />} />
              <Route path='/get-started' element={<GetStarted />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/compare' element={token ? <Compare /> : <Navigate to='/login' />} />
              <Route path='/leagues' element={(token && rol === 'super') ? <Leagues /> : <Navigate to='/login' />} />
              <Route path='/newLeague' element={(token && rol === 'super') ? <NewLeague /> : <Navigate to='/login' />} />
              <Route path='/leagues/:leagueId' element={(token && rol === 'super') ? <LeagueDetails /> : <Navigate to='/login' />} />
              <Route path='/teams/:leagueId' element={(token && rol === 'super') ? <TeamDetails /> : <Navigate to='/login' />} />
              <Route path='*' element={<p>Error, use the menu to go to an existing page</p>} />
            </Routes>
            <Footer />
            {(activeMessage) &&
              <Modal>
                <Message text={message} kind={kind}></Message>
              </Modal>
            }
          </HashRouter>
        </QueryClientProvider>
      </Suspense>
    </>
  )
}
