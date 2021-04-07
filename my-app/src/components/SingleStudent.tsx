import React from "react";
import { Kurs, Student } from "../utils";
import { Link as ReactRouterLink } from "react-router-dom";
import { Img } from "@chakra-ui/image";
import { Td, Tr } from "@chakra-ui/table";
import { Text } from "@chakra-ui/layout";



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
            <Tr key={this.props.key}>

                        <Td>
                            <Img src={"/images/" + this.props.item.image} w="400px" alt={this.props.item.name}></Img>
                        </Td>
                        <Td align="left">
                            <Text marginBottom="1em" fontSize="x-large">
                                <strong>Name: </strong>
                                <ReactRouterLink style={{color: "lightblue"}} to={"/schueler/" + this.props.item._id.toString()}>
                                    {this.props.item.name}
                                </ReactRouterLink></Text>
                            <Text marginBottom="1em"><strong>Über mich: </strong>{this.props.item.description}</Text>
                            <Text marginBottom="1em"><strong>Kurs: </strong>{Kurs[this.props.item.kurs]}</Text>
                        </Td>

            </Tr>
        )
    }
}


export default SingleStudent;