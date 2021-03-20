import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { meQuery } from "../fetchUtils";
import { Kurs, Student } from "../utils";
import Comment from "./Comments"

const SchuelerDetail: React.FC = () => {
    const {schuelerId} = useParams<{schuelerId: string}>();
    const [meData, setMe] = useState<Student>(null);
    const [thisStudentData, setThisData] = useState<Student>(null);
    const [loading, setLoading] = useState(true);
    const [commentData, setCommentData] = useState([]);
    const [allStudentData, setAllData] = useState<Array<any>>([]);
    const [textareaContent, setTextArea] = useState("");
    const [textareaError, setTextError] = useState("");

    useEffect(() => {
        meQuery()
            .then(data => {
                setMe(data);
            });



        fetch("/api/get-singular", {
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
                setThisData(data);
                setLoading(false);
            })
        
        fetch("/api/get-students")
            .then(resp => resp.json())
            .then(data => {
                setAllData(data);
                getComments();
            })


    }, []);

    const renderStudent = (student: Student) => {
        if(student === null){
            return <p>something went wrong :(</p>
        }
        return(
                
            <div >
                <h1>{student.name}</h1>
                <p style={{width: "60%"}}><strong>Über mich: </strong>{student.description}</p>
                <p><strong>Kurs: </strong>{Kurs[student.kurs]}</p>
                <img src={"/images/" + student.image} alt={student.name} width="500"></img>
            </div>
        )
    }


    const getComments = () => {
        // alert(id)
        fetch("/api/get-comments",{ 
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
                setCommentData(data);
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
        await fetch("/api/write-comment", options)
        setTextArea("");
        getComments();
    }
    
    const commentForm = () => {
        return(
            <form onSubmit={handleSubmit}>
                <p>Deine wohlüberlegte Meinung zu diesem Schueler: </p>
                {textareaError === "" ? (
                <textarea value={textareaContent} onChange={onTextAreaChange}>
                </textarea>
                ): (
                    <textarea value={textareaContent} onChange={onTextAreaChange}>
                    </textarea>
                )}

                <button type="submit">Submit</button>
            </form>
        )
    }

    return(
        <div style={{ minHeight: "100vh", marginLeft: 500, marginTop: 60}} >
            {loading ? "loading..." : renderStudent(thisStudentData)}
            {meData === null ? "" : commentForm()}
            {commentData === [] ? "loading..." : (
                <table>
                    {commentData.map((item: any, i) => {
                        return (
                            <Comment content={item.content} user={getStudentById(item.author)}  />
                        )
                    })}
                </table>)}
        </div>
    )
}

export default SchuelerDetail;