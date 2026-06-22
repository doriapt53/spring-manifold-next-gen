import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'
import { 
  PlayCircle, 
  CheckCircle2, 
  AlertCircle, 
  Database,
  Server,
  Zap
} from 'lucide-react'

const data = [
  { name: '08:00', docs: 400 },
  { name: '09:00', docs: 800 },
  { name: '10:00', docs: 1200 },
  { name: '11:00', docs: 900 },
  { name: '12:00', docs: 1500 },
  { name: '13:00', docs: 2100 },
  { name: '14:00', docs: 1800 },
]

const stats = [
  { label: 'Active Jobs', value: '12', icon: PlayCircle, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { label: 'Indexed Documents', value: '1,240,532', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
  { label: 'Service Alerts', value: '0', icon: AlertCircle, color: 'text-slate-400', bg: 'bg-slate-400/10' },
  { label: 'Vector Store Size', value: '4.2 GB', icon: Database, color: 'text-blue-500', bg: 'bg-blue-500/10' },
]

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <div className="flex gap-2">
           <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-md border border-slate-700 text-xs font-medium">
              <Server className="w-3.5 h-3.5 text-blue-400" />
              <span>Postgres: UP</span>
           </div>
           <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-md border border-slate-700 text-xs font-medium">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span>Redis: UP</span>
           </div>
           <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-md border border-slate-700 text-xs font-medium">
              <Activity className="w-3.5 h-3.5 text-purple-400" />
              <span>Ollama: UP</span>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="card-container flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-container">
          <h3 className="text-lg font-semibold mb-6">Ingestion Throughput (docs/sec)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorDocs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#06b6d4' }}
                />
                <Area type="monotone" dataKey="docs" stroke="#06b6d4" fillOpacity={1} fill="url(#colorDocs)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-container">
          <h3 className="text-lg font-semibold mb-6">Connector Performance</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Bar dataKey="docs" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

function Activity(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}
