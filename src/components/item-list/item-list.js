import React from "react";
import './item-list.css'

const ItemList = (props) => {
    const {data, renderItem, onItemSelected} = props;

    const items = data.map((item)=>{
        const label = renderItem(item);
        return (
            <li className="list-group-item"
                key={item.id}
                onClick={()=>onItemSelected(item.id)}>
                {label}
            </li>
        )
    });

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    )
}

ItemList.defaultProps = {
    onItemSelected: ()=>{}
}
//prop-types

export default ItemList;
