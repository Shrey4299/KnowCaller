import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import { Search } from "./pages";
import SpamList from "./pages/spam-list";
import BlockedList from "./pages/blocked-list";
import WhoViewed from "./pages/who-viewed";
import Pricing from "./pages/pricing";
import Payment from "./pages/payment";
import LogOut from "./pages/logout";

function App() {


  return (
    <>
      <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
        <Navbar routes={routes} />
      </div>
      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        <Route path="/search" element={<Search />} />
        <Route path="/spam-list" element={<SpamList />} />
        <Route path="/blocked-list" element={<BlockedList />} />
        <Route path="/who-viewed-you" element={<WhoViewed />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default App;
