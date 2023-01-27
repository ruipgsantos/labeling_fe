import { useCallback, useEffect, useState } from "react";
import useCookie from "../hooks/UseCookie";
import axios from "axios";

export default function UseLogin() {

    const [authCookie, setAuthCookie] = useCookie({
        key: "connect.sid",
    });
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setAuthenticated(!!authCookie);
    }, [authCookie])

    const doLogin = useCallback(async () => {
        setLoginError(undefined);
        try {
            setLoading(true);
            //NOTE: password should be hashed, not plain text
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL ?? ""}/auth/login`,
                {
                    username: "drdre",
                    password: "thechronic"
                },
                {
                    withCredentials: true,
                })
            if (res.status === 200) {
                setAuthenticated(true);
            }
        } catch (e) {
            setLoginError("Could not login.");
            console.info(e);
        } finally {
            setLoading(false);
        }
    }, [])

    const doLogout = useCallback(() => {
        setAuthCookie(undefined);
        setAuthenticated(false);
    }, [setAuthCookie])

    return { loading, isAuthd: authenticated, loginError, doLogin, doLogout }
}