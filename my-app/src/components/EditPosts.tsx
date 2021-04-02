import React, { FormEvent } from "react";
import { Button, Grid, GridItem, Img, Text } from "@chakra-ui/react";
import { genericGet, genericPost, Student } from "../utils";
import { meQuery } from "../fetchUtils";

interface Props {}
interface State {
    allStudentData:  Array<Student>,
    meData: Student,
    errorMessage: string
}


class EditStudents extends React.Component<Props, State> {
    constructor(props: Props){
        super(props)

        this.state = {
            allStudentData: [],
            meData: null,
            errorMessage: ""
        }
    }

    componentDidMount(){
        this.fetchAllData();
    }

    fetchAllData(){
        genericGet("/api/students/all")
            .then(data => {
                if(data.error !== null){
                    return this.setState({
                        errorMessage: data.error.errorMessage
                    })
                }

                this.setState({
                    allStudentData: data.data
                });
            })
        meQuery()
            .then(data => {
                if(data.error !== null){
                    return this.setState({
                        errorMessage: data.error.errorMessage
                    })
                }

                this.setState({
                    meData: data.data
                })
            })
    }

    handleMakeSuperuser = async (item: Student) => {
        await genericPost("/api/students/make-superuser", {id: item?._id})
        this.fetchAllData();
    }

    handleDelete = async (item: Student) => {
        await genericPost("/api/students/delete-user", {id: item?._id})
        this.fetchAllData();
    }

    render(){
        if(!this.state.meData?.superuser){
            return(
                <Text>
                    Du solltest nicht hier sein :/.
                </Text>
            )
        }

        return (
            <div style={{ minHeight: "100vh", marginLeft: 400, marginTop: 60}} >
                <Grid>
                    {this.state.allStudentData.map((item, i) => {
                        if(item?.superuser){
                            return ""
                        }
                        return(
                            <GridItem marginBottom="2em" key={i}>
                                <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                                    <GridItem colSpan={1}>
                                        <Img width={100} src={"/images/" + item?.image}></Img>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <Text marginBottom="1em"><strong>{item?.name}</strong></Text>
                                        <Text marginBottom="1em"><strong>{item?.description}</strong></Text>
                                    </GridItem>
                                    <GridItem colSpan={1}>                                
                                        <Button marginRight="2" color="black" onClick={() => this.handleMakeSuperuser(item)}>Superuser machen</Button>
                                        <Button color="black" onClick={() => this.handleDelete(item)}>Löschen</Button>
                                    </GridItem>
                                </Grid>


                            </GridItem>
                        )
                    })}
                </Grid>
            </div>
        )
    }
}

export default EditStudents;