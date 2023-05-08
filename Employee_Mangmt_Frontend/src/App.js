import { Route, Routes } from "react-router-dom";
import CameraApi from "./component/CameraApi";

import Header from "./component/Header";
import Home from "./page/Home";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<CameraApi />} />
        {/* <Route path="/:id" element={<CameraFace />} /> */}
      </Routes>
    </div>
  );
}

export default App;
