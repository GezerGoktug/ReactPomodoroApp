import ContentBox from "./components/ContentBox";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Provider } from "./context/Provider";

function App() {
  return (
    <Provider>
      <div className="min-vh-100 bg-success-subtle d-flex justify-content-center align-items-center">
        <ContentBox />
      </div>
    </Provider>
  );
}

export default App;
