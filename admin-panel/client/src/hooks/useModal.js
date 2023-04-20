import { useState } from "react";

const useModal = () =>{
    const [isShowing, setIsShowing] = useState(false);

    const  toggle = ()=>{
        setIsShowing(!isShowing)
        console.log("Show:",isShowing)
    }
    return {
        isShowing,
        toggle,
      }
}

export default useModal;