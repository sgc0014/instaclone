import {useEffect} from 'react'
import { useUser } from '../context/userContext'
import Router from 'next/router'

export function ProtectRoute(Component) {
    return () => {
        const { loadingUser, user } = useUser()
       

        useEffect(() => {
         
           let url = window.location.href.split('/')
           console.log(url)
           if(url[3] === 'chat' || ''){
            if (!loadingUser && !user){ Router.push('/signIn','/')}
           }
           
          

        }, [loadingUser, user])

        return (<Component {...arguments} />)
    }
}
