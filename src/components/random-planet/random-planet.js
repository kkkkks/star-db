import React from "react";
import './random-planet.css'
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator/error-indicator.";

export default class RandomPlanet extends React.Component{

    state = {
        planet: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, 2000)
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }
    swapiService = new SwapiService();
    updatePlanet=()=>{
        const id = Math.floor(Math.random()*25) + 2; //2-27
        this.swapiService.getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    }
    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false
        })
    }
    render() {
        const {planet, loading, error} = this.state;
        const spinner = loading? <Spinner/>: null;
        const content = (!loading && !error)? <PlanetView planet = {planet}/>: null
        const errorView = error? <ErrorIndicator/>: null;
        return(
            <div className='random-planet jumbotron rounded'>
                {spinner}
                {content}
                {errorView}
            </div>
        )
    }
}

const PlanetView = ({planet}) => {
    const {id, name, population, diameter, rotationPeriod} = planet;
    return (
        <React.Fragment>
            <img src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                 alt={`planet ${planet.name}`}
                 className='planet-image'/>
            <div className='random-planet-description'>
                <h4>{name}</h4>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'>
                        <span className='term'>Population</span>
                        <span>{population}</span>
                    </li>
                    <li className='list-group-item' >
                        <span className='term'>Rotation period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className='list-group-item'>
                        <span className='term'>Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}
