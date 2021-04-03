import { Grid, GridItem, Img, Text } from "@chakra-ui/react";
import React from "react";
import { Student } from "../utils";

interface Props{
    schueler: Student
}

const Correspondent: React.FC<Props> = (props: Props) => {
    return(
        <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(5, 1fr)">
            <GridItem colSpan={1}>
                <Img width="10" src={"/images/" + props.schueler?.image} alt={props.schueler?.name}></Img>
            </GridItem>
            <GridItem marginLeft="1em" marginTop="3" colSpan={4}>
                <Text><strong>{props.schueler?.name}</strong></Text>
            </GridItem>
        </Grid>
    )
}
export default Correspondent