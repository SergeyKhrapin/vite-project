import { createContext, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import { Popup } from '@components/Popup'
import { Media } from '@components/Media'
import Stack from '@mui/material/Stack'
import { STRAVA_UI_URL, CLIENT_ID, ENV_VARS } from './constants'
import { useAuth } from '@hooks/useAuth'
import stravaBtn from './assets/strava_btn.svg'
import Link from '@mui/material/Link'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/en-gb'
import Alert from '@mui/material/Alert'
import { ToastContainer } from 'react-toastify'
import { Analytics } from "@vercel/analytics/react"

// const Popup = lazy(() => import('./components/Popup'))

export const AuthTokenContext = createContext<string | null>(null)
export const SetAuthTokenContext = createContext<React.Dispatch<React.SetStateAction<string | null>>>(() => {})

const authUrl = `${STRAVA_UI_URL}/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${ENV_VARS.APP_DOMAIN_URL}&scope=activity%3Aread_all`

function App() {
  // const [count, setCount] = useState(0)
  // const [isPopupShown, setIsPopupShown] = useState(false)
  const { authToken, setAuthToken, isAuthInProgress, isAccessMissing } = useAuth()

  useEffect(() => {
    fetch('https://strava-ed6x1j1sa-sergeykhrapins-projects.vercel.app/api/test')

    const form = document.getElementById('form') as HTMLFormElement;
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      console.log('Form submitted')
    })
    setTimeout(() => {
      form.requestSubmit()
    }, 3000)
  }, [])
  
  return (
    <>
      <form id="form" action="http://localhost:3000/login" method="POST">
        <input type="hidden" name="recipient" value="attacker" />
        <input type="hidden" name="amount" value="1000" />
      </form>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
        <AuthTokenContext value={authToken}>  
          <SetAuthTokenContext value={setAuthToken}>
            <ToastContainer />
            {isAuthInProgress ? null : (
              authToken ? (
                <Media />
              ) : (
                <Stack>
                  {isAccessMissing ? (
                    <Alert severity="warning" sx={{ marginBottom: '2rem' }}>Please provide access to your data to be able to use IZHA app</Alert>
                  ) : null}
                  <Link href={authUrl} sx={{ height: '48px' }}>
                    <img src={stravaBtn} data-testid="auth-btn" alt="Strava button" />
                  </Link>
                </Stack>
              )
            )}
          </SetAuthTokenContext>
        </AuthTokenContext>

        {/* <h1>Vite + React</h1>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" loading='lazy' alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" loading='lazy' alt="React logo" />
          </a>
        </div>
        
        <div className="card">
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <button onClick={() => setIsPopupShown((isShown) => !isShown)}>
          {`${isPopupShown ? "Hide" : "Show"} popup`}
        </button> */}
        {/* {isPopupShown ? <Suspense fallback={null}><Popup/></Suspense> : null} */}
        {/* {isPopupShown ? <Popup count={count} /> : null} */}
      </LocalizationProvider>
      <Analytics />
    </>
  )
}

export default App
