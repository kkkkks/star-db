import React from "react";
import ItemDetails from "../item-details/item-details";
import {Record} from "../pages/person-page/person-page";
import withSwapiService from "../hoc-helpers/with-swapi-service";

const PersonDetails = ({itemId, swapiService}) => {
    const {getPerson, getPersonImage} = swapiService;
    return (
        <ItemDetails personId={itemId}
                     getData={getPerson}
                     getImage={getPersonImage}>
            <Record label='Gender' field='gender'/>
            <Record label='Eye color' field='eyeColor'/>

        </ItemDetails>
    )
}
PersonDetails.defaultProps = {
    itemId: 1
}
export default withSwapiService(PersonDetails);