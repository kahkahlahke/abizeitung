import { Button } from "@chakra-ui/button";
import React from "react";
import { genericGet, genericPost, Student } from "../utils";
import HasVoted from "./HasVoted";
import { Grid, GridItem, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { reduceEachTrailingCommentRange } from "typescript";

interface Props {}
interface State{
    meData: Student;
    surveyData: any;
}

class Umfragen extends React.Component<Props, State> {
    constructor(props: Props){
        super(props)

        this.state = {
            meData: null,
            surveyData: null
        }
    }

    componentDidMount() {
        this.fetchAllData();

    }

    fetchAllData = () => {
        genericGet("/api/me-query")
            .then(data => {
                this.setState({
                    meData: data
                })
                genericGet("/api/get-surveys")
                .then(data => {
                    this.setState({
                        surveyData: data
                    })
                });
            })
    }


    getOptions = (item: any) => {
        let options = Array<any>();

        for(let i = 0; i < this.state.surveyData.optionen.length; i++){
            
            if(this.state.surveyData.optionen[i] !== null){
                if(this.state.surveyData.optionen[i].umfrage === item.id){
                    options.push(this.state.surveyData.optionen[i]); 
                }
            }
        }    
        return options;    
    }

    conditionalRender = (item: any, i: number) => {
        const options = this.getOptions(item);
        for(let i = 0; i < options.length; i++){
            if(options[i].voters.includes(this.state.meData?._id)){
                return(
                    <div>
                        <Text fontSize="larger" marginLeft={500} marginTop="2em"><strong>{item.title}</strong></Text>
                        <HasVoted surveyData={this.state.surveyData} thisSurvey={item}/>
                    </div>
                )
            }

        }
        return this.hasNotVotedRender(item);
    }

    hasNotVotedRender(item: any){
        return(
            <div>
                <Text fontSize="larger" marginLeft={500} marginTop="2em"><strong>{item.title}</strong></Text>
                <Grid marginLeft={500}>
                    {this.getOptions(item).map((option, i) => {
                        return(
                        <GridItem colSpan={1}>
                            <Button color="black" onClick={async () => {
                                    // console.log(event.target.id)
                                    await genericPost("/api/vote", {optionId: option.id})
                                    this.fetchAllData();
                                }
                            }>{option.title}
                            </Button>
                        </GridItem>
                        )
                    })}
                </Grid>
            </div>
        )
    }

    linkToEdit = () => {
        if(this.state.meData !== null){
            if(this.state.meData.superuser){
                return (<Link style={{marginLeft: 400}} to="/edit-surveys">Neue Umfrage erstellen</Link>)
            }
        }
        return(<Text marginLeft={400} marginBottom="2em">Stimm hier in unseren tollen Umfragen die toll sind ab.</Text>)
    }

    render(){


        return(
            <div style={{ minHeight: "100vh", marginLeft: 0, marginTop: 60}} >
                {this.linkToEdit()}
                {this.state.surveyData === null ? 
                    "Bitte melde dich an bevor du abstimmst" : 
                    this.state.surveyData.umfragen.map((item: any, i: number) => {
                        console.log(item)
                        return this.conditionalRender(item, i);
                    })}
            </div>
        )
    }
}

export default Umfragen;