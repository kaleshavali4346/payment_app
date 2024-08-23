import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

function App() {

  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path ="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/send" element={<SendMoney/>}></Route>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
