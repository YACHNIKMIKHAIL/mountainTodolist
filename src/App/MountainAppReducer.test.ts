import {MountainAppInitStateType, mountainAppReducer, setMountainError, setMountainStatus} from "./MountainAppReducer";

let startState: MountainAppInitStateType
beforeEach(() => {
    startState = {
        mountainStatus: 'idle',
        mountainError: null
    }
})
test('correct status message should be set', () => {
    const endState = mountainAppReducer(startState, setMountainStatus('failed'))

    expect(endState.mountainError).toBe(null)
    expect(endState.mountainStatus).toBe('failed')
})
test('correct error message should be set', () => {
    const endState = mountainAppReducer(startState, setMountainError('some mountain ERROR'))

    expect(endState.mountainError).toBe('some mountain ERROR')
    expect(endState.mountainStatus).toBe('idle')
})