import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function usePrivateAccessLayoutAuthorizer() {

    const navigate = useNavigate()

    useEffect(()=>{
        navigate?.('/bim-viewer')
    },[])

    return {}
}