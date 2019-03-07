import React, {Component} from "react";
import {render} from "react-dom"
import Root from "./components/Root"
import {Provider} from 'react-redux'
import store from './store'

class APP extends Component {
    render() {
        return (
            <Provider store={store}>
                <Root/>
            </Provider>
        );
    }
}

render(<APP/>, window.document.getElementById("app"));
