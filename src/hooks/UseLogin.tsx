import { useCallback, useState } from "react";
import useCookie from "../hooks/UseCookie";
import axios from "axios";

export default function UseLogin() {

    const [loggedIn, getIsLoggedIn, setIsLoggedIn] = useCookie<boolean>({
        key: "loggedin",
    });

    const [loginError, setLoginError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    const isLoggedIn = useCallback(() => {
        return `${loggedIn}` === 'false' ? false : true;
    }, [loggedIn])

    const doLogin = useCallback(async () => {        
        setLoginError(undefined);
        try {
            setLoading(true);
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL ?? ""}/auth/login`,
                {
                    username: "drdre",
                    password: "thechronic"
                },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                })

            if (res.status === 200) {
                setIsLoggedIn(true);
            }
        } catch (e) {
            setLoginError("Could not login.");
            console.info(e);
        } finally {
            setLoading(false);
        }
    }, [setIsLoggedIn])

    const doLogout = useCallback(() => {
        setIsLoggedIn(false);
    }, [setIsLoggedIn])

    return { loading, isLoggedIn, loginError, doLogin, doLogout }
}