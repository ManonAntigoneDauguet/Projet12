import Header from './layouts/header'
import VerticalBar from './layouts/verticalBar'
import Dashboard from './layouts/dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <div className="verticalBarContainer">
          <VerticalBar />   
        </div>
        <div className="dashboardContainer">
          <Dashboard />          
        </div>
      </main>

    </div>
  );
}

export default App;
