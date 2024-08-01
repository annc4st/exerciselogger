import { WorkoutContext } from '../context/WorkoutContext'
import { useContext } from 'react'


const useWorkoutContext = () => {
    const context = useContext(WorkoutContext)

    if (!context) {
        throw Error ('useWorkoutContext must be used inside a WorkoutContextProvider')
    }

    return context
}

export default useWorkoutContext
