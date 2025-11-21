import { useContext } from "react"
import { toast } from "react-toastify"
import Cookies from 'js-cookie'
import { AuthTokenContext, SetAuthTokenContext } from "src/App"
import { authErrorMessage } from "@components/constants"
import { ACCESS_TOKEN_NAME } from "src/constants"

export const useFetchData = () => {
  // TODO: do not make one more same request until this one is settled
  // block clicking on btn

  const authToken = useContext(AuthTokenContext)
  const setAuthToken = useContext(SetAuthTokenContext)

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })

      const data = await response.json()
      
      if (data.message === 'Authorization Error') {
        setAuthToken(null)
        Cookies.remove(ACCESS_TOKEN_NAME)
        toast(authErrorMessage, { type: 'error' })
      } else {
        return data
      }
    } catch(e) {
      //
    }
  }

  return { fetchData }
}