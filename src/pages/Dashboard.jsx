import { Link } from 'react-router-dom'
import { BriefcaseBusiness,CalendarClock,TrendingUp,Send,Plus,ArrowRight } from 'lucide-react'
import { useApp } from '../store/AppContext'
import { Card,StatBox,PageHeading,Button,Badge,EmptyState } from '../components/UI'

const statuses=['Applied','Interview','Offer','Rejected']

export default function Dashboard()
{
    const {applications,updateApplication}=useApp();
    
    const count=s=>applications.filter(a=>a.status===s).length;
    
    const responded=applications.filter(a=>a.status!=='Applied').length;
    
    const response=applications.length?Math.round(responded/applications.length*100):0;
    
    const upcoming=applications.filter(a=>a.status==='Interview').sort((a,b)=>a.appliedDate.localeCompare(b.appliedDate));

    return <><PageHeading eyebrow="Your command center" title="Job Hunt is going on." subtitle="A clear view of your job search, all in one place." action={<Link to="/applications/new">
        <Button><Plus size={16}/> Add application</Button>
        
        </Link>}/>
        
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatBox label="Total applications" value={applications.length} detail="Across your job search" icon={BriefcaseBusiness}/>
            
            <StatBox label="Interviews" value={count('Interview')} detail="Conversations in progress" icon={CalendarClock} tone="blue"/>
            
            <StatBox label="Offers" value={count('Offer')} detail="Offers on the table" icon={TrendingUp} tone="green"/>
            
            <StatBox label="Response rate" value={`${response}%`} detail={`${responded} responses from ${applications.length} applications`} icon={Send} tone="amber"/>
            
        </div>
        
        <div className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_1fr]">
            
            <Card className="p-6">
                
                <div className="mb-6 flex items-center justify-between">
                    
                    <div>
                        <h2 className="font-display text-lg font-extrabold">Application pipeline
                        </h2>
                    <p className="text-sm text-slate-500">Where each opportunity stands</p>
                    </div>
            
            <Link to="/applications" className="text-sm font-bold text-indigo-600">
            View all <ArrowRight className="inline" size={14}/></Link>
            </div>
            
            <div className="space-y-5">{statuses.map((s,i)=><div key={s}>
                <div className="mb-2 flex justify-between text-sm">
                    <span className="font-bold text-slate-700">{s}</span>
                    <span className="font-bold text-slate-500">{count(s)}</span>
            </div>
            
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                
                <div className={`h-full rounded-full ${['bg-blue-500','bg-violet-500','bg-emerald-500','bg-rose-400'][i]}`} style={{width:`${applications.length?count(s)/applications.length*100:0}%`}}/>
                </div>
            </div>)}
            </div>
            </Card>
            
            <Card className="p-6">
                <div className="mb-5">
                    <h2 className="font-display text-lg font-extrabold">Upcoming interviews</h2>
                    <p className="text-sm text-slate-500">Keep your next conversations close</p>
                    
                </div>
                {upcoming.length?
                <div className="space-y-4">{upcoming.slice(0,4).map(a=><div key={a.id} className="flex items-center gap-3 border-b border-slate-100 pb-4 last:border-0">
                    
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-xs font-extrabold text-violet-700">{a.company.slice(0,2).toUpperCase()}
                
                </div>
                
                <div className="min-w-0 flex-1">
                    
                    <Link to={`/applications/${a.id}`} className="font-bold text-slate-800 hover:text-indigo-600">{a.company}</Link>
                
                <p className="truncate text-xs text-slate-500">{a.role}</p>
                </div>
                
                <span className="text-xs font-semibold text-slate-400">{new Date(a.appliedDate+'T00:00:00').toLocaleDateString(undefined,{month:'short',day:'numeric'})}</span>
                
                </div>)}</div>
                :
                <EmptyState title="No interviews yet" description="Move an application to Interview to see it here."/>}
                
                </Card>
                </div>
                
                <div className="mt-8">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="font-display text-lg font-extrabold">Recently added
                        </h2>
                    <Link to="/applications" className="text-sm font-bold text-indigo-600">All applications</Link>
                    
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{applications.slice(0,3).map(a=>
                        <Card key={a.id} className="flex items-center justify-between p-4">
                            <div>
                            <Link to={`/applications/${a.id}`} className="font-bold hover:text-indigo-600">{a.company}</Link>
                            <p className="text-xs text-slate-500">{a.role}</p>
                            </div>

                    <Badge status={a.status}/>
                    </Card>)}
                    </div></div>
                    </>}