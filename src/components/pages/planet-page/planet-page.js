import React from "react";
import './planet-page.css'
import ErrorIndicator from "../../error-indicator/error-indicator.";
import Row from "../../row/row";
import {PlanetList} from "../../sw-components/item-lists";
import PlanetDetails from "../../sw-components/planet-details";

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

export default class PlanetPage extends React.Component{
    state = {
        selectedPlanet: 1,
    }

    onPlanetSelected=(id)=>{
        this.setState({
            selectedPlanet: id
        })
    }
    //ex = (item) =>item.name; this.ex

    render() {
        return (
            <ErrorBoundry>
                <Row left={<PlanetList onItemSelected={this.onPlanetSelected}/>}
                     right={<PlanetDetails itemId={this.state.selectedPlanet}/>}/>
            </ErrorBoundry>
        )
    }
}
const Record = ({label, field, item}) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}
export {Record}