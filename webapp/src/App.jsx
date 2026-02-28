import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Perspectives from './pages/Perspectives';
import EntityBrowser from './pages/EntityBrowser';
import EntityDetail from './pages/EntityDetail';
import Visualizer from './pages/Visualizer';
import RelationshipManager from './pages/RelationshipManager';
import Roadmap from './pages/Roadmap';
import ProjectPortfolio from './pages/ProjectPortfolio';
import Settings from './pages/Settings';
import ImpactAnalysis from './pages/ImpactAnalysis';
import ApplicationPortfolio from './pages/ApplicationPortfolio';
import TechnologyLifecycle from './pages/TechnologyLifecycle';
import HeatMaps from './pages/HeatMaps';
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
            <Route path="/impact-analysis" element={<ImpactAnalysis />} />
            <Route path="/application-portfolio" element={<ApplicationPortfolio />} />
            <Route path="/technology-lifecycle" element={<TechnologyLifecycle />} />
            <Route path="/heatmaps" element={<HeatMaps />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/projects" element={<ProjectPortfolio />} />
            <Route path="/relationships" element={<RelationshipManager />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </DataProvider>
  );
}

export default App;
