import RSSParser from 'rss-parser'

const removeFeed =
 title => { 
    return{
        type: "REMOVE_FEED",
        title: title
    };    
};
const addFeed = title => {
    return dispatch =>{
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
        dispatch({   
            type: "LOADING_FEED"
        });
        let parser = new RSSParser();
        return parser.parseURL(CORS_PROXY + title, function(err, feed) {
          if (err)  dispatch({ type: "ERROR_FEED"});;
          console.log(feed)
          dispatch({   
            type: "ADD_FEED",
            title:feed.title,
            feed: feed});
        })
    };    
};
const selectFeed = title => {
    return {
        type: "SELECT_FEED",
        title: title
    };    
};

const selectMainFeed = title => {
    return {
        type: "SELECT_MAIN_FEED",
        title: title
    };    
};
const removeMainFeed = () => {
    return {
        type: "REMOVE_MAIN_FEED"
    };    
};
export {removeFeed,addFeed,selectFeed,selectMainFeed,removeMainFeed};