import React from "react";
import './starship-page.css'
import ErrorIndicator from "../../error-indicator/error-indicator.";
import Row from "../../row/row";
import {StarshipList} from "../../sw-components/item-lists";
import StarshipDetails from "../../sw-components/starship-details";
import {withRouter} from 'react-router-dom';

class ErrorBoundry extends React.Component {
    state = {
        hasError: false
    }
    render() {
        if (this.state.hasError) return <ErrorIndicator/>;
        return this.props.children
    }
    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true})
    }
}

const StarshipPage = ({location, match, history}) => {
        return (
            <ErrorBoundry>
                <div className='details'>
                    <StarshipList onItemSelected={ (itemId) => {
                        history.push(`${itemId}`)
                    }}/>
                </div>
            </ErrorBoundry>
        )
}
export default withRouter(StarshipPage);
const Record = ({label, field, item}) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}
export {Record}