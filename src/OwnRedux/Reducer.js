export const db = {
    "posts": [],
    "category": [],
    "user": null
}

export const Reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_USER':
            localStorage.setItem("user", JSON.stringify(action.data))

            return {
                ...state,
                "user": action.data
            }
        case 'ADD_POSTS':
            return {
                ...state,
                "posts": action.data
            }
        case 'GET_CATEGORY':
            return {
                ...state,
                "category": action.data
            }
        default:
            break;
    }

    return state;
}

