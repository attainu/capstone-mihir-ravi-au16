import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import coursesPages from "./pages/coursesPages";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar/>
        <Router>
          <Switch>
            <Route exact path="/" component={coursesPages} />
          </Switch>
        </Router>
    </>
  );
};

export default App;
