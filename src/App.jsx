import Navbar from "./components/common/Navbar";
import HomePage from "./components/pages/HomePage";
import "./style/layout.scss";

function App() {
  return (
    <div className="layout">
      <Navbar />
      <HomePage />
    </div>
  );
}

export default App;
