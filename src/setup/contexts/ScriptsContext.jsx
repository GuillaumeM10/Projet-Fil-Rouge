import { createContext } from "react";

const ScriptsContext = createContext();

const ScriptsProvider = ({ children }) => {
  const labelDisplay = (e) => {
    console.log("zzz");
    const label = e.target.previousElementSibling;
    if (e.target.value !== "") {
      label.classList.add("active");
    } else {
      label.classList.remove("active");
    }
  }

    return (
        <ScriptsContext.Provider value={{
            labelDisplay
        }}>
            {children}
        </ScriptsContext.Provider>
    )
}

export { ScriptsContext, ScriptsProvider };