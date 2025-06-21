import { useState, useEffect } from "react"
import { API_BASE_URL } from "@/config"

export const useUserIcon = () => {
    const [userIcon, setUserIcon] = useState<string | null>(null)

    const getUserIcon = async (): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/api/getProfileIcon`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log('data:', data)
        setUserIcon(data.icon)
        return data.icon
    }
    useEffect(() => {
        getUserIcon()
    }, [])

    return { userIcon }
}

