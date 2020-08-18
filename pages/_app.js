import '../styles/globals.css'

import { Provider } from 'mobx-react'
import { useStore } from '../store'


export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
    
      <Component {...pageProps} />
     
    </Provider>
  )
}