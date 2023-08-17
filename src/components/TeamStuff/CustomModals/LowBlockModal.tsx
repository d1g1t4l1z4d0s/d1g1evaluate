import { Dispatch } from "react"
import { ILowBlock } from "../../../types"
import Modal from "../../GeneralStuff/Modal"
import { RelPerfActionTypes } from "../../../reducers/realiable-performance-reducer"

export default function LowBlockModal({ name, behavior, tackles, quitPerformance}: ILowBlock & { quitPerformance: Dispatch<RelPerfActionTypes> }) {
    return (
        <Modal quitPerformance={quitPerformance}>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Behavior:</strong> {behavior}</p>
            <p><strong>Tackles:</strong> {tackles}</p>
        </Modal>
    )
}