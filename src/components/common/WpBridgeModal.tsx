import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertTriangle, RefreshCw, Server, Database, Trash2, Key } from 'lucide-react';
import { wpService } from '../../services/wpService';

interface WpBridgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WpBridgeModal: React.FC<WpBridgeModalProps> = ({ isOpen, onClose }) => {
  const [config, setConfig] = useState(wpService.getConfig());
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; latencyMs: number } | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [enquiries, setEnquiries] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      setConfig(wpService.getConfig());
      setEnquiries(wpService.getStoredEnquiries());
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    const res = await wpService.testConnection(config.apiBaseUrl);
    setTestResult(res);
    setIsTesting(false);
  };

  const handleSave = () => {
    wpService.setConfig(config);
    onClose();
  };

  const handleClearEnquiries = () => {
    if (confirm('Clear all local test enquiry submissions?')) {
      wpService.clearStoredEnquiries();
      setEnquiries([]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wp-bridge-title"
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <Server className="w-5 h-5 text-navy-900" aria-hidden="true" />
            <div>
              <h2 id="wp-bridge-title" className="text-base font-bold text-slate-900">
                WordPress CMS Bridge & Diagnostics
              </h2>
              <p className="text-xs text-slate-500">
                Configure REST API integration with Hostinger WordPress backend
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Connection Mode Selector */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block">
              Data Synchronization Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setConfig({ ...config, isLiveConnected: false })}
                className={`p-4 text-left rounded-lg border transition-all ${
                  !config.isLiveConnected
                    ? 'border-navy-900 bg-slate-50 ring-1 ring-navy-900'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-slate-900">Verified Fallback Archive</span>
                  {!config.isLiveConnected && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <p className="text-xs text-slate-500 leading-normal">
                  Uses verified historical GCE Centre 11409 records and structured offline data. Recommended for initial testing and demonstration.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setConfig({ ...config, isLiveConnected: true })}
                className={`p-4 text-left rounded-lg border transition-all ${
                  config.isLiveConnected
                    ? 'border-navy-900 bg-slate-50 ring-1 ring-navy-900'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-slate-900">Live WordPress REST API</span>
                  {config.isLiveConnected && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <p className="text-xs text-slate-500 leading-normal">
                  Connects dynamically to remote WordPress on Hostinger or custom domain to fetch published posts and pages.
                </p>
              </button>
            </div>
          </div>

          {/* WordPress API Base URL */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block">
              WordPress REST API Endpoint
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={config.apiBaseUrl}
                onChange={(e) => setConfig({ ...config, apiBaseUrl: e.target.value })}
                placeholder="https://pssnkwen.edu.cm/wp-json"
                className="flex-1 px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden font-mono text-xs"
              />
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting}
                className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5 shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                <span>Test Ping</span>
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Corresponds to standard WordPress REST endpoint: <code className="text-slate-700 bg-slate-100 px-1 py-0.5 rounded">/wp-json/wp/v2</code> and custom plugin routes <code className="text-slate-700 bg-slate-100 px-1 py-0.5 rounded">/wp-json/pss-nkwen/v1</code>.
            </p>

            {testResult && (
              <div
                className={`p-3 rounded-lg text-xs flex items-start gap-2.5 ${
                  testResult.success
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-amber-50 text-amber-900 border border-amber-200'
                }`}
              >
                {testResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-semibold">{testResult.success ? 'Endpoint Online' : 'Notice'}: </span>
                  {testResult.message}
                </div>
              </div>
            )}
          </div>

          {/* Form Submissions Log (Demonstrating working server/local enquiry persistence) */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Database className="w-4 h-4 text-slate-600" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Enquiry Submissions Stored Locally ({enquiries.length})
                </span>
              </div>
              {enquiries.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearEnquiries}
                  className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear Test Data</span>
                </button>
              )}
            </div>

            {enquiries.length === 0 ? (
              <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-md border border-slate-100">
                No admission enquiries submitted yet. You can submit one on the Admissions or Contact page to test client & server validation.
              </p>
            ) : (
              <div className="max-h-40 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-lg">
                {enquiries.map((enq, idx) => (
                  <div key={idx} className="p-3 text-xs space-y-1 bg-white">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">{enq.parentName || enq.fullName}</span>
                      <span className="text-slate-400 font-mono text-[10px]">{enq.referenceId}</span>
                    </div>
                    <div className="text-slate-600 flex gap-3">
                      <span>Tel: {enq.telephone}</span>
                      {enq.intendedClass && <span>Class: {enq.intendedClass}</span>}
                    </div>
                    <p className="text-slate-500 line-clamp-1 italic">"{enq.message}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* WordPress Plugin & Hostinger Reminder */}
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-navy-900" />
              <span>WordPress Plugin Ready in Codebase</span>
            </div>
            <p className="leading-normal">
              The custom plugin files are saved in <code className="bg-white px-1 py-0.5 rounded border border-slate-200">/wordpress-plugin/pss-nkwen-core/</code> with complete installation documentation in <code className="bg-white px-1 py-0.5 rounded border border-slate-200">/docs/HOSTINGER_DEPLOYMENT_GUIDE.md</code>.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-xl">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 text-xs font-semibold text-white bg-navy-900 hover:bg-navy-800 rounded-lg transition-colors"
          >
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
};
