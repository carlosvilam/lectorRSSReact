import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import {save,load} from "redux-localstorage-simple"

const reducer = (state, action) => {
    switch(action.type){  
        case "REMOVE_FEED": {
            return{
                ...state,
                feeds: state.feeds.filter(f => f.title !== action.title),
                selectedfeed: state.selectedfeed.title == action.title ? null : state.selectedfeed
                };
        }
        case "ADD_FEED":{       
            return{
                ...state,
                feeds: state.feeds.concat({title:action.title,feed:action.feed}),
                selectedfeed: {title:action.title,feed:action.feed},
                isFetching:false
                };
        }
        case "SELECT_FEED":{
            return Object.assign({}, state, {
                selectedfeed: state.feeds.find(f => f.title === action.title),
                mainFeed: null
              })
            
        }
        case "LOADING_FEED":{
            return Object.assign({}, state, {
                isFetching:true,
                didInvalidate: false
              })
        }
        case "ERROR_FEED":{
            return Object.assign({}, state, {
                didInvalidate: true,
                isFetching:false
              })
        }
        case "SELECT_MAIN_FEED":{
            return Object.assign({}, state, {
                mainFeed: state.selectedfeed.feed.items.find(f => f.title === action.title)
              })
        }
        case "REMOVE_MAIN_FEED":{
            return Object.assign({}, state, {
                mainFeed: null
              })
        }

        default: {
            return state;
        } 
    }
};

const createStoreWithMiddleware 
    = applyMiddleware(
        thunk,
        save() 
    )(createStore)
const store = createStoreWithMiddleware(
        reducer,    
        load({preloadedState: {
            feeds:[],
            selectedfeed:null,
            mainFeed:null
        }}) 
    ) 

export default store;