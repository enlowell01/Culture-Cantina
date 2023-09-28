import { createContext, useState, useEffect } from "react";

export const UserContext = createContext()

function UserContextProvider({children}) {
    const  [userInfo, setUserInfo] = useState(null)
    useEffect(() => {

        const getLoggedInUser = async() => {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/user/profile`, {
                credentials: 'include'
            })
            let user = await response.json()
            setUserInfo(user)
        }
        getLoggedInUser()
    }, [])

    return(
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider