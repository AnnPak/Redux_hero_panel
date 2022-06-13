import { createReducer } from "@reduxjs/toolkit"

import{
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroAdded,
    heroDeleted
} from '../actions';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroes = createReducer(initialState, builder => {
    builder
        .addCase(heroesFetching, state => {
            state.heroesLoadingStatus = 'loading'; 
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes =action.payload;
        })
        .addCase(heroesFetchingError, state=>{
            state.heroesLoadingStatus = "error";
        })
        .addCase(heroAdded, (state, action) => {
            state.heroes.push(action.payload);
        })
        .addCase(heroDeleted, (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        })
        .addDefaultCase(() => {});
})

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle', 
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HEROES_DELETING_ITEM':
            
//             return{
//                 ...state,
//                 heroes: state.heroes.filter(item => item.id !== action.payload),
//                 heroesLoadingStatus: 'delete',
//             }
//         case 'HERO_ADD':
//             return{
//                 ...state,
//                 heroes: [...state.heroes, action.payload],
//                 heroesLoadingStatus: 'add'
//             }
  
//         default: return state
//     }
// }

export default heroes;