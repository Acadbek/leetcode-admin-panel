import { createContext, useContext, useState } from "react"

const DialogContext = createContext({
  open: false,
  setOpen: (open) => {},
})

export const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false)
  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  )
}

export const useDialog = () => useContext(DialogContext)
