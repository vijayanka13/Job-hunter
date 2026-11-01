import { useEffect,useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { useApp } from '../store/AppContext'
import { PageHeading,Card,FormInput,Button } from '../components/UI'

const blank={company:'',role:'',status:'Applied',appliedDate:new Date().toISOString().slice(0,10),salaryMin:'',salaryMax:'',location:'Remote',url:'',notes:''}

export default function ApplicationForm()
{
    const {id}=useParams();
    const navigate=useNavigate();
    const {applications,addApplication,updateApplication}=useApp();
    const existing=applications.find(a=>a.id===id);
    const [form,setForm]=useState(blank);
    const [error,setError]=useState('');

    useEffect(()=>{if(existing)setForm({...blank,...existing})},[id]);
    
    const change=e=>setForm(p=>({...p,[e.target.name]:e.target.value}));
    
    const submit=e=>{e.preventDefault();
        if(!form.company.trim()||!form.role.trim())
            {
                setError('Company and role are required.');
                return
            }
            if(id)updateApplication(id,form);
            else addApplication(form);
            navigate('/applications')};

            return <><PageHeading eyebrow="Keep it organized" title={id?'Edit application':'Add an application'} subtitle="Capture the details now. You can update the status as things move along."/>
            {!existing&&id?
            <Card className="p-6">Application not found.</Card>:
            <Card className="max-w-3xl p-6 md:p-8">
                <form onSubmit={submit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                        
                        <FormInput label="Company *" name="company" value={form.company} onChange={change} placeholder="e.g. Acme Inc."/>
                        
                        <FormInput label="Role *" name="role" value={form.role} onChange={change} placeholder="e.g. Frontend Developer"/>
                        <label className="block">
                            <span className="mb-1.5 block text-sm font-semibold text-slate-600">Status</span>
                        <select name="status" value={form.status} onChange={change} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm">
                            <option>Applied</option>
                            <option>Interview</option>
                            <option>Offer</option>
                            <option>Rejected</option>
                        </select>
                        </label>
                        
                        <FormInput label="Applied date" name="appliedDate" type="date" value={form.appliedDate} onChange={change}/>
                        
                        <FormInput label="Salary minimum" name="salaryMin" type="number" value={form.salaryMin} onChange={change} placeholder="e.g. 80000"/>
                        
                        <FormInput label="Salary maximum" name="salaryMax" type="number" value={form.salaryMax} onChange={change} placeholder="e.g. 110000"/>
                        
                        <FormInput label="Location" name="location" value={form.location} onChange={change} placeholder="Remote / City"/>
                        
                        <FormInput label="Job URL" name="url" type="url" value={form.url} onChange={change} placeholder="https://..."/>
                        
                        </div>
                        
                        <label className="block"><span className="mb-1.5 block text-sm font-semibold text-slate-600">Notes</span>
                        
                        <textarea name="notes" rows="4" value={form.notes} onChange={change} placeholder="What should you remember about this opportunity?" className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"/>
                        
                        </label>{error&&<p className="text-sm text-rose-600">{error}</p>}
                        
                        <div className="flex justify-end gap-2 border-t border-slate-100 pt-5">
                            
                        <Button type="button" variant="ghost" onClick={()=>navigate(-1)}>Cancel
                        </Button>
                        
                        <Button type="submit">{id?'Save changes':'Add application'}</Button>
                        
                        </div>
                      </form>
                    </Card>}
                </>}