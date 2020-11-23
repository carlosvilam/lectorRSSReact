import React, { Component } from 'react';
import { Button, Glyphicon, ListGroup} from 'react-bootstrap';
import {connect} from 'react-redux';
import {removeFeed, selectMainFeed} from '../actionCreators';
import moment from 'moment';
import ReactLoading from 'react-loading';
class RSSFeed extends Component { 
    constructor(props){
        super(props);
        this.selectMainFeed = this.selectMainFeed.bind(this);
    }

    selectMainFeed(title){
        this.props.selectMainFeed(title);
    }
    render(){
        if(this.props.selectedfeed!=null&&!this.props.isFetching){
            let listItems = this.props.selectedfeed.feed.items.map((item) => 
            <div key={item.title}>
                    <h3>
                        {item.title}
                    </h3>
                    <div className="content" dangerouslySetInnerHTML={{__html: item.content}}></div>
                    <h6>
                        {moment(item.pubDate).fromNow()}
                    </h6>
                    <Button onClick={() => this.selectMainFeed(item.title)}>Entrar</Button>
            </div>
              
               );
        
                return (
                    <div>
                        <h1>
                            {this.props.selectedfeed.title}
                        </h1>
                        <hr/>
                        <ListGroup>
                                {listItems}
                        </ListGroup>
                        
                    </div> 
                );
        }else{
            if(this.props.isFetching){
                return(
                    <ReactLoading type={"bars"} color={"#2c79f8"} height={350} width={150} />
                );
            }else{
                if(this.props.didInvalidate){   
                    return(
                        <h1>
                            Error
                        </h1>
                    );
                }else{
                    return(
                            <h1>
                                No feed selected
                            </h1>
                    );
                }
            }       
        }
       
    }

}

const mapStateToProps = state => {
    return {
        selectedfeed: state.selectedfeed,
        isFetching: state.isFetching,
        didInvalidate: state.didInvalidate
    }
}
const mapDispatchToProps = dispatch =>{
    return {selectMainFeed : (title) => dispatch(selectMainFeed(title)) }         
}
export default connect(mapStateToProps,mapDispatchToProps)(RSSFeed)