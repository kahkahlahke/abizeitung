import React from "react";
import { isTemplateExpression } from "typescript";
import { Kurs, Student } from "../utils";
import { Link as ReactRouterLink } from "react-router-dom";



interface Props{
    key: number
    item: Student
}

class SingleStudent extends React.Component<Props> {
    constructor(props: Props){
        super(props)
    }



    render(){
        if(this.props.item === null)
            return <p>Something went wrong :(</p>

        
        return(
            <tr key={this.props.key}>

                        <td>
                            <img src={"/images/" + this.props.item.image} width="250" alt={this.props.item.name}></img>
                        </td>
                        <td align="left">
                            <h2>Name: <ReactRouterLink to={"/schueler/" + this.props.item._id.toString()}>
                                    {this.props.item.name}
                                </ReactRouterLink></h2>
                            <p><strong>Über mich: </strong>{this.props.item.description}</p>
                            <p><strong>Kurs: </strong>{Kurs[this.props.item.kurs]}</p>
                        </td>

            </tr>
        )
    }
}


export default SingleStudent;