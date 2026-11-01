import { createContext, useContext, useEffect, useMemo, useState } from 'react'
const AppContext = createContext(null)
const seed = [
 {id:'a1',company:'Linear',role:'Frontend Engineer',status:'Interview',appliedDate:'2026-10-24',salaryMin:'90000',salaryMax:'120000',notes:'Strong product focus. Prepare component architecture examples.',location:'Remote',url:'https://linear.app',createdAt:'2026-10-24T10:00:00.000Z',timeline:[{id:'n1',date:'2026-10-25',text:'Recruiter reached out to schedule an initial call.'},{id:'n2',date:'2026-10-28',text:'Completed recruiter screen. Waiting for technical round details.'}]},
 {id:'a2',company:'Notion',role:'React Developer',status:'Applied',appliedDate:'2026-10-29',salaryMin:'80000',salaryMax:'110000',notes:'Tailor portfolio around collaborative UI.',location:'Remote',url:'https://notion.so',createdAt:'2026-10-29T10:00:00.000Z',timeline:[]},
 {id:'a3',company:'Vercel',role:'UI Engineer',status:'Offer',appliedDate:'2026-10-12',salaryMin:'110000',salaryMax:'145000',notes:'Review offer and benefits.',location:'Remote',url:'https://vercel.com',createdAt:'2026-10-12T10:00:00.000Z',timeline:[{id:'n3',date:'2026-10-30',text:'Offer received — reviewing compensation and start date.'}]},
 {id:'a4',company:'Figma',role:'Product Engineer',status:'Rejected',appliedDate:'2026-10-03',salaryMin:'95000',salaryMax:'130000',notes:'Ask for feedback if possible.',location:'Remote',url:'https://figma.com',createdAt:'2026-10-03T10:00:00.000Z',timeline:[]}
]
export function AppProvider({children}) {
 const [applications,setApplications] = useState(()=>JSON.parse(localStorage.getItem('careerly-applications')||'null')||seed)
 const [savedJobs,setSavedJobs] = useState(()=>JSON.parse(localStorage.getItem('careerly-saved-jobs')||'[]'))
 useEffect(()=>localStorage.setItem('careerly-applications',JSON.stringify(applications)),[applications])
 useEffect(()=>localStorage.setItem('careerly-saved-jobs',JSON.stringify(savedJobs)),[savedJobs])
 const addApplication = data => setApplications(prev=>[{...data,id:crypto.randomUUID(),createdAt:new Date().toISOString(),timeline:[]},...prev])
 const updateApplication = (id,data)=>setApplications(prev=>prev.map(a=>a.id===id?{...a,...data}:a))
 const deleteApplication = id=>setApplications(prev=>prev.filter(a=>a.id!==id))
 const addNote = (id,text)=>setApplications(prev=>prev.map(a=>a.id===id?{...a,timeline:[...(a.timeline||[]),{id:crypto.randomUUID(),date:new Date().toISOString().slice(0,10),text}]}:a))
 const saveJob = job=>setSavedJobs(prev=>prev.some(j=>j.id===job.id)?prev:[job,...prev])
 const value=useMemo(()=>({applications,savedJobs,addApplication,updateApplication,deleteApplication,addNote,saveJob}),[applications,savedJobs])
 return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export const useApp=()=>useContext(AppContext)
