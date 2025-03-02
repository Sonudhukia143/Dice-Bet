import { lazy, Suspense } from 'react';
import './App.css';
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import './helperComponents/Loader.jsx';
import Layout from './components/Layout.jsx';
import UndefinedPath from './helperComponents/UndefinedPath.jsx';
import ErrorTemplate from './helperComponents/ErrorTemplate.jsx';
import Loader from './helperComponents/Loader.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';

const SignUp = lazy(() => import('./routes/SignUp.jsx'));
const Login = lazy(() => import('./routes/Login.jsx'));
const RollDice = lazy(() => import('./routes/RollDice.jsx'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorTemplate />} >
      <Route index element={
        <Suspense fallback={<Loader props={"Fetching"} />}>
          <SignUp />
        </Suspense>
      } />
      <Route path="/login" element={
        <Suspense fallback={<Loader props={"Fetching"} />}>
          <Login />
        </Suspense>
      } />
      <Route path="/rolldice" element={
        <Suspense fallback={<Loader props={"Fetching"} />}>
          <RollDice />
        </Suspense>
      } />
      <Route path="*" element={<UndefinedPath />} />
    </Route>
  )
);

function App() {
  return (
    <>
    <AuthProvider>
      <RouterProvider router={router } />
    </AuthProvider>
    </>
  )
}

export default App
