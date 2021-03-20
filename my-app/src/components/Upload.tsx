import React, { ChangeEvent } from "react";
import { meQuery } from "../fetchUtils";
import { Student } from "../utils";

interface Props {}
interface State {
    meData: Student;
}


class Upload extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);

        this.state = {
            meData: null,
        }
    }

    componentDidMount = () => {
        meQuery().then(data => {
            this.setState({meData: data});
        })
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name){
            case "name":
                this.setState({meData: {
                    ...this.state.meData,
                    name: e.target.value
                } as Student});
                break;
            case "description":
                this.setState({meData: {
                    ...this.state.meData,
                    description: e.target.value
                } as Student});
                break;               
        }
    }

    render= () => {
        return(
            <div style={{ minHeight: "100vh", marginLeft: 500, marginTop: 60}} >
                <form style={{color: "inherit"}}>
                    <input color="primary" onChange={this.handleChange} name="name" value={this.state.meData?.name}></input>
                    <input color="primary" onChange={this.handleChange} name="description" value={this.state.meData?.description}></input>
                </form>    
            </div>
        )
    }
}


export default Upload; 