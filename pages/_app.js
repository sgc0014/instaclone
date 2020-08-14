import '../styles/globals.css'

import { Provider } from 'react-redux'
import { useStore } from './store'
import Navbar from '../component/navbar'


export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
     <Navbar/>
      <Component {...pageProps} />
    </Provider>
  )
}