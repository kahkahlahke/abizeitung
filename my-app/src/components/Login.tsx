import { Grid, GridItem } from "@chakra-ui/layout";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { ChangeEvent, FormEvent } from "react";

interface Props {}
interface State {
    username: string;
    password: string;
}

class Login extends React.Component<Props, State> {
    constructor(props: Props){
        super(props)

        this.state = {
            username: "",
            password: ""
        }
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name){
            case "name":
                this.setState({
                    username: e.target.value
                })
                break;
            case "password":
                this.setState({
                    password: e.target.value
                })
                break;
        }
    }

    handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const form = new FormData();
        form.append("name", this.state.username);
        form.append("password", this.state.password);

        console.log("my bick dig", this.state.password, this.state.username)
        const options = {
            method: 'POST',
            body: form,
            credentials: "include"
        }
        await fetch("/api/login", options as RequestInit)
        window.location.href = "/"
    }

    render(){
        return(
            <div style={{ minHeight: "100vh", marginLeft: 400, marginTop: 60}} >
                
                <form onSubmit={this.handleSubmit}>
                    <Grid w="65%">
                        <GridItem margin="1em" colSpan={2}>
                            <FormControl>
                                <FormLabel>Dein Name: </FormLabel>
                                <Input color="primary" onChange={this.handleChange} name="name" value={this.state.username}></Input>
                            </FormControl>
                        </GridItem>
                        <GridItem margin="1em" colSpan={2}>
                            <FormControl>
                                <FormLabel>Dein Passwort: </FormLabel>
                                <Input color="primary" type="password" onChange={this.handleChange} name="password" value={this.state.password}></Input>
                            </FormControl>
                        </GridItem>
                        <GridItem margin="1em">
                            <Button color="black" type="submit">Submit</Button>
                        </GridItem>
                    </Grid>
                </form>
            </div>
        )
    }
}

export default Login;