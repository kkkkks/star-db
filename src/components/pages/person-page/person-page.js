import React from "react";
import './person-page.css'
import ErrorIndicator from "../../error-indicator/error-indicator.";
import Row from "../../row/row";
import {PersonList} from "../../sw-components/item-lists";
import PersonDetails from "../../sw-components/person-details";
import {withRouter} from "react-router-dom";

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

const PersonPage = ({history, match}) => {
    return (
        <ErrorBoundry>
            <Row left={<PersonList onItemSelected={(id) => {
                history.push(id)
                }
            }/>}
                 right={<PersonDetails itemId={match.params.id}/>}/>
        </ErrorBoundry>
    )
}
export default withRouter(PersonPage);

const Record = ({label, field, item}) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}
export {Record}