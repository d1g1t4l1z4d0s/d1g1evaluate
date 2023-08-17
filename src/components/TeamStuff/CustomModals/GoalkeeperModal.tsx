import { Dispatch } from "react"
import { IGoalkeeper } from "../../../types"
import Modal from "../../GeneralStuff/Modal"
import { RelPerfActionTypes } from "../../../reducers/realiable-performance-reducer"

export default function GoalkeeperModal({ name, caughtBalls, cleanSheets, concededGoals, quitPerformance }: IGoalkeeper & { quitPerformance: Dispatch<RelPerfActionTypes> }) {
    return (
        <Modal quitPerformance={quitPerformance}>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Caught balls:</strong> {caughtBalls}</p>
            <p><strong>Clean sheets:</strong> {cleanSheets}</p>
            <p><strong>Conceded goals:</strong> {concededGoals}</p>
        </Modal>
    )
}