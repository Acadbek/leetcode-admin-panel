// src/context/LoadingContext.jsx
import { createContext, useContext } from "react"
import { useLoadingBar } from "react-top-loading-bar"

const LoadingContext = createContext()

export const useLoading = () => useContext(LoadingContext)

export const LoadingProvider = ({ children }) => {
  const { start, complete } = useLoadingBar({ color: "#0AC5D7", height: 3 })

  const run = () => {
    start()
  }

  const stop = () => {
    complete()
  }
  return (
    <LoadingContext.Provider value={{ run, stop }}>
      {children}
    </LoadingContext.Provider >
  )
}

export default LoadingProvider
