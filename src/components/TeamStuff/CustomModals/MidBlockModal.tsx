import { Dispatch } from "react"
import { RelPerfActionTypes } from "../../../reducers/realiable-performance-reducer"
import { IMidBlock } from "../../../types"
import Modal from "../../GeneralStuff/Modal"

export default function MidBlockModal({ name, completedPasses, assists, quitPerformance }: IMidBlock & { quitPerformance: Dispatch<RelPerfActionTypes> }) {
    return (
        <Modal quitPerformance={quitPerformance}>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Assists:</strong> {assists}</p>
            <p><strong>Completed passes:</strong> {completedPasses}</p>
        </Modal>
    )
}