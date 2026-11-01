import { useState } from 'react'
import { X, Search, BriefcaseBusiness, Plus, ArrowUpRight } from 'lucide-react'

export function Card({children,className=''})
{
    return <div className={`bg-white border border-slate-100 rounded-2xl shadow-soft ${className}`}>{children}</div>
}

export function Badge({status})
{
    const styles={Applied:'bg-blue-50 text-blue-700',Interview:'bg-violet-50 text-violet-700',Offer:'bg-emerald-50 text-emerald-700',Rejected:'bg-rose-50 text-rose-700'};
    return <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${styles[status]||'bg-slate-100 text-slate-600'}`}>{status}
    </span>
}

export function Button({children,variant='primary',...props})

{
    const base='inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition disabled:opacity-50';
    const styles=variant==='primary'?'bg-indigo-600 text-white hover:bg-indigo-700':variant==='danger'?'bg-rose-50 text-rose-600 hover:bg-rose-100':'bg-slate-100 text-slate-700 hover:bg-slate-200';
    
    return <button className={`${base} ${styles}`} {...props}>{children}</button>
}

export function StatBox({label,value,detail,icon:Icon,tone='indigo'})
{
    const colors={indigo:'bg-indigo-50 text-indigo-600',blue:'bg-sky-50 text-sky-600',green:'bg-emerald-50 text-emerald-600',amber:'bg-amber-50 text-amber-600'};
    
    return <Card className="p-5"><div className="flex items-center justify-between"><span className="text-sm font-semibold text-slate-500">{label}</span><span className={`p-2.5 rounded-xl ${colors[tone]}`}><Icon size={18}/></span></div><div className="mt-4 text-3xl font-extrabold tracking-tight">{value}</div><p className="mt-1 text-xs text-slate-400">{detail}</p></Card>
}

export function EmptyState({title='Nothing here yet',description='Add your first item to get started.',action})
{
    return <div className="py-14 text-center">
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
            <BriefcaseBusiness/>
        </div>
        <h3 className="font-bold text-slate-800">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
        {action&&<div className="mt-4">{action}</div>}
        </div>
}

export function FormInput({label,error,...props})
{
    return <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-slate-600">{label}</span>
        <input className={`w-full rounded-xl border bg-white px-3.5 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 ${error?'border-rose-300':'border-slate-200'}`} {...props}/>
        {error&&<span className="mt-1 block text-xs text-rose-500">{error}</span>}
        </label>
}

export function Modal({open,onClose,title,children})
{
    if(!open)return null;
    return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-extrabold">{title}</h2>
    <button onClick={onClose} className="rounded-lg p-2 hover:bg-slate-100"><X size={18}/>
    </button>
    </div>{children}</div>
    </div>
}

export function SearchBox({value,onChange,placeholder='Search...'})
{
    return <div className="relative"><Search className="absolute left-3 top-3 text-slate-400" size={17}/><input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-indigo-400"/>
    </div>
}

export function PageHeading({eyebrow,title,subtitle,action})
{
    return <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="mb-1 text-xs font-extrabold uppercase tracking-[.16em] text-indigo-600">{eyebrow}</p>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>{action}
        </div>
}

export function IconLink({href,children})
{
    return <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-800">{children}
    <ArrowUpRight size={14}/></a>
}
