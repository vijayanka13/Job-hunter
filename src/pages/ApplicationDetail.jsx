import { useState } from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import { ArrowLeft,CalendarDays,MapPin,ExternalLink,Edit3,Plus,Clock3,Trash2 } from 'lucide-react'
import { useApp } from '../store/AppContext'
import { PageHeading,Card,Badge,Button,EmptyState,Modal } from '../components/UI'

export default function ApplicationDetail()
{
    const {id}=useParams(),
    navigate=useNavigate();
    const {applications,addNote,deleteApplication}=useApp();
    const app=applications.find(a=>a.id===id);
    const [note,setNote]=useState(''),[confirm,setConfirm]=useState(false);if(!app)return 
    
    <Card className="p-8"><EmptyState title="Application not found" action={<Link to="/applications"><Button>Back to applications</Button></Link>}/>
    </Card>;
    
    const remove=()=>{deleteApplication(id);navigate('/applications')};
    
    return <><button onClick={()=>navigate(-1)} className="mb-5 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600"><ArrowLeft size={16}/> Back</button>
    
    <PageHeading eyebrow="Application details" title={app.company} subtitle={app.role}
     action={<div className="flex gap-2"><Link to={`/applications/${id}/edit`}>
        <Button variant="ghost"><Edit3 size={15}/> Edit</Button></Link>
        
        <Button variant="danger" onClick={()=>setConfirm(true)}><Trash2 size={15}/> Delete</Button>
        </div>}/>
        
        <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <div className="space-y-6">
                <Card className="p-6">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <h2 className="font-display text-lg font-extrabold">Opportunity overview
                        </h2>
                        <Badge status={app.status}/>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                        {[['Applied date',new Date(app.appliedDate+'T00:00:00').toLocaleDateString(),CalendarDays],['Location',app.location||'Not specified',MapPin],['Salary range',app.salaryMin||app.salaryMax?`${app.salaryMin||'—'} – ${app.salaryMax||'—'}`:'Not specified',Clock3]].map(([label,value,Icon])=><div key={label}>
                            
                        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
                        
                        <p className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <Icon size={15} className="text-slate-400"/>{value}
                        </p>
                        </div>)}
                        </div>
                        {app.url&&<div className="mt-5 border-t border-slate-100 pt-4">
                            <a href={app.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600">Open job posting <ExternalLink size={14}/>
                            </a>
                        </div>}
                        
                        <div className="mt-5 border-t border-slate-100 pt-4">
                            
                            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Application notes</p>
                            
                            <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">{app.notes||'No notes added yet.'}</p>
                        </div>
                        </Card>
                        
                        <Card className="p-6">
                            <h2 className="font-display text-lg font-extrabold">Notes timeline
                            </h2>
                            <p className="mb-5 text-sm text-slate-500">A dated record of your progress and follow-ups.
                            </p>
                            
                            <form onSubmit={e=>{e.preventDefault();if(note.trim()){addNote(id,note.trim());setNote('')}}} className="mb-6">
                                
                                <textarea value={note} onChange={e=>setNote(e.target.value)} rows="3" placeholder="Add a call summary, follow-up reminder, or update..." className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"/>
                                    
                                <div className="mt-2 flex justify-end">
                                <Button type="submit" disabled={!note.trim()}><Plus size={15}/> Add dated note</Button>
                                </div>
                            </form>
                            
                            {app.timeline?.length?<div className="space-y-4">{[...app.timeline].reverse().map(n=><div key={n.id} className="relative border-l-2 border-indigo-100 pb-2 pl-5 last:pb-0">
                                
                                <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-white bg-indigo-500"/>
                                
                                <p className="mb-1 text-xs font-bold text-indigo-600">{new Date(n.date+'T00:00:00').toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})}</p>
                                <p className="text-sm leading-6 text-slate-600">{n.text}
                                </p>
                                </div>)}
                                </div>:<p className="text-sm text-slate-400">No timeline notes yet. Add your first update above.</p>}
                                
                                </Card>
                                </div>
                                
                                <Card className="h-fit p-6">
                                    <h2 className="mb-4 font-display text-lg font-extrabold">Update status</h2>
                                
                                <div className="space-y-2">{['Applied','Interview','Offer','Rejected'].map(s=><button key={s} onClick={()=>{import('../store/AppContext').then(()=>{})}} className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-bold ${app.status===s?'border-indigo-200 bg-indigo-50 text-indigo-700':'border-slate-100 text-slate-500 hover:bg-slate-50'}`}>{s}{app.status===s?' · Current':''}</button>)}
                                
                                </div>
                                <p className="mt-4 text-xs leading-5 text-slate-400">
                                    You can also update status from the Applications cards.
                                </p>
                                </Card>
                                </div>
                                
                                <Modal open={confirm} onClose={()=>setConfirm(false)} title="Delete this application?">
                                    <p className="text-sm text-slate-500">This also deletes its notes timeline.</p>
                                
                                <div className="mt-5 flex justify-end gap-2">
                                    
                                <Button variant="ghost" onClick={()=>setConfirm(false)}>Cancel
                                </Button>
                                
                                <Button variant="danger" onClick={remove}>Delete application
                                </Button>
                                </div>
                                </Modal>
                                </>
                            }