import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import CarList from "./CarList";
import UserProvider from "./UserProvider";
import CarListProvider from "./CarListProvider";
import CarProvider from "./CarProvider";
import CarRoute from "./CarRoute";

function App() {
  return (
    <div style={componentStyle()}>
      <UserProvider>
        <CarListProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<CarList />} />
                <Route
                  path="carDetail"
                  element={
                    <CarProvider>
                      <CarRoute />
                    </CarProvider>
                  }
                />
                <Route path="*" element={"not found"} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CarListProvider>
      </UserProvider>
    </div>
  );
}

function componentStyle() {
  return {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#31393C",
  };
}

export default App;
