import { useEffect,useState } from 'react'
import { Search,MapPin,Clock3,ExternalLink,BookmarkPlus,RefreshCw } from 'lucide-react'
import { useApp } from '../store/AppContext'
import { PageHeading,Card,Button,SearchBox,EmptyState } from '../components/UI'

export default function ExploreJobs()
{
    const {saveJob,savedJobs,addApplication}=useApp();
    
    const [jobs,setJobs]=useState([]),
    [loading,setLoading]=useState(true),
    [error,setError]=useState(''),
    [query,setQuery]=useState(''),
    [category,setCategory]=useState('software-dev');
    
    const fetchJobs=async()=>{setLoading(true);setError('');
    try{
        const url=new URL('https://remotive.com/api/remote-jobs');
        url.searchParams.set('category',category);
        
        if(query.trim())
            url.searchParams.set('search',query.trim());
            url.searchParams.set('limit','24');
            
        const res=await fetch(url);
        if(!res.ok)throw new Error('The jobs service returned an error.');
        
        const data=await res.json();
        
        setJobs(data.jobs||[])}catch(e){setError('Could not load live listings. Check your connection and try again.');
            
        setJobs([])}finally{setLoading(false)}};
        
        useEffect(()=>{fetchJobs()},[category]);
        
        const isSaved=job=>savedJobs.some(j=>j.id===String(job.id));
        
        const save=job=>
        {
            const normalized={id:String(job.id),company:job.company_name,role:job.title,location:jobCandidateLocation(job),url:job.url,appliedDate:new Date().toISOString().slice(0,10),status:'Applied',salaryMin:'',salaryMax:'',notes:`Saved from Remotive. ${job.job_type||''}`};
        
            saveJob({...normalized,description:job.description});
            
            addApplication(normalized)};
            
            return <><PageHeading eyebrow="Find your next move" title="Explore remote jobs" subtitle="Fresh remote opportunities from the Remotive public jobs API."/>
            
            <Card className="mb-6 p-4">
                <div className="grid gap-3 md:grid-cols-[1fr_190px_auto]">
                    <SearchBox value={query} onChange={setQuery} placeholder="Search job title or company..."/>
                    <select value={category} onChange={e=>setCategory(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm">
                        <option value="software-dev">Software development</option>
                        <option value="design">Design</option>
                        <option value="product">Product</option>
                        <option value="customer-support">Customer support</option>
                        <option value="marketing">Marketing</option>
                        <option value="data">Data</option>
                    </select>
                    
                    <Button onClick={fetchJobs}>
                        <Search size={15}/> Search jobs
                    </Button>
                    </div>
                    </Card>
                    
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-500">{loading?'Fetching live listings...':`${jobs.length} remote roles found`}</p>
                    
                    <Button variant="ghost" onClick={fetchJobs} disabled={loading}>
                        <RefreshCw size={15}/> Refresh
                    </Button>
                    </div>
                    {error&&<Card className="mb-4 p-5 text-sm text-rose-600">{error}</Card>}

                    {loading?
                    <div className="grid gap-4 md:grid-cols-2">{[1,2,3,4].map(x=>
                    <Card key={x} className="h-48 animate-pulse bg-slate-100"/>)}
                    </div>
                    :
                    jobs.length?
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {jobs.map(job=><Card key={job.id} className="flex flex-col p-5">
                            
                            <div className="mb-4 flex items-start gap-3">

                                <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-slate-100 text-sm font-extrabold text-slate-600">{job.company_logo?
                                    <img src={job.company_logo} alt="" className="h-full w-full object-contain"/>:
                                    job.company_name?.slice(0,2).toUpperCase()}
                                </div>
                                
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-extrabold leading-snug text-slate-800">{job.title}</h3>
                                    <p className="mt-1 text-sm text-slate-500">{job.company_name}</p>
                                    </div>
                                    </div>
                                    
                                    <div className="mb-4 flex flex-wrap gap-2 text-xs text-slate-500">
                                    <span className="rounded-lg bg-slate-50 px-2 py-1">
                                        <MapPin className="mr-1 inline" size={12}/>{job.candidate_required_location||'Remote'}</span>
                                    <span className="rounded-lg bg-slate-50 px-2 py-1">
                                        <Clock3 className="mr-1 inline" size={12}/>{job.job_type||'Full-time'}</span>
                                    
                                    </div>
                                    <p className="mb-5 line-clamp-3 flex-1 text-sm leading-6 text-slate-500" dangerouslySetInnerHTML={{__html:job.description?.replace(/<[^>]*>/g,' ').slice(0,190)+'...'}}/>
                                    
                                    <div className="mt-auto flex gap-2">
                                        <Button block onClick={()=>save(job)} disabled={isSaved(job)}>
                                            <BookmarkPlus size={15}/>{isSaved(job)?'Saved to tracker':'Save to tracker'}
                                        </Button>
                                        
                                        <a href={job.url} target="_blank" rel="noreferrer" className="grid place-items-center rounded-xl bg-slate-100 px-3 text-slate-600 hover:bg-slate-200" title="View listing">
                                        <ExternalLink size={16}/>
                                        </a>
                                        </div>
                                        </Card>)}
                                        </div>:
                                        <Card><EmptyState title="No jobs found" description="Try another keyword or category."/>
                                        </Card>}
                                        
                                        <p className="mt-6 text-xs leading-5 text-slate-400">
                                            Listings are provided by Remotive. Saving a listing adds it to your Applications as an Applied opportunity. Some API responses may be cached by the provider.
                                        </p>
                                        </>
                                        }

                                        function jobCandidateLocation(job)
                                        {return job.candidate_required_location||'Remote'}
