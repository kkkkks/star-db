import ItemDetails from "../item-details/item-details";
import {Record} from "../pages/person-page/person-page";
import React from "react";
import withSwapiService from "../hoc-helpers/with-swapi-service";


const PlanetDetails = ({itemId, swapiService}) => {
    const {getPlanet, getPlanetImage} = swapiService;

    return (
        <ItemDetails personId={itemId}
                     getData={getPlanet}
                     getImage={getPlanetImage}>
            <Record label='Population' field='population'/>
            <Record label='Rotation period' field='rotationPeriod'/>
            <Record label='Diameter' field='diameter'/>
        </ItemDetails>
    )

}

export default withSwapiService(PlanetDetails);