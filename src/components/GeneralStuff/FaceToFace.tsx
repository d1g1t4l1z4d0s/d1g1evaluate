import './FaceToFace.css'
import TeamSelector from '../TeamStuff/TeamSelector'

export default function FaceToFace() {
    return (
        <>
            <div className='facetoface-container'>
                <div className='teams-container'>
                    <TeamSelector />
                    <TeamSelector />
                </div>
            </div>
        </>
    )
}