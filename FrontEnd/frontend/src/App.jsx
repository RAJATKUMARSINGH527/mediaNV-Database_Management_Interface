import React, { useState } from 'react';
import axios from 'axios';
import { PlusCircle, CheckCircle, ArrowRightLeft, Terminal, ShieldCheck, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [newDb, setNewDb] = useState("");
  const [checkDb, setCheckDb] = useState("");
  const [migration, setMigration] = useState({ from: "", to: "" });
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const addLog = (msg, type = "info") => {
    setLogs(prev => [{ msg, type, time: new Date().toLocaleTimeString() }, ...prev]);
  };

  const handleAction = async (type, payload) => {
    if (!payload || (typeof payload === 'object' && Object.values(payload).some(v => !v))) {
      addLog("Please fill all fields", "error");
      return;
    }

    setLoading(true);
    try {
      addLog(`Initiating ${type}...`, "info");
      const res = await axios.post(`${API_URL}/api/db/${type}`, payload);
      addLog(res.data.message || "Action Successful", "success");
    } catch (err) {
      addLog(err.response?.data?.error || "Connection Failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-indigo-500/30 p-4 sm:p-6 md:p-10 font-sans overflow-x-hidden relative">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] md:w-[40%] h-[40%] bg-indigo-600/20 blur-[80px] md:blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] md:w-[40%] h-[40%] bg-emerald-600/10 blur-[80px] md:blur-[120px] rounded-full"></div>
      </div>

      <header className="max-w-6xl mx-auto mb-8 md:mb-12 text-center relative z-10">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] sm:text-xs font-bold mb-4">
            <ShieldCheck size={14} /> SYSTEM SECURE & ACTIVE
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 bg-linear-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
            Database Forge
          </h1>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Professional PostgreSQL Management Interface. Create, Validate, and Migrate with high-integrity automation.
          </p>
        </motion.div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10 items-start">
        
        {/* Left Column: Actions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            <Card title="New Database" icon={<PlusCircle className="text-emerald-400" />}>
              <input 
                className="w-full bg-slate-900/50 border border-slate-700 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all mb-4 text-sm"
                placeholder="database_name"
                value={newDb}
                onChange={(e) => setNewDb(e.target.value)}
              />
              <button 
                disabled={loading}
                onClick={() => handleAction('create', { name: newDb })}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 text-sm"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : "Create Instance"}
              </button>
            </Card>

            <Card title="Verify Existence" icon={<CheckCircle className="text-blue-400" />}>
              <input 
                className="w-full bg-slate-900/50 border border-slate-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-500/50 outline-none transition-all mb-4 text-sm"
                placeholder="search_database"
                value={checkDb}
                onChange={(e) => setCheckDb(e.target.value)}
              />
              <button 
                disabled={loading}
                onClick={() => handleAction('check', { name: checkDb })}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-3 rounded-lg font-bold shadow-lg shadow-blue-900/20 transition-all text-sm"
              >
                {loading ? "Checking..." : "Check Status"}
              </button>
            </Card>
          </div>

          <Card title="Data Migration Engine" icon={<ArrowRightLeft className="text-indigo-400" />} wide>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-[10px] text-slate-500 uppercase font-bold px-1">Source Database</label>
                <input 
                  className="w-full bg-slate-900/50 border border-slate-700 p-3 rounded-lg outline-none focus:border-indigo-500 text-sm"
                  onChange={(e) => setMigration({...migration, from: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-slate-500 uppercase font-bold px-1">Target Database</label>
                <input 
                  className="w-full bg-slate-900/50 border border-slate-700 p-3 rounded-lg outline-none focus:border-indigo-500 text-sm"
                  onChange={(e) => setMigration({...migration, to: e.target.value})}
                />
              </div>
            </div>
            <button 
              disabled={loading}
              onClick={() => handleAction('migrate', migration)}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white py-3 md:py-4 rounded-lg font-black tracking-widest uppercase shadow-xl shadow-indigo-900/40 transition-all flex items-center justify-center gap-3 text-xs md:text-sm"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Execute Full Migration"}
            </button>
          </Card>
        </div>

        {/* Right Column: Terminal Logs */}
        <div className="lg:col-span-5">
          <div className="bg-[#020617] rounded-2xl border border-slate-800 h-100 lg:h-125 flex flex-col shadow-2xl overflow-hidden sticky top-6">
            <div className="bg-slate-800/50 p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-indigo-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Activity Console</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
              </div>
            </div>
            <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-3 font-mono text-[11px] md:text-sm">
              <AnimatePresence>
                {logs.map((log, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    key={`${log.time}-${i}`} 
                    className={`flex gap-2 sm:gap-3 ${log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-emerald-400' : 'text-slate-400'}`}
                  >
                    <span className="opacity-30 shrink-0">[{log.time}]</span>
                    <span className="shrink-0">{log.type === 'error' ? '✘' : log.type === 'success' ? '✔' : '▶'}</span>
                    <span className="break-all">{log.msg}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {logs.length === 0 && <div className="text-slate-700 italic">Waiting for operations...</div>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Card({ title, icon, children, wide }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      // 'h-full' ko remove kiya gaya hai taaki extra space na bane
      className={`bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-5 md:p-6 rounded-2xl shadow-xl ${wide ? 'w-full' : ''}`}
    >
      <div className="flex items-center gap-3 mb-5 md:mb-6">
        <div className="p-2 bg-slate-900 rounded-lg border border-slate-700 shrink-0">{icon}</div>
        <h3 className="font-bold text-slate-100 text-sm md:text-base">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

export default App;