import { LoadingButton } from "@mui/lab";
import useLogin from "../hooks/UseLogin";
import { useEffect } from "react";



type LoginButtonProps = {
    onAction: (action: boolean | undefined) => void
}

export default function LoginButton({ onAction }: LoginButtonProps) {

    const { loading, isAuthd, loginError, doLogin, doLogout } = useLogin();

    useEffect(() => {
        onAction(isAuthd);
    }, [isAuthd, onAction])

    return <LoadingButton color="inherit" loading={loading} variant="outlined"
        onClick={async () => {
            isAuthd ? doLogout() : await doLogin();
        }}>
        {isAuthd ? `Logout` : `Login`}
    </LoadingButton>;
}
