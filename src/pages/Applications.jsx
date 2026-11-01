import { useMemo,useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus,SlidersHorizontal } from 'lucide-react'
import { useApp } from '../store/AppContext'
import { PageHeading,Button,SearchBox,Card,EmptyState,Modal } from '../components/UI'
import ApplicationCard from '../components/ApplicationCard'

export default function Applications()
{
    const {applications,updateApplication,deleteApplication}=useApp();
    
    const [search,setSearch]=useState(''),
    [status,setStatus]=useState('All'),
    [sort,setSort]=useState('newest'),
    [confirm,setConfirm]=useState(null);
    
    const filtered=useMemo(()=>applications.filter(a=>(status==='All'||a.status===status)&&a.company.toLowerCase().includes(search.toLowerCase())).sort((a,b)=>sort==='newest'?b.appliedDate.localeCompare(a.appliedDate):a.appliedDate.localeCompare(b.appliedDate)),[applications,status,search,sort]);
    
    return <>
    <PageHeading eyebrow="All opportunities" title="Applications" subtitle={`${applications.length} opportunities tracked so far.`} 
    action={<Link to="/applications/new">
    <Button><Plus size={16}/> Add application</Button>
    </Link>}/>
    
    <Card className="mb-6 p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_190px_170px]">
            
        <SearchBox value={search} onChange={setSearch} placeholder="Search by company..."/>
        
        <select value={status} onChange={e=>setStatus(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm">
            <option>All</option>
            {['Applied','Interview','Offer','Rejected'].map(s=>
            <option key={s}>{s}</option>)}
        </select>
        
        <select value={sort} onChange={e=>setSort(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm">
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
        </select>
        </div>
        </Card>
        {filtered.length?
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map(a=><ApplicationCard key={a.id} app={a} onStatusChange={updateApplication} onDelete={setConfirm}/>)}
        </div>:
        <Card>
            <EmptyState title="No matching applications" description="Try changing your filters or add a new application." action={<Link to="/applications/new">
            <Button><Plus size={15}/> Add application</Button>
            </Link>}/>
        </Card>}
        <Modal open={!!confirm} onClose={()=>setConfirm(null)} title="Delete application?">
            <p className="text-sm text-slate-500">This will permanently remove this application and its notes from your tracker.</p>
        <div className="mt-6 flex justify-end gap-2">
            <Button variant="ghost" onClick={()=>setConfirm(null)}>Cancel</Button>
            <Button variant="danger" onClick={()=>{deleteApplication(confirm);setConfirm(null)}}>Delete</Button>
        </div>
        </Modal></>}