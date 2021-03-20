import React from "react";
import SingleStudent from "./SingleStudent";

interface Props {}
interface State {
    allStudentData: [],
    loading: boolean,
    meName: string
}

class AllStudents extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);

        this.state = {
            allStudentData: [],
            loading: true,
            meName: ""
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
            this.setState({meName: data.name})
        })
    }

    render(){
        return(
            <div style={{ minHeight: "100vh", marginLeft: 500, marginTop: 60}} >
                <p>Hello {this.state.meName}</p>
                {/* <h1 style={{alignSelf: "center", alignContent: "center"}}>Abizeitung Sehr Gut</h1> */}
                <table style={{width: "70%"}}>
                { this.state.loading ? "loading..." : this.state.allStudentData.map((item, i) => {
                    return (

                        <SingleStudent item={item} key={i} />

                    )
                } )}
                </table>
            </div>
        )
    }
}

export default AllStudents;