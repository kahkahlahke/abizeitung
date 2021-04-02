import React from "react";
import { Link } from "react-router-dom";
import { Grid, Table, Td, Tr } from "@chakra-ui/react";

const NavBar: React.FC = () => {
    return(
        <Grid placeItems="center" background="#21252b" >
            <Table variant="unstyled" width="91%" marginLeft="40"  paddingBottom="20" background="#21252b" paddingTop="20" textAlign="center">
                <Tr>
                    <Td>
                        <img src={"/static-images/plrund.png"} alt="our lord and saviour" width="100"></img>

                    </Td>
                    <Td>
                        <p><strong>Abizeitung GSG</strong></p>
                    </Td>
                    <Td>
                        <Link style={{color: "inherit"}} to="/">
                            {/* <Link to="/"> */}
                                Home
                            {/* </Link> */}
                        </Link>
                    </Td>
                    <Td>
                        <Link style={{color: "inherit"}} to="/register">
                            {/* <Link to="/register"> */}
                                Upload
                            {/* </Link> */}
                        </Link>
                    </Td>
                    <Td>
                        <Link style={{color: "inherit"}} to="/login">
                            {/* <Link to="/login"> */}
                                Login
                            {/* </Link> */}
                        </Link>
                    </Td>
                    <Td>
                        <Link style={{color: "inherit"}} to="/umfragen">
                            {/* <Link to="/umfragen"> */}
                                Umfragen
                            {/* </Link> */}
                        </Link>
                    </Td>
                </Tr>
            </Table>
        </Grid>
    )
}

export default NavBar;
// style={{width: "100%", marginLeft: 0, paddingBottom: 20, background: "#21252b", paddingTop:20, textAlign: "center"}}