import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Perspectives from './pages/Perspectives';
import EntityBrowser from './pages/EntityBrowser';
import EntityDetail from './pages/EntityDetail';
import Visualizer from './pages/Visualizer';
import Compliance from './pages/Compliance';
import RelationshipManager from './pages/RelationshipManager';
import Roadmap from './pages/Roadmap';
import Settings from './pages/Settings';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/perspectives/:perspective" element={<Perspectives />} />
            <Route path="/entities" element={<EntityBrowser />} />
            <Route path="/entities/:entityType/:entityId" element={<EntityDetail />} />
            <Route path="/visualizer" element={<Visualizer />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/relationships" element={<RelationshipManager />} />
            <Route path="/compliance" element={<Compliance />} />            <Route path="/settings" element={<Settings />} />          </Routes>
        </Layout>
      </Router>
    </DataProvider>
  );
}

export default App;
