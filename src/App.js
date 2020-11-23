import React, { Component } from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import RSSList from './components/RSSList'
import RSSAdd from './components/RSSAdd'
import RSSFeed from './components/RSSFeed'
import FeedArticle from './components/FeedArticle'
import {connect} from 'react-redux';
import './App.css';
import { removeMainFeed } from './actionCreators';

class App extends Component {
  constructor(props){
    super(props);
    this.removeMainFeed = this.removeMainFeed.bind(this);
  }
  removeMainFeed(){ 
      this.props.removeMainFeed();
  }
  render() {
    if(this.props.mainFeed==null){ 
      return (
        <div>
      <Navbar bg="info"> 
        <Navbar.Brand onClick={() => this.removeMainFeed()}>
         Plan de capacitación React Carlos Vila
        </Navbar.Brand>
      </Navbar>
          <Container>
            <Row>
              <Col sm={4}>
                <RSSList titles={this.titles}/>
                <RSSAdd/>
              </Col>
              <Col sm={8}>
                <RSSFeed/>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }else{
          return (
            <div>
          <Navbar bg="info"> 
            <Navbar.Brand onClick={() => this.removeMainFeed()}>
             Plan de capacitación React Carlos Vila
            </Navbar.Brand>
          </Navbar>
              <Container>
                <Row>
                  <Col sm={4}>
                    <RSSList titles={this.titles}/>
                    <RSSAdd/>
                  </Col>
                  <Col sm={8}>
                    <FeedArticle/>
                  </Col>
                </Row>
              </Container>
            </div>
          );
    }
   
  }
}
const mapDispatchToProps = dispatch =>{
  return{
      removeMainFeed : () => dispatch(removeMainFeed())              
  };
}

const mapStateToProps = state => {
  return {
      mainFeed: state.mainFeed
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)

