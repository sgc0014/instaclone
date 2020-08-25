import '../styles/globals.css'
import "mobx-react-lite/batchingForReactDom";
import { Provider } from 'mobx-react'
import { useStore } from '../store'
import UserProvider from '../context/userContext'

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
    <UserProvider>
      <Component {...pageProps} />
      </UserProvider>
    </Provider>
  )
}