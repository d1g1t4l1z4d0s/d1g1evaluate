import UserForm from "../components/UserStuff/UserForm";
import { useLogin } from "../hooks/user-operations";

export default function Login() {
    const { mutate } = useLogin()
    return (
        <main className="content">
            <h1>Login</h1>
            <UserForm mode='login' mutate={mutate} />
        </main>
    )
}