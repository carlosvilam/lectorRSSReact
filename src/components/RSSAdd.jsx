import React, { Component } from 'react';
import { Button, Glyphicon, FormControl, Form} from 'react-bootstrap';
import {addFeed,selectFeed} from '../actionCreators';
import {connect} from 'react-redux'
class RSSAdd extends Component {
    constructor(props){
        super(props);
        this.state = {value: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        this.props.addFeed(this.state.value);
        this.props.selectFeed(this.state.value)     
        event.preventDefault(); 
    }
    handleChange(event) {    
        this.setState({value: event.target.value});  
    }
    render(){
        return(
        <Form inline>        
                <FormControl              
                type="text"
                placeholder="http://www.example.com"
                onChange={this.handleChange}           
                 />
                <Button className="btn" onClick={() => this.handleSubmit(event)}>+</Button>
        </Form>);
    }
}
const mapStateToProps = state => {
    return {
        feeds: state.feeds
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        addFeed(title){
            dispatch(addFeed(title));
        },
        selectFeed(title){
            dispatch(selectFeed(title));
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(RSSAdd)