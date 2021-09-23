import ItemDetails from "../item-details/item-details";
import {Record} from "../pages/person-page/person-page";
import React from "react";
import withSwapiService from "../hoc-helpers/with-swapi-service";

const StarshipDetails = ({itemId, swapiService}) => {
    const {getStarship, getStarshipImage} = swapiService;
    return(
        <ItemDetails personId={itemId}
                     getData={getStarship}
                     getImage={getStarshipImage}>
            <Record label='Model' field='model'/>
            <Record label='Length' field='length'/>
            <Record label='Cost' field='costInCredits'/>
        </ItemDetails>
    )
}

export default withSwapiService(StarshipDetails)