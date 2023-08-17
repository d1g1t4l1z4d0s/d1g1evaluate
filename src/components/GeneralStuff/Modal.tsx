import { Dispatch, PropsWithChildren, useRef } from 'react'
import { useStatusContext } from '../../hooks/action-status'
import './Modal.css'
import { RelPerfActionTypes } from '../../reducers/realiable-performance-reducer'
import { RELIABLE_PERFORMANCE_TYPES } from '../../helpers/context-dispatcher-enums'

export default function Modal({ children, quitPerformance = null }: PropsWithChildren & { quitPerformance?: Dispatch<RelPerfActionTypes> | null }) {
    const modal = useRef<HTMLDivElement>(null)
    const { setStatus } = useStatusContext()
    const handleOnClick = () => {
        if (modal.current !== null) {
            modal.current.classList.add('hidden')
            setStatus({
                activeMessage: false,
                message: '',
                kind: 'success'
            })
            if (quitPerformance) quitPerformance({ type: RELIABLE_PERFORMANCE_TYPES.QUIT })
        }
    }

    return (
        <div className='modal' ref={modal}>
            <div className='modal-content'>
                {children}
                <button className='button' onClick={handleOnClick}>Close</button>
            </div>
        </div>
    )
}