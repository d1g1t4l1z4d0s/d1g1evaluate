import { RELIABLE_PERFORMANCE_TYPES } from "../helpers/context-dispatcher-enums"
import { ActionTypes, RelPerfState } from "../types/context-params"

export type RelPerfActionTypes = ActionTypes<RELIABLE_PERFORMANCE_TYPES, RelPerfState>

export const reliablePerformanceReducer = (state: RelPerfState, action: RelPerfActionTypes) => {
    switch (action.type) {
        case RELIABLE_PERFORMANCE_TYPES.GOALKEEPER: return { currentPerformance: 'goalkeeper' }
        case RELIABLE_PERFORMANCE_TYPES.LOWBLOCK: return { currentPerformance: 'lowblock' }
        case RELIABLE_PERFORMANCE_TYPES.MIDBLOCK: return { currentPerformance: 'midblock' }
        case RELIABLE_PERFORMANCE_TYPES.HIGHBLOCK: return { currentPerformance: 'highblock' }
        case RELIABLE_PERFORMANCE_TYPES.QUIT: return { currentPerformance: '' }
        default: return state
    }
}

export const relPerfInitialState: RelPerfState = {
    currentPerformance: ''
}