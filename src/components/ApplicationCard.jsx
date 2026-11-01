import { Link } from 'react-router-dom'
import { CalendarDays,MapPin,MoreHorizontal,ArrowUpRight } from 'lucide-react'
import { Badge,Card } from './UI'

export default function ApplicationCard({app,onStatusChange,onDelete})
{
    return <Card className="p-5 transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">

            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-indigo-50 text-sm font-extrabold text-indigo-700">{app.company.slice(0,2).toUpperCase()}
            </div>
            
            <div className="min-w-0"><Link to={`/applications/${app.id}`} className="block truncate font-extrabold text-slate-800 hover:text-indigo-600">{app.company}</Link>
            <p className="truncate text-sm text-slate-500">{app.role}</p>
            </div>
            
            </div>
            
            <button title="Delete application" onClick={()=>onDelete(app.id)} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><MoreHorizontal size={18}/>
            </button>
            </div>
            
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1"><CalendarDays size={13}/>{new Date(app.appliedDate+'T00:00:00').toLocaleDateString()}</span>{app.location&&<span className="flex items-center gap-1"><MapPin size={13}/>{app.location}</span>}</div><div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
                    <Badge status={app.status}/>
                    
                    <select value={app.status} onChange={e=>onStatusChange(app.id,e.target.value)} aria-label="Change application status" className="max-w-32 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-semibold text-slate-600">
                        <option>Applied</option>
                        <option>Interview</option>
                        <option>Offer</option>
                        <option>Rejected</option>
                    </select>
                    
                    </div>
                    <Link to={`/applications/${app.id}`} className="mt-3 flex items-center justify-end gap-1 text-xs font-bold text-indigo-600">View details <ArrowUpRight size={13}/></Link>
                    
                    </Card>
}