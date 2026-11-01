import { Routes,Route,Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Applications from './pages/Applications'
import ApplicationForm from './pages/ApplicationForm'
import ApplicationDetail from './pages/ApplicationDetail'
import ExploreJobs from './pages/ExploreJobs'
export default function App(){return <Routes><Route element={<Layout/>}><Route index element={<Dashboard/>}/><Route path="applications" element={<Applications/>}/><Route path="applications/new" element={<ApplicationForm/>}/><Route path="applications/:id" element={<ApplicationDetail/>}/><Route path="applications/:id/edit" element={<ApplicationForm/>}/><Route path="explore" element={<ExploreJobs/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Route></Routes>}