import React from "react";
import SwapiService from "../../services/swapi-service";
import withData from "../hoc-helpers/with-data";
import ItemList from "../item-list/item-list";
import withSwapiService from "../hoc-helpers/with-swapi-service";
const {getAllPeople, getAllPlanets, getAllStarships} = new SwapiService();

const withChildFunction = (Wrapped, fn) => {
    return (props) => {
        return <Wrapped {...props} renderItem = {fn}/>
    }
}

const ListWithChildren =withChildFunction(ItemList, (item) => `${item.name} (${item.gender})`)

const PersonList = withSwapiService(withData(ListWithChildren, getAllPeople))
const PlanetList = withSwapiService(withData(ListWithChildren, getAllPlanets))
const StarshipList = withSwapiService(withData(ListWithChildren, getAllStarships))

export {PlanetList, PersonList, StarshipList};