import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <div>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
