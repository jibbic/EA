import { useState, useRef } from 'react';
import { useData } from '../context/DataContext';
import { Save, Upload, RefreshCw, Download, AlertTriangle, CheckCircle2, Database, HardDrive } from 'lucide-react';
import Toast from '../components/Toast';

const Settings = () => {
  const { exportData, importData, resetData, entities, relationships } = useData();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const fileInputRef = useRef(null);

  const handleExport = () => {
    exportData();
    setToastMessage('✅ Data exporterad till JSON-fil');
    setShowToast(true);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = importData(e.target.result);
      if (result.success) {
        setToastMessage('✅ Data importerad framgångsrikt');
      } else {
        setToastMessage(`❌ ${result.message}`);
      }
      setShowToast(true);
    };
    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReset = () => {
    resetData();
    setShowResetConfirm(false);
    setToastMessage('✅ Data återställd till ursprungliga exempel');
    setShowToast(true);
  };

  // Calculate storage size
  const calculateStorageSize = () => {
    const entitiesSize = new Blob([JSON.stringify(entities)]).size;
    const relationsSize = new Blob([JSON.stringify(relationships)]).size;
    const totalBytes = entitiesSize + relationsSize;
    
    if (totalBytes < 1024) return `${totalBytes} B`;
    if (totalBytes < 1024 * 1024) return `${(totalBytes / 1024).toFixed(2)} KB`;
    return `${(totalBytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const totalEntities = Object.values(entities).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Inställningar</h2>
        <p className="text-gray-600 mt-1">Hantera din data och inställningar</p>
      </div>

      {/* Storage Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <Database className="h-6 w-6 text-primary-600" />
          <h3 className="text-lg font-bold text-gray-900">Datalagring</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Entiteter</p>
                <p className="text-2xl font-bold text-blue-900 mt-1">{totalEntities}</p>
              </div>
              <Database className="h-8 w-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Relationer</p>
                <p className="text-2xl font-bold text-green-900 mt-1">{relationships.length}</p>
              </div>
              <Database className="h-8 w-8 text-green-400" />
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Lagringsstorlek</p>
                <p className="text-2xl font-bold text-purple-900 mt-1">{calculateStorageSize()}</p>
              </div>
              <HardDrive className="h-8 w-8 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <strong>Lokal lagring aktiverad</strong>
              <p className="mt-1 text-gray-600">
                Din data sparas automatiskt i webbläsarens localStorage och överlever siduppdateringar.
                Data är endast tillgänglig på denna dator och i denna webbläsare.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Export / Import */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <Save className="h-6 w-6 text-primary-600" />
          <h3 className="text-lg font-bold text-gray-900">Export & Import</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Export */}
          <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-primary-300 transition-colors">
            <Download className="h-8 w-8 text-primary-600 mb-4" />
            <h4 className="font-bold text-gray-900 mb-2">Exportera data</h4>
            <p className="text-sm text-gray-600 mb-4">
              Ladda ner all din data som en JSON-fil. Du kan använda denna fil för backup eller
              för att flytta data till en annan dator.
            </p>
            <button
              onClick={handleExport}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              Exportera till JSON
            </button>
          </div>

          {/* Import */}
          <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-primary-300 transition-colors">
            <Upload className="h-8 w-8 text-primary-600 mb-4" />
            <h4 className="font-bold text-gray-900 mb-2">Importera data</h4>
            <p className="text-sm text-gray-600 mb-4">
              Ladda upp en tidigare exporterad JSON-fil för att återställa din data.
              <strong className="text-amber-600"> Detta kommer att ersätta all befintlig data.</strong>
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors cursor-pointer"
            >
              <Upload className="h-4 w-4" />
              Välj fil att importera
            </label>
          </div>
        </div>

        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <strong>Tips:</strong> Exportera din data regelbundet som backup. JSON-filen innehåller
              alla entiteter och relationer, men inte metamodellen (den är inbyggd i applikationen).
            </div>
          </div>
        </div>
      </div>

      {/* Reset Data */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <RefreshCw className="h-6 w-6 text-red-600" />
          <h3 className="text-lg font-bold text-gray-900">Återställ data</h3>
        </div>

        <div className="border-2 border-red-200 rounded-lg p-6">
          <AlertTriangle className="h-8 w-8 text-red-600 mb-4" />
          <h4 className="font-bold text-gray-900 mb-2">Farlig zon</h4>
          <p className="text-sm text-gray-600 mb-4">
            Återställ all data till ursprungliga exempeldata. Detta kommer att <strong>permanent ta bort</strong> alla
            ändringar du gjort. Exportera din data först om du vill spara den.
          </p>
          
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Återställ till ursprungsdata
            </button>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-300 rounded-lg">
                <p className="text-sm text-red-800 font-medium">
                  ⚠️ Är du helt säker? Detta går inte att ångra!
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  Ja, återställ allt
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Avbryt
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <Toast 
          message={toastMessage} 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
};

export default Settings;
