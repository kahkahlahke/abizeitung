import React from "react";
import SingleStudent from "./SingleStudent";
import { Table, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {}
interface State {
    allStudentData: [],
    loading: boolean,
    meName: string,
    isSuperuser: boolean
}

class AllStudents extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);

        this.state = {
            allStudentData: [],
            loading: true,
            meName: "",
            isSuperuser: false
        }
    }

    componentDidMount(){
        fetch("/api/get-students").then(resp => {
            console.log(resp);
            return resp.json();
        }).then(data => {
            console.log(data)
            this.setState({ allStudentData: data, loading: false });
        })
        fetch("/api/me-query").then(resp => resp.json())
        .then(data => {
            this.setState({meName: data.name, isSuperuser: data.superuser})
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
            </div>
        )
    }
}

export default AllStudents;