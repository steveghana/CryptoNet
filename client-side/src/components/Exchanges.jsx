import React from "react";
import { useGetExchangeDataQuery } from "../redux/services/cryptoapi";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import {
  ExpansionPanel,
  Grid,
  ExpansionPanelSummary,
  AccordionDetails,
  Avatar,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { Row, Col } from "antd";
import { Typography } from "@material-ui/core";
import Loading from "./isLoading";
function Exchanges() {
  const { data: exchange, isFetching, error } = useGetExchangeDataQuery();
  if (isFetching) return <Loading />;
  if (error)
    return (
      <div
        className="exchange-container"
        style={{
          padding: ".50rem",
          height: "88vh",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {error?.data?.message}
      </div>
    );
  return (
    <div
      className="exchange-container"
      style={{ padding: ".50rem", height: "88vh" }}
    >
      <Row>
        <Col span={6}>
          <Typography variant="subtitle1">Exchanges</Typography>
        </Col>
        <Col span={6}>
          <Typography variant="subtitle1">24h trade volume</Typography>
        </Col>
        <Col span={6}>
          <Typography variant="subtitle1">Markets</Typography>
        </Col>
        <Col span={6}>
          <Typography variant="subtitle1">Change</Typography>
        </Col>
      </Row>
      <Grid container className="expand">
        {exchange?.data?.exchanges?.map((info, i) => (
          <Col span={24}>
            <ExpansionPanel key={i}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                style={{ padding: "1rem" }}
              >
                <Col span={6}>
                  <div style={{ display: "flex", gap: ".20rem" }}>
                    <Typography variant="text">
                      <strong>{info.rank}.</strong>
                    </Typography>
                    <Avatar
                      src={info.iconUrl}
                      style={{ width: "20px", height: "20px" }}
                    />
                    <Typography variant="text">
                      <strong>{info.name}</strong>
                    </Typography>
                  </div>
                </Col>
                <Col span={6}>
                  <Typography variant="subtitle1">
                    <strong>${millify(info.volume)}</strong>
                  </Typography>
                </Col>

                <Col span={6}>
                  <Typography variant="subtitle1">
                    <strong>{millify(info.numberOfMarkets)}</strong>
                  </Typography>
                </Col>
                <Col span={6}>
                  <Typography variant="subtitle1">
                    <strong>{millify(info.marketShare)}%</strong>
                  </Typography>
                </Col>
              </ExpansionPanelSummary>
              <AccordionDetails className="panel-description">
                {HTMLReactParser(info?.description || "")}
              </AccordionDetails>
            </ExpansionPanel>
          </Col>
        ))}
      </Grid>
    </div>
  );
}

export default Exchanges;
