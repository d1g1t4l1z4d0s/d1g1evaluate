import { Link } from "react-router-dom";
import { useDeleteLeague, useFetchLeagues } from "../hooks/league-operations";
import AdminLeagues from "../components/LeagueStuff/AdminLeagues";

export default function Leagues() {
    const { data } = useFetchLeagues()
    const { mutate } = useDeleteLeague()

    return (
        <main className="content">
            <article>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ display: 'inline' }}>Leagues</h2>
                    <button className='button'>
                        <Link to={`../newLeague/`} style={{ color: 'inherit', display: 'block' }}>Add new league</Link>
                    </button>
                </div>
               { data !== undefined && <AdminLeagues data={data} mutateAsDelete={mutate} />}
            </article>
        </main>

    )
}