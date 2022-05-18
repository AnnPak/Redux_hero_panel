const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_DELETING_ITEM':
            
            const newHeroesList = state.heroes.filter(item => item.id !== action.payload)

            return{
                ...state,
                heroes: newHeroesList,
                heroesLoadingStatus: 'delete'
            }
        case 'HEROES_ADDING_ITEM':
            const newHeroes = [...state.heroes, action.payload]
            return{
                ...state,
                heroes: newHeroes,
                heroesLoadingStatus: 'add'
            }
        default: return state
    }
}

export default reducer;