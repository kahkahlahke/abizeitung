import { Input, Select, Table, Td, Textarea, Tr, FormControl, FormLabel, Grid, GridItem, Button, Flex } from "@chakra-ui/react";
import { kStringMaxLength } from "node:buffer";
import { stringify } from "node:querystring";
import React, { ChangeEvent, FormEvent } from "react";
import { meQuery } from "../fetchUtils";
import { Kurs, Student } from "../utils";
import "../upload.css"

interface Props {}
interface State {
    meData: {
        student: Student,
        kursString: string,
        password: string;
        passwordConfirm: string;
    }
    selectedFile: File | null,
}


class Upload extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);

        this.state = {
            meData: {
                student: null,
                kursString: "EN1",
                password: "",
                passwordConfirm: "",
            },
            selectedFile: null,
        }
    }

    componentDidMount = () => {
        meQuery().then(data => {
            if(data.error !== null){
                return;
            }
            this.setState({meData: {
                ...this.state.meData,
                student: data.data,
                kursString: Kurs[data.data.kurs]
            }});
        })
    }

    handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        switch (e.target.name){
            case "name":
                this.setState({meData: {
                    ...this.state.meData,
                    student: {
                        ...this.state.meData.student,
                        name: e.target.value
                    } as Student
                } });
                break;
            case "description":
                this.setState({meData: {
                    ...this.state.meData,
                    student: {
                        ...this.state.meData.student,
                        description: e.target.value
                    } as Student
                } });
                break;
            case "kurs":
                this.setState({meData: {
                    ...this.state.meData,
                    kursString: e.target.value
                } });
                break;
            case "image":
                const imageTarget = e.target as HTMLInputElement;
                if(imageTarget.files === null){
                    return
                }
                this.setState({selectedFile: imageTarget.files[0]});
                break;
            case "password":

                this.setState({
                    meData: {
                        ...this.state.meData,
                        password: e.target.value
                    }
                });
                break;
            case "passwordConfirm":                
                this.setState({
                    meData: {
                        ...this.state.meData,
                        passwordConfirm: e.target.value
                    }
                });
                break;
        }
    }

    handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const form = new FormData();
        if(this.state.meData.student === null){
            return;
        }
        if(this.state.selectedFile === null){
            return
        }
        if(this.state.meData.password !== this.state.meData.passwordConfirm){
            return
        }

        form.append("name", this.state.meData.student?.name);
        form.append("kurs", this.state.meData.kursString);
        form.append("desc", this.state.meData.student?.description);
        form.append("file", this.state.selectedFile);
        form.append("password", this.state.meData.password);

        const options = {
            method: 'POST',
            body: form,
            credentials: "include"
        }
        if(this.state.meData.student._id === undefined){
            console.log("upload")
            await fetch("/api/students/upload", options as RequestInit)

            window.location.href = "/"
            return
        }
        console.log("update")
        await fetch("/api/students/update", options as RequestInit)

        window.location.href = "/"
    }

    createOptions = () => {
        let kurse: any[] = [];

        for(let i = 0; i < 8; i++){
            kurse.push(Kurs[i])
        }
    

        return(
            kurse.map((item, i) => {
                return(
                    <option key={i}>{item}</option>
                )
            })
        )
    }

    render= () => {
        return(
            <Flex justifyContent="center">
                <form style={{color: "inherit", width: "45%"}} onSubmit={this.handleSubmit}>
                    <Grid templateRows="repeat(5, 1fr)" w="100%" variant="unstyled" marginTop="3em">
                            <GridItem margin="1em" rowSpan={1} colSpan={2}>
                                <FormControl>
                                    <FormLabel>Dein Name: </FormLabel>
                                <Input color="primary" onChange={this.handleChange} name="name" value={this.state.meData.student?.name}></Input>
                                </FormControl>
                            </GridItem>
                            <GridItem margin="1em" rowSpan={1}  colSpan={2}>
                                <FormControl>
                                <FormLabel>Dein Kurs: </FormLabel>
                                <Select onChange={this.handleChange} value={this.state.meData.kursString} name="kurs" color="gray" >
                                    {this.createOptions()}
                                </Select>
                                </FormControl>
                            </GridItem>
                            <GridItem  margin="1em" rowSpan={1}  colSpan={4}>
                                <FormControl>
                                    <FormLabel>
                                        Lade ein wunderschönes Bild v,n dir hoch:
                                    </FormLabel>
                                    <Input onChange={this.handleChange} name="image" type="file"></Input>
                                </FormControl>
                            </GridItem>

                            <GridItem margin="1em" rowSpan={2} colSpan={4}>
                                <FormControl>
                                    <FormLabel>
                                        Über dich:
                                    </FormLabel>
                                    <Textarea height="40" onChange={this.handleChange} name="description" value={this.state.meData.student?.description} ></Textarea>
                                </FormControl>
                            </GridItem>
                            <GridItem margin="1em" rowSpan={1} colSpan={2}>
                                <FormControl>
                                    <FormLabel>
                                        Dein Passwort: 
                                    </FormLabel>
                                    <Input type="password" onChange={this.handleChange} name="password" value={this.state.meData.password} ></Input>
                                </FormControl>
                            </GridItem>
                            <GridItem margin="1em" rowSpan={1} colSpan={2}> 
                                <FormControl>
                                    <FormLabel>
                                        Dein Passwort bestätigen: 
                                    </FormLabel>
                                    <Input type="password" onChange={this.handleChange} name="passwordConfirm" value={this.state.meData.passwordConfirm} ></Input>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <Button color="black" type="submit" margin="1em">Submit</Button>
                            </GridItem>
                    </Grid>
                    
                    
                </form>
            </Flex>
        )
    }
}



export default Upload; 