import Spinner from "../spinner/spinner";
import React from "react";

const withData = (View, getData) => {
    return class extends React.Component {
        state = {
            itemList: null,
            loading: false,
            error: false
        }
        componentDidMount() {
            getData()
                .then((itemList)=>{
                    this.setState({
                        itemList: itemList
                    })
                })
        }
        render() {
            const {itemList} = this.state;
            if (!itemList) return <Spinner/>
            return <View {...this.props} data={itemList}/>
        }
    }
}

export default withData;