import { Navigate } from "react-router-dom";
import { useState } from "react";

import "./donate.css";
import ProgressBar from "../components/ProgressBar";


export default function Donate(props){
    const [completed, setCompleted] = useState(0);
    setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 7000);

    const FunctionIntro = () => {
        return (
            <div className = "donate-intro">
                <p>
                    &emsp;*Insert project name here*
                    <br/>
                    &emsp;*Insert project description here*
                    <br/>
                    Progress Bar
                </p>
            </div>
        )
    }

    const DonateValPanel = () => {
        return (
            <div>
                Please enter your donation amount:
                <br />
                <input width = "30px" type = "number" id = "inputVal"></input>
                <br />
                <div className = "donate-storeBox">
                    <button className = "btn" onClick = {props.storeValHandle}>
                        Donate
                    </button>
                    {
                        props.storedPending ?
                        <span>
                            {
                                props.storedDone ?
                                <span>Done! </span>:
                                 <span>Pending... </span>
                            }
                        </span> : 
                        <span>
                            {
                                props.storedDone ?
                                <span>Rejected! </span>:
                                <span>Please try again. </span>
                            }
                        </span>
                    }
                </div>
            </div>
        )
    }

   // const GetValPanel = () => {
    //    return (
    //        <div>
    //            Click 'get' to check the stored value:&nbsp;
    //            <span className = "global-message">
    //                {props.showVal}
    //            </span>
    //            <br />
    //            <button className = "btn" onClick = {props.showValHandle}>
    //                get
    //            </button>
    //        </div>
    //    )
    //}

    const FunctionPanel = () => {
        return (
            <div className = "donate-box">
                <DonateValPanel/>
                <br/>
                <ProgressBar bgcolor={"#6a1b9a"} completed={completed} />
            </div>
        )
    }

    const StoragePage = () => {
        return (
            <div className = "donate-background">
                <h1>Donation Page</h1>
                <div className = "donate">
                    <FunctionIntro/>
                    <div className = "donate-vertLine">
                        <p>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;</p>
                    </div>
                    <FunctionPanel/>
                </div>

                {/*<GlobalToolBar/>*/}
            </div>
        )
    }

    return (
        <div>
            <StoragePage />
            {/*
                props.isConnected ?
                <StoragePage />:
                <Navigate to = '/InterfaceDemo' />
             */}
        </div>
    )
}