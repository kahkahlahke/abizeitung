import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { meQuery } from "../fetchUtils";
import { Kurs, Student } from "../utils";
import Comment from "./Comments"
import { Button, Grid, GridItem, Table, Text, Textarea } from "@chakra-ui/react";

const SchuelerDetail: React.FC = () => {
    const {schuelerId} = useParams<{schuelerId: string}>();
    const [meData, setMe] = useState<Student>(null);
    const [thisStudentData, setThisData] = useState<Student>(null);
    const [loading, setLoading] = useState(true);
    const [commentData, setCommentData] = useState([]);
    const [allStudentData, setAllData] = useState<Array<any>>([]);
    const [textareaContent, setTextArea] = useState("");
    const [textareaError, setTextError] = useState("");
    const [errorMessageField, setErrorMessage] = useState("");

    useEffect(() => {
        meQuery()
            .then(data => {
                if(data.error !== null){
                    return setErrorMessage(data.error.errorMessage);
                }
                setMe(data.data);
            });



        fetch("/api/students/singular", {
                  // Adding method type 
            method: "POST", 
                
            // Adding body or contents to send 
            body: JSON.stringify({ 
                studentId: schuelerId
            }), 
                
            // Adding headers to the request 
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            } 
        })
            .then(resp => resp.json())
            .then(data => {
                if(data.error !== null){
                    return setErrorMessage(data.error.errorMessage);
                }
                setThisData(data.data);
                setLoading(false);
            })
        
        fetch("/api/students/all")
            .then(resp => resp.json())
            .then(data => {
                if(data.error !== null){
                    return setErrorMessage(data.error.errorMessage);
                }
                setAllData(data.data);
                getComments();
            })


    }, []);

    const renderStudent = (student: Student) => {
        if(student === null){
            return <p>something went wrong :(</p>
        }
        return(
                
            <div >
                <Text marginBottom="1em" fontSize="x-large"><strong>{student.name}</strong></Text>
                <Text marginBottom="1em" style={{width: "60%"}}><strong>Über mich: </strong>{student.description}</Text>
                <Text marginBottom="1em" ><strong>Kurs: </strong>{Kurs[student.kurs]}</Text>
                <img src={"/images/" + student.image} alt={student.name} width="500"></img>
            </div>
        )
    }


    const getComments = () => {
        // alert(id)
        fetch("/api/comments/get",{ 
            method: "POST", 

            body: JSON.stringify({ 
                    studentId: schuelerId
            }), 

            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            } 
        })
            .then(resp => resp.json())
            .then(data => {
                if(data.error !== null){
                    return setErrorMessage(data.error.errorMessage)
                }
                setCommentData(data.data);
            });
    }

    const getStudentById = (id: number): string => {
        if(allStudentData === null){
            return "something went wrong :("
        }
        for(let i = 0; i < allStudentData.length; i++){
            
            if(allStudentData[i] !== null){
                if(allStudentData[i]._id === id){
                    return allStudentData[i].name
                }
            }
        }
        return "something went wrong :("
    }

    const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextArea(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(textareaContent === ""){
            setTextError("Du musst etwas schreiben.");
            return;
        }
        setTextError("");

        const formData = new FormData()
        formData.append("desc", textareaContent)
        formData.append("receiverId", schuelerId)
        const options = {
            method: 'POST',
            body: formData,
            credentials: "include"
        } as RequestInit
        await fetch("/api/comments/upload", options)
        setTextArea("");
        getComments();
    }
    
    const commentForm = () => {
        return(
            <form onSubmit={handleSubmit}>
                <Grid>
                    <GridItem marginTop="1em" marginBottom="1em">
                <p>Deine wohlüberlegte Meinung zu diesem Schueler: </p>
                </GridItem>
                {textareaError === "" ? (
                    <GridItem marginBottom="1em">
                    <Textarea w="50%" value={textareaContent} onChange={onTextAreaChange}>
                    </Textarea>
                    </GridItem>
                ): (
                    <div>
                    <GridItem marginBottom="1em">
                    <Textarea isInvalid w="50%" value={textareaContent} placeholder={textareaError} onChange={onTextAreaChange}>
                    </Textarea>
                    </GridItem>
                    </div>
                )}

                <GridItem>
                <Button color="black" type="submit">Submit</Button>
                </GridItem>
                </Grid>
            </form>
        )
    }

    return(
        <div style={{ minHeight: "100vh", marginLeft: 500, marginTop: 60}} >
            {loading ? "loading..." : renderStudent(thisStudentData)}
            {meData === null ? "" : commentForm()}
            {commentData === [] ? "loading..." : (
                <Table marginTop="2em" variant="striped">
                    {commentData.map((item: any, i) => {
                        return (
                            <Comment content={item.content} user={getStudentById(item.author)}  />
                        )
                    })}
                </Table>)}
            {errorMessageField === "" ? "" : (<Text color="red">! {errorMessageField}</Text>)}
        </div>
    )
}

export default SchuelerDetail;