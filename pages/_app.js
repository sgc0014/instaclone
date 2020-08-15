import '../styles/globals.css'

import { Provider } from 'react-redux'
import { useStore } from './store'

import Layout  from '../component/layout'


export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
    
      <Component {...pageProps} />
     
    </Provider>
  )
}