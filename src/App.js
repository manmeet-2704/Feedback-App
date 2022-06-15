import Header from "./components/Header";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackData from './data/FeedbackData'
import FeedbackItems from "./components/FeebackItems";
import FeedbackForm from "./components/FeedbackForm";
import About from "./pages/About";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AboutLinkIcon from './components/AboutLinkIcon'
import {FeedbackProvider} from "./context/FeedbackContext";

function App() {

  return (
    <FeedbackProvider>
    <Router>
    <Header />
    <div className="container">
      <Routes>
        <Route exact path='/' element={
          <>
              <FeedbackForm   />
              <FeedbackStats />
              <FeedbackItems /> 
              <AboutLinkIcon />
          </>
        }/>
        <Route exact path='/about' element={<About />} />
      </Routes>
    </div>
    </Router>
    </FeedbackProvider>
  );
}

export default App;
