import React from "react";
import PieChart from "./PieChart";

interface Props{
    surveyData: any
    thisSurvey: any
}
interface State{}

class HasVoted extends React.Component<Props, State> {
    constructor(props: Props){
        super(props)
    }


    makeRandomColor = () => {
        return `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})`;
    }


    getSurveyById = (id: number): string => {
        if(this.props.surveyData.umfragen === null){
            return "something went wrong :("
        }
        for(let i = 0; i < this.props.surveyData.umfragen.length; i++){
            
            if(this.props.surveyData.umfragen[i] !== null){
                if(this.props.surveyData.umfragen[i].id === id){
                    return this.props.surveyData.umfragen[i].title
                }
            }
        }
        return "something went wrong :("
    }

    getOptions = () => {
        let options = Array<any>();

        for(let i = 0; i < this.props.surveyData.optionen.length; i++){
            
            if(this.props.surveyData.optionen[i] !== null){
                if(this.props.surveyData.optionen[i].umfrage === this.props.thisSurvey.id){
                    options.push(this.props.surveyData.optionen[i]); 
                }
            }
        }    
        return options;    
    }

    render(){
        return(
            <div>
                <PieChart 
                    labels={this.getOptions().map((yep) => yep.title)}  
                        data={this.getOptions().map((yep) => yep.numberOf)}
                        backgroundColor={this.getOptions().map((yep) => this.makeRandomColor())}

                    />
            </div>
        )
    }
}

export default HasVoted;