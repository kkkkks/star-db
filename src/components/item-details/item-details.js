import React from "react";
import SwapiService from "../../services/swapi-service";
import './item-details.css'

export default class ItemDetails extends React.Component{
    swapiService = new SwapiService();

    state = {
        item: null,
        loading: true,
        image: null
    }
    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId){
            this.updatePerson();
        }
    }

    updatePerson = () => {
        const {personId, getData, getImage} = this.props;
        if (!personId) return;
        getData(personId)
            .then((person) => {
                this.setState({
                    item: person,
                    loading: false,
                    image: getImage(person)
                })
            })
    }

    render() {
        if (!this.state.item) {return <span>Select item</span>}
        const {loading, item, image} = this.state;
        //const content = loading? <Spinner/>: <PersonView person={item} image={image}/>;
        return(
            <div className="person-details card">
                <img className="person-image"
                     src={image}
                     alt={item.name}/>

                <div className="card-body">
                    <h4>{item.name}</h4>
                    <ul className="list-group list-group-flush">
                        {React.Children.map(this.props.children,
                            (child)=>{
                                return React.cloneElement(child, {item: item})
                            })}
                    </ul>
                </div>
            </div>
        )
    }
}


/*
const PersonView = (props) => { // ({person})

    const {id, name, gender, birthYear, eyeColor} = props.person; // person
    const image = props.image;
    return (
        <React.Fragment>
            <img className="person-image"
                 src={image}
                 alt='person'/>

            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {this.props.children}
                </ul>
            </div>
        </React.Fragment>
    )
}
*/