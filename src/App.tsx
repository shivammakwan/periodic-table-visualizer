import './App.css';
import PeriodicTable from './components/PeriodicTable';
import OrientationHelper from './components/OrientationHelper';

function App() {
  return (
    <div className="app-container">
      <main className="app-content">
        <PeriodicTable />
        <OrientationHelper />
      </main>
    </div>
  );
}

export default App;
