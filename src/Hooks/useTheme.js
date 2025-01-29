import {useState} from 'react'

const useTheme = ({currentTheme}) => {
    const {theme,setTheme} = useState(currentTheme);

    const handleTheme = ()=>{
        setTheme( (prevTheme) => prevTheme === "light"? "dark" : "light");
    }
  return {theme,handleTheme}
}

export default useTheme
