import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";


type LoginButtonProps = {
    doLogin: () => void;
    doLogout: () => void;
    loading: boolean;
    isLoggedIn: () => boolean;
}

export default function LoginButton({ props }: { props: LoginButtonProps }) {

    const { loading, isLoggedIn, doLogin, doLogout } = props;
    return <LoadingButton color="inherit" loading={loading} variant="outlined"
        onClick={() => {
            isLoggedIn() ? doLogout() : doLogin();
        }}>
        {isLoggedIn() ? `Logout` : `Login`}
    </LoadingButton>;
}
