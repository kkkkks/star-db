import React from "react";
import Header from "../header/header";
import RandomPlanet from "../random-planet/random-planet";
import PersonPage from "../pages/person-page/person-page";
import './app.css';
import ErrorIndicator from "../error-indicator/error-indicator.";
import SwapiService from "../../services/swapi-service";
import {SwapiProvider} from "../swapi-service-context/swapi-service-context";
import {BrowserRouter, Route} from "react-router-dom";
import PlanetPage from "../pages/planet-page/planet-page";
import StarshipDetails from "../sw-components/starship-details";
import StarshipPage from "../pages/starship-page/starship-page";
import LoginPage from "../pages/login-page";
import SecretPage from "../pages/secret-page";
import {Switch, Redirect} from 'react-router-dom'
export default class App extends React.Component{
    swapiService = new SwapiService();
    state = {
        hasError: false,
        isLoggedIn: false
    }
    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true})
    }
    onLogin = () => {
        this.setState({
            isLoggedIn: true
        })
    }
    render(){
        if (this.state.hasError){
            return <ErrorIndicator/>
        }
        return(
            <SwapiProvider value={this.swapiService}>
                <BrowserRouter>
                    <div>
                        <Header/>
                        <RandomPlanet/>
                        <Switch>
                            <Route path='/' render={()=><h2 className='welcome'>Welcome!</h2>} exact/>
                            <Route path='/people/:id?' component={PersonPage}/>
                            <Route path='/planets' component={PlanetPage}/>
                            <Route path='/starships' component={StarshipPage} exact/>
                            <Route path='/starships/:id' render={({match, location, history}) => {
                                const id = match.params.id;
                                return (
                                    <div className='details'>
                                        <StarshipDetails itemId={id}/>
                                    </div>
                                )
                            }}/>

                            <Route render={() => <h2>Page not found :(</h2>}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </SwapiProvider>

        )
    }

}
