
import axios from "axios";
import { useState } from "react";

type TLoading = "idle" | "checking" | "available"| "unavailable" | "failed"

 function useCheckEmailAvailability() {
    const [loading,setLoading] = useState<TLoading>("idle")
    const [enterEmail,setEnterEmail] = useState<string|null>(null)
    const checkEmailAvailability =async (email: string)=> {
        setLoading("checking")
        setEnterEmail(email)
        try {
            const response = await axios.get(`/users?email=${email}`);
            
            if (!response.data.length) {
                setLoading("available")
            } else {
                setLoading("unavailable")
            }

          } catch (error) {
            console.log(error)
            setLoading("failed")
          }
    }

    const resetState = () => {
        setLoading("idle")
        setEnterEmail(null)
    }

    return {checkEmailAvailability,loading,enterEmail,resetState}
}

export default useCheckEmailAvailability;
