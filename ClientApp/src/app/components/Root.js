import React, {Component} from "react";
import {render} from "react-dom"
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import TableView from "./TableView";

class Root extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container-fluid">
                    <div className="row">
                        <Route path="/" component={TableView}/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({
    UserReducer: state.UserReducer
});
export default connect(
    mapStateToProps,
    {}
)(Root);
