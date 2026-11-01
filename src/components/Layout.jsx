import { NavLink,Outlet } from 'react-router-dom'
import { LayoutDashboard,BriefcaseBusiness,Compass,Plus,PanelLeftClose } from 'lucide-react'

const links=[['/', 'Overview',LayoutDashboard],['/applications','Applications',BriefcaseBusiness],['/explore','Explore jobs',Compass]]

export default function Layout()
{
    return <div className="min-h-screen bg-[#f7f8fc] md:flex">
        <aside className="hidden w-64 shrink-0 border-r border-slate-200/70 bg-white p-6 md:flex md:flex-col">
        <a href="/" className="mb-10 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white">
            <BriefcaseBusiness size={20}/>
        </div>
        <div>
            <div className="font-display text-lg font-extrabold">Job Hunter<span className="text-indigo-600">.</span>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Your career workspace</div>
        </div>
        </a>
        <p className="mb-3 px-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-slate-400">Workspace</p>
        
        <nav className="space-y-1">{links.map(([to,label,Icon])=><NavLink key={to} to={to} end className={({isActive})=>`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition ${isActive?'bg-indigo-50 text-indigo-700':'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}><Icon size={18}/>{label}</NavLink>)}</nav>
        
        <div className="mt-auto rounded-2xl bg-slate-50 p-4">
            <div className="mb-2 text-xs font-extrabold text-slate-700">Small steps, big moves.
            </div>
        <p className="text-xs leading-5 text-slate-500">Keep your search organized and make every follow-up count.</p>
        </div>
        </aside>
        
        <div className="min-w-0 flex-1">
            <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200/70 bg-white/90 px-5 backdrop-blur md:px-9">
            <div className="flex items-center gap-2 md:hidden"><BriefcaseBusiness className="text-indigo-600"/><b>careerly.</b>
        </div>
        <div className="hidden text-sm font-semibold text-slate-500 md:block">Your next opportunity starts here.</div>
        <div className="flex items-center gap-3"><span className="hidden text-xs font-semibold text-slate-400 sm:block">JOB SEARCH HQ</span>
        <div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-100 text-xs font-extrabold text-indigo-700">JD</div>
        </div>
        </header>
        <nav className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-white px-4 py-2 md:hidden">{links.map(([to,label,Icon])=><NavLink key={to} to={to} end className={({isActive})=>`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold ${isActive?'bg-indigo-50 text-indigo-700':'text-slate-500'}`}><Icon size={15}/>{label}</NavLink>)}</nav>
        
        <main className="mx-auto max-w-7xl p-5 md:p-9"><Outlet/></main>
        </div>
        </div>
}