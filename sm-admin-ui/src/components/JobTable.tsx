import { 
  Play, 
  Pause, 
  Square, 
  RefreshCcw, 
  MoreHorizontal,
  ChevronDown,
  Search,
  Filter
} from 'lucide-react'

type JobStatus = 'Running' | 'Paused' | 'Error' | 'Finished' | 'Ready'

interface Job {
  id: string
  name: string
  type: string
  status: JobStatus
  documents: number
  lastRun: string
}

const jobs: Job[] = [
  { id: '1', name: 'WebCrawler_Sito_A', type: 'Repository', status: 'Running', documents: 12450, lastRun: '2026-05-15 09:30' },
  { id: '2', name: 'FS_Sync_Docs', type: 'Repository', status: 'Paused', documents: 890, lastRun: '2026-05-14 18:20' },
  { id: '3', name: 'SharePoint_Cloud', type: 'Authority', status: 'Error', documents: 0, lastRun: '2026-05-15 08:15' },
  { id: '4', name: 'Slack_History', type: 'Output', status: 'Finished', documents: 56200, lastRun: '2026-05-14 12:00' },
  { id: '5', name: 'Jira_Tickets', type: 'Repository', status: 'Ready', documents: 0, lastRun: 'N/A' },
]

const statusStyles: Record<JobStatus, string> = {
  Running: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  Paused: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  Error: 'bg-red-500/10 text-red-500 border-red-500/20',
  Finished: 'bg-green-500/10 text-green-500 border-green-500/20',
  Ready: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

export default function JobTable() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Job Management</h1>
          <p className="text-muted text-sm">Monitor and control your data ingestion pipelines.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="btn-secondary flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
           </button>
           <button className="btn-primary flex items-center gap-2">
              <Play className="w-4 h-4 fill-current" />
              Run All
           </button>
        </div>
      </div>

      <div className="card-container !p-0 overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-4 bg-slate-900/50">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input 
              type="text" 
              placeholder="Search jobs..." 
              className="w-full bg-background border border-border rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <span>Show:</span>
            <button className="flex items-center gap-1 hover:text-foreground">
              All <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 border-b border-border text-xs uppercase tracking-wider text-muted">
                <th className="px-6 py-4 font-semibold">Job Name</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Documents</th>
                <th className="px-6 py-4 font-semibold">Last Run</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{job.name}</div>
                    <div className="text-xs text-muted truncate max-w-[200px]">ID: {job.id}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted">{job.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[job.status]}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-mono">
                    {job.documents.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted">
                    {job.lastRun}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 rounded-md hover:bg-cyan-500/10 hover:text-cyan-500 transition-colors" title="Start">
                        <Play className="w-4 h-4 fill-current" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-yellow-500/10 hover:text-yellow-500 transition-colors" title="Pause">
                        <Pause className="w-4 h-4 fill-current" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-red-500/10 hover:text-red-500 transition-colors" title="Stop">
                        <Square className="w-4 h-4 fill-current" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-slate-700 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted">
           <span>Showing 5 of 12 jobs</span>
           <div className="flex gap-2">
              <button className="px-3 py-1 border border-border rounded hover:bg-secondary disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 border border-border rounded hover:bg-secondary">Next</button>
           </div>
        </div>
      </div>
    </div>
  )
}
