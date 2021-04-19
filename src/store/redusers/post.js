import {ADD_POST, LOAD_POSTS, REMOVE_POST, TOGGLE_BOOKED} from "../types";

const initialState = {
    allPosts: [],
    bookedPosts: [],
    loading: true
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_POSTS:
            return {
                ...state,
                allPosts: action.payload,
                bookedPosts: action.payload.filter(t => t.booked),
                loading: false
            }
        case TOGGLE_BOOKED:
            const allPosts = state.allPosts.map(post => {
                if (post.id === action.payload) {
                    post.booked = !post.booked
                }
                return post
            })
            return {
                ...state,
                allPosts,
                bookedPosts: allPosts.filter(t => t.booked)
            }
        case REMOVE_POST:
            return {
                ...state,
                allPosts: state.allPosts.filter(p => p.id !== action.payload),
                bookedPosts: state.bookedPosts.filter(p => p.id !== action.payload)
            }
        case ADD_POST:
            return {
                ...state,
                allPosts: [{ ...action.payload }, ...state.allPosts]
            }
        default: return state
    }
}