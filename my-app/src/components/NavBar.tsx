import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
    return(
        <div>
            <table style={{width: "100%", marginLeft: 0, paddingBottom: 20, background: "#21252b", paddingTop:20, textAlign: "center"}}>
                <tr>
                    <td>
                        <img src={"/static-images/plrund.png"} width="100"></img>

                    </td>
                    <td>
                        <p><strong>Abizeitung GSG</strong></p>
                    </td>
                    <td>
                        <Link style={{color: "inherit"}} to="/">
                            {/* <Link to="/"> */}
                                Home
                            {/* </Link> */}
                        </Link>
                    </td>
                    <td>
                        <Link style={{color: "inherit"}} to="/register">
                            {/* <Link to="/register"> */}
                                Upload
                            {/* </Link> */}
                        </Link>
                    </td>
                    <td>
                        <Link style={{color: "inherit"}} to="/login">
                            {/* <Link to="/login"> */}
                                Login
                            {/* </Link> */}
                        </Link>
                    </td>
                    <td>
                        <Link style={{color: "inherit"}} to="/umfragen">
                            {/* <Link to="/umfragen"> */}
                                Umfragen
                            {/* </Link> */}
                        </Link>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default NavBar;