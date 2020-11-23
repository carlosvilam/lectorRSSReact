import React, { Component } from 'react';
import { Button, Glyphicon, ListGroup, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import {removeFeed,selectFeed} from '../actionCreators'
import ReactLoading from 'react-loading';

class RSSlist extends Component { 
    constructor(props){
        super(props);
        this.removeFeed = this.removeFeed.bind(this);
        this.selectFeed = this.selectFeed.bind(this);
    }
    removeFeed(title){
        this.props.removeFeed(title);
    }

    selectFeed(title){
        this.props.selectFeeds(title);
    }

    render(){
       let listItems = this.props.feeds.map((feed) => 
       <Row className="row"  key={feed.title}>
           <Col sm={10}>
            <ListGroup.Item action variant="primary" onClick={() => this.selectFeed(feed.title)}>
                {feed.title}
            </ListGroup.Item>
           </Col>
            <Col sm={1}>
                <Button  bg="danger" className={"minus"} onClick={() => this.removeFeed(feed.title)}>
                    -
                </Button>
            </Col>
       </Row>);

        return (
            <ListGroup>
                {listItems}
            </ListGroup>
        );
     
    }

}

const mapStateToProps = state => {
    return {
        feeds: state.feeds
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        selectFeeds : (title) => dispatch(selectFeed(title)),
        removeFeed : (title) => dispatch(removeFeed(title))                
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(RSSlist)