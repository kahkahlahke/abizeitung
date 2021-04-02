import React from "react";
import SingleStudent from "./SingleStudent";
import { Table, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {}
interface State {
    allStudentData: [],
    loading: boolean,
    meName: string,
    isSuperuser: boolean,
    errorMessage: string | null;
}

class AllStudents extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);

        this.state = {
            allStudentData: [],
            loading: true,
            meName: "",
            isSuperuser: false,
            errorMessage: null
        }
    }

    componentDidMount(){
        fetch("/api/students/all").then(resp => {
            console.log(resp);
            return resp.json();
        }).then(data => {
            if(data.error !== null){
                this.setState({errorMessage: data.error.errorMessage, loading: false})
                return; 
            }
            this.setState({ allStudentData: data.data, loading: false });
        })
        fetch("/api/students/me-query").then(resp => resp.json())
        .then(data => {
            if(data.error !== null){
                this.setState({errorMessage: data.error.errorMessage})
                return; 
            }
            this.setState({meName: data.data.name, isSuperuser: data.data.superuser})
        })
    }

    render(){
        return(
            <div style={{ minHeight: "100vh", marginLeft: 400, marginTop: 60}} >
                <Text marginBottom="1em" fontSize="large">Hallo <strong>{this.state.meName}</strong></Text>
                {this.state.isSuperuser ? (<Link style={{color: "lightblue"}} to="/edit-students">Posts editieren</Link>) : ""}
                {/* <h1 style={{alignSelf: "center", alignContent: "center"}}>Abizeitung Sehr Gut</h1> */}
                <Table width="70%" variant="striped" colorScheme="red" borderColor="gray">
                { this.state.loading ? "loading..." : this.state.allStudentData.map((item, i) => {
                    return (

                        <SingleStudent item={item} key={i} />

                    )
                } )}
                </Table>
                {this.state.errorMessage !== null ? (<Text color="red">! {this.state.errorMessage}</Text>): ""}
            </div>
        )
    }
}

export default AllStudents;