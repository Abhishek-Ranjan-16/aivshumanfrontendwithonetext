import { Routes, Route } from "react-router-dom"; 
import { Home, Contributors } from "./Pages"; 
import { Navbar } from "./Components";

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contributors" element={<Contributors />} />
      </Routes>
    </>
  );
};

export default App;
