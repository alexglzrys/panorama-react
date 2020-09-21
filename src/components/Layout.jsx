import React from "react";
import Navbar from "./Navbar";
import Box from "@material-ui/core/Box";
import Nav from "./Nav";

const Layout = (props) => (
  <div className="App">
    <Navbar />
    <Box display="flex" p={1}>
      <Box p={1} flexBasis={250} flexShrink={0}>
        <Nav />
      </Box>
      <Box p={1} flexGrow={1}>
        {props.children}
      </Box>
    </Box>
  </div>
);

export default Layout;
