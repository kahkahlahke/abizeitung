import { Button } from "@chakra-ui/button";
import { Input, Text } from "@chakra-ui/react";
import React, { ChangeEvent, FormEvent } from "react";
import { genericPost } from "../utils";

interface Props{}
interface State{
    title: string;
    options: Array<string>
    currentInput: string;
}

class CreateSurvey extends React.Component<Props,State>{
    constructor(props: Props){
        super(props);

        this.state = {
            title: "",
            options: [],
            currentInput: ""
        }
    }

    handleAddOption = (e: FormEvent) => {
        e.preventDefault();
        console.log(this.state.currentInput)
        this.setState(state => {
            const options = [...state.options, state.currentInput]
            return {
                options,
                currentInput: ""
            }
        })
    }
    
    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch(e.target.name){
            case "title":
                this.setState({
                    title: e.target.value
                })
                break;
            case "currentInput":
                this.setState({
                    currentInput: e.target.value
                })
                break;
        }

    }
    handleSubmit = async () => {
        await genericPost("/api/surveys/create", {title: this.state.title, options: this.state.options})
        window.location.href = "/umfragen"
    }

    render(){
        return(
            <div style={{ width:"50%", minHeight: "100vh", marginLeft: 500, marginTop: 60}} >
                <form style={{marginBottom: "2em"}}>
                    <Text marginBottom="1em">Titel: </Text>
                    <Input onChange={this.handleChange} name="title" marginBottom="2em" value={this.state.title}></Input>
                    <Text marginBottom="1em">Optionen: </Text>
                    <Input onChange={this.handleChange} name="currentInput" marginBottom="2em" value={this.state.currentInput}></Input>
                    <Button color="black" onClick={this.handleAddOption}>Option hinzufügen</Button>
                </form>
                <ul>
                    {this.state.options.map((item, i) => {
                        return (<li style={{marginBottom: "2em", color: "white"}}  key={i}>{item}</li>)
                    })}
                </ul>
                <Button color="black" onClick={this.handleSubmit}>Submit</Button>
            </div>
        )
    }
}

export default CreateSurvey;