import { usePostLeague } from "../hooks/league-operations"
import LeagueForm from "../components/LeagueStuff/LeagueForm"

export default function NewLeague() {
    const { mutate: postMutate } = usePostLeague()
    return (
        <main className="content">
            <article>
                <h1>Add league</h1>
                <LeagueForm mutate={postMutate} mode='post' />
            </article>
        </main>
    )
}