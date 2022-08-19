import { Outlet, Navigate } from 'react-router-dom'


const useAuth=()=>{
    const user=localStorage.getItem('token');
    if(user){
        return true
    } else {
        return false
    }
}

const PrivateRoutes = () => {
    let auth = {'token':useAuth()}
    return(
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes