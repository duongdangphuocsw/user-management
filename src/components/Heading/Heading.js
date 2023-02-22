import React from "react";
import './heading.scss'
class Heading extends React.Component {
    render() {
        return (
            <>
            <div></div>
        <h1 className="heading-name">
            {this.props.router_name}
        </h1>
        <hr></hr>
            </>
        )
    }
}
export default Heading;