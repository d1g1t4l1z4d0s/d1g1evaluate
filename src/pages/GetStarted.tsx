import { useAuthContext } from "../hooks/user-operations"

export default function GetStarted() {
    const { state: { rol } } = useAuthContext()
    return (
        <main className='content'>
            <h1>Get started</h1>
            <section className='home-container'>
                <h2>Common user guide</h2>
                <article className='home-content'>
                    <div>
                        <h3>Compare</h3>
                        <p>
                            As simple as after getting access into our application you'll be able to handle our 'Compare' feature,
                            this one first of all is going to show you two selector elements which allow you to select the leagues in wich
                            the teams that you want to compare are expected to be.
                        </p>
                    </div>
                    <div className='asset-container'>
                        <img src='./src/assets/TeamsComp.png' />
                    </div>
                </article>
                <article className='home-content'>
                    <div>
                        <h3>Team's features</h3>
                        <p>
                            Once you'd selected the teams, you'll be able to analyse the team's features evaluating all the played matches.
                            We provide to you features like: current manager, goal balance(%), played matches, points average (where 3 is an
                            perfect average).
                        </p>
                    </div>
                    <div className='asset-container'>
                        <img src='./src/assets/TeamsFeature.png' />
                    </div>
                </article>
                <article className='home-content'>
                    <div>
                        <h3>Reliable performance</h3>
                        <p>
                            This feature integrates four blocks (goalkeeper, low, mid, and high) which by clicking them
                            you'll be able to watch some stats of the best player per block in a modal window.
                        </p>
                    </div>
                    <div className='asset-container'>
                        <img src='./src/assets/ModalComp.png' />
                    </div>
                </article>
            </section>
            {rol === 'super' && <section className='home-container'>
                <h2>Super user guide</h2>
                <article className='home-content'>
                    <div>
                        <h3>Leagues</h3>
                        <ol>
                            This window offers the following actions:
                            <li>Add a new team: by clicking the main button 'Add new league' below the title.</li>
                            <li>Access to a league: by clicking a specific card.</li>
                            <li>Delete a league: by clicking the specific card's trash icon.</li>
                        </ol>
                    </div>
                    <div className='asset-container'>
                        <img src='./src/assets/Leagues.png' />
                    </div>
                </article>
                <article className='home-content'>
                    <div>
                        <h3>New league</h3>
                        <p>
                            In this form you'll be able to input league data, you should get approved all the validations.
                            There are just three fields: name, logo, and current champion. Note: when you're going to insert
                            a league, it's not needed to select a current champion due to you must insert the teams after the
                            league creation.
                        </p>
                    </div>
                    <div className='asset-container'>
                        <img src='./src/assets/NewLeague.png' />
                    </div>
                </article>
                <article className='home-content'>
                    <div>
                        <h3>League</h3>
                        <p>
                            When you get access to a league, you'll be able to modify the league data using the
                            displayed form (similar to 'Add new league' form)
                        </p>
                        <ol>
                            This one offers the following actions:
                            <li>Modify league values: by sending fresh data inputted in the form fields.</li>
                            <li>Add a new team: by clicking the main button 'Add new team' below the form.</li>
                            <li>Access to a team: by clicking a specific card.</li>
                            <li>Delete a team: by clicking a specific card's trash icon.</li>
                        </ol>
                    </div>
                    <div className='asset-container'>
                        <img src='./src/assets/League.png' />
                    </div>
                </article>
                <article className='home-content'>
                    <div>
                        <h3>New Team</h3>
                        <p>
                            As simple as follow the form headers flow, the team form is divided by six(6) groups:
                            entity, stats, goalkeeper, low block, mid block, and high block. The form flow is going
                            to let you know what steps you should follow to complete a right validation.
                        </p>
                    </div>
                    <div className='asset-container'>
                        <img src='./src/assets/NewTeam.png' />
                    </div>
                </article>
                <article className='home-content'>
                    <div>
                        <h3>Update team</h3>
                        <p>
                                Form to existing teams is similar to the one for adding a team. The only difference is
                                the header that informs you about what team you are going to modify, and this denies you
                                a team id change. It approaches the same methods to validate the form, based on keep
                                you guided by the form flow.
                        </p>
                    </div>
                    <div className='asset-container'>
                        <img src='./src/assets/TeamForm.png' />
                    </div>
                </article>
            </section>}
        </main>
    )
}