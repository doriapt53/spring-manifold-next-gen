import { useState } from 'react'
import { 
  LayoutDashboard, 
  PlayCircle, 
  Plug2, 
  Activity, 
  Settings, 
  Menu,
  X,
  Database,
  Search,
  ChevronRight
} from 'lucide-react'
import Dashboard from './components/Dashboard'
import JobTable from './components/JobTable'
import ConnectorForm from './components/ConnectorForm'

type View = 'dashboard' | 'jobs' | 'connectors' | 'logs' | 'settings'

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'jobs', label: 'Job Management', icon: PlayCircle },
    { id: 'connectors', label: 'Connectors', icon: Plug2 },
    { id: 'logs', label: 'Real-time Logs', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside className={`
        ${isSidebarOpen ? 'w-64' : 'w-20'} 
        transition-all duration-300 ease-in-out
        bg-card border-r border-border flex flex-col
      `}>
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
            <Search className="w-6 h-6 text-primary-foreground" />
          </div>
          {isSidebarOpen && (
            <span className="font-bold text-lg tracking-tight whitespace-nowrap">
              Spring-Manifold
            </span>
          )}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={`
                w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                ${activeView === item.id 
                  ? 'bg-primary/10 text-primary border border-primary/20' 
                  : 'text-muted hover:bg-secondary hover:text-foreground'}
              `}
            >
              <item.icon className="w-5 h-5 min-w-[20px]" />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-md hover:bg-secondary"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-muted text-sm">
            <span>Admin</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium capitalize">{activeView}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium border border-green-500/20">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              System Healthy
            </div>
            <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center">
              <span className="text-xs font-bold">PL</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {activeView === 'dashboard' && <Dashboard />}
          {activeView === 'jobs' && <JobTable />}
          {activeView === 'connectors' && <ConnectorForm />}
          {activeView === 'logs' && (
            <div className="h-full flex flex-col gap-4">
               <h1 className="text-2xl font-bold">Real-time Activity Logs</h1>
               <div className="flex-1 bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-y-auto border border-border text-slate-300">
                  <p className="text-blue-400">[2026-05-15 10:24:12] INFO: Job 'WebCrawler_01' started.</p>
                  <p className="text-slate-500">[2026-05-15 10:24:13] DEBUG: Fetching https://example.com/page1</p>
                  <p className="text-green-400">[2026-05-15 10:24:14] SUCCESS: Indexed document 'https://example.com/page1' into Ollama Vector Store.</p>
                  <p className="text-slate-500">[2026-05-15 10:24:15] DEBUG: Fetching https://example.com/page2</p>
                  <p className="text-yellow-400">[2026-05-15 10:24:16] WARN: Skipping duplicate 'https://example.com/page1'</p>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
