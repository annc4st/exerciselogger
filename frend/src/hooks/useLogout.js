import { useAuthContext } from './useAuthContext'
import { useWorkoutContext } from './useWorkoutContext'

export const useLogout = () => {
    const {dispatch } = useAuthContext()
    const {dispatch: dispatchWorkouts } = useWorkoutContext()

    const logout = () => {
          //remove user from storage
    localStorage.removeItem('user')

    //dispatch logout action, no payload
    dispatch( { type: 'LOGOUT' })
    dispatchWorkouts({ type: 'SET_WORKOUTS', paylaod: null }) // for clearing global workout state - so newly logged in user could not see others wo
    }
    return {logout}
}

 