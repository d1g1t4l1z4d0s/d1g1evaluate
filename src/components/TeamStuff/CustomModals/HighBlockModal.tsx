import { Dispatch } from "react"
import { IHighBlock } from "../../../types"
import Modal from "../../GeneralStuff/Modal"
import { RelPerfActionTypes } from "../../../reducers/realiable-performance-reducer"

export default function HighBlockModal({ name, shotsOnTarget, scoredGoals, quitPerformance }: IHighBlock & { quitPerformance: Dispatch<RelPerfActionTypes> }) {
    return (
        <Modal quitPerformance={quitPerformance}>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Goals:</strong> {scoredGoals}</p>
            <p><strong>Shots on target:</strong> {shotsOnTarget}</p>
        </Modal>
    )
}