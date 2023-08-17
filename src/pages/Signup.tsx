import { useSignup } from "../hooks/user-operations";
import UserForm from "../components/UserStuff/UserForm";

export default function Signup() {
    const { mutate } = useSignup()
    return (
        <main className="content">
            <h1>Signup</h1>
            <UserForm mode='signup' mutate={mutate} />
        </main>
    )
}