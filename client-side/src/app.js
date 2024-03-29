import React, { useState, useEffect } from "react";
import { Grid, AppBar, Toolbar } from "@material-ui/core";
import { Layout, Typography } from "antd";
import {
  Nav,
  Main,
  Crypto,
  News,
  Exchanges,
  CryptoDetails,
} from "./components/exports";
import { Switch, Route, Link } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import { MenuOutlined, CloseOutlined } from "@material-ui/icons";

function App() {
  const isMobile = useMediaQuery("(max-width:700px)");
  const [toggleonMobile, settoggleonMobile] = useState(false);
  const [erroMessage, seterrorMessage] = useState("");
  return (
    <div className="app">
      <Grid item className="nav-bar">
        <Nav
          toggleonMobile={toggleonMobile}
          settoggleonMobile={settoggleonMobile}
        />
      </Grid>
      <Grid item className="main">
        {!isMobile && erroMessage && (
          <div
            style={{
              padding: "1rem 3rem",
              backgroundColor: "#3586ff",
              color: "white",
              position: "fixed",
              inset: "auto auto auto auto",
              margin: "1rem auto",
              zIndex: "130",
            }}
            className="error_message"
          >
            {erroMessage}
          </div>
        )}
        <Layout>
          {isMobile && (
            <AppBar color="primary">
              <Toolbar>
                {!toggleonMobile ? (
                  <>
                    <div onClick={() => settoggleonMobile(true)}>
                      <MenuOutlined fontSize="small" />
                    </div>
                    <div style={{ transform: "translateX(100px)" }}>
                      {erroMessage && erroMessage}
                    </div>
                  </>
                ) : (
                  <CloseOutlined
                    fontSize="small"
                    onClick={() => settoggleonMobile(false)}
                  />
                )}
              </Toolbar>
            </AppBar>
          )}
          <div className="routes" onClick={() => settoggleonMobile(false)}>
            <Switch>
              <Route path="/" exact>
                <Main seterrorMessage={seterrorMessage} />
              </Route>
              <Route path="/cryptocurrencies" exact>
                <Crypto />
              </Route>
              <Route path="/cryptocurrencies/:coinId" exact>
                <CryptoDetails />
              </Route>
              <Route path="/Exchanges" exact>
                <Exchanges />
              </Route>
              <Route path="/News" exact>
                <News />
              </Route>
            </Switch>
            <div className="footer">
              <div className="waves">
                <div className="wave" id="wave1"></div>
                <div className="wave" id="wave2"></div>
                <div className="wave" id="wave3"></div>
                <div className="wave" id="wave4"></div>
              </div>
              <Typography variant="subtitle2" style={{ color: "white" }}>
                Copyright © 2021{" "}
                <Typography
                  color="primary"
                  style={{ textDecoration: "none", color: "orange" }}
                  component={Link}
                  to="/"
                  variant="subtitle2"
                >
                  Cryptoverse inc
                </Typography>{" "}
              </Typography>
              <Typography variant="subtitle2" style={{ color: "white" }}>
                All Rights Reserved.
              </Typography>
              <div className="footer-nav">
                <Typography
                  style={{ color: "orange", textDecoration: "none" }}
                  component={Link}
                  to="/"
                  variant="subtitle3"
                >
                  Home
                </Typography>
                <Typography
                  style={{ color: "orange", textDecoration: "none" }}
                  component={Link}
                  to="/Exchanges"
                  variant="subtitle3"
                >
                  Exchanges
                </Typography>
                <Typography
                  style={{ color: "orange", textDecoration: "none" }}
                  component={Link}
                  to="/News"
                  variant="subtitle3"
                >
                  News
                </Typography>
              </div>
            </div>
          </div>
        </Layout>
      </Grid>
    </div>
  );
}

export default App;
