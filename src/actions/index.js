export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const activeFilterChanged = (element) => {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: element
    }
}

export const heroDeleted = (id) => {
    return {
        type: 'HEROES_DELETING_ITEM',
        payload: id,
    }
}

export const heroAdded = (heroes) => {
    return {
        type: 'HERO_ADD',
        payload: heroes,
    }
}

