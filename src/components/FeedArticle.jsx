import React, { Component } from 'react';
import { Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {removeMainFeed} from '../actionCreators'
import moment from 'moment'
class FeedArticle extends Component { 
    constructor(props){
        super(props);
        this.removeMainFeed = this.removeMainFeed.bind(this);
    }
    removeMainFeed(title){
        this.props.removeMainFeed();
    }

    render(){
        return(
            <div>
                <Button className="volver" onClick={() => this.removeMainFeed()}>Volver</Button>
                <h3>
                    {this.props.article.title}
                </h3>
                <div className="content" dangerouslySetInnerHTML={{__html: this.props.article.content}}></div>
                <small>
                    {moment(this.props.article.pubDate).fromNow()}
                </small>
                <p>
                    <a href={this.props.article.link}>Ir al articulo</a>
                </p>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        article: state.mainFeed
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        removeMainFeed : () => dispatch(removeMainFeed())              
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(FeedArticle)