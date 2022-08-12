import React, { useState } from "react";
import {
  useGetCryptoHistoryQuery,
  useGetCryptoDetailsQuery,
} from "../redux/services/cryptoapi";
import { useParams } from "react-router-dom";
import millify from "millify";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  CheckOutlined,
  NumberOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import HTMLParser from "html-react-parser";
import { Typography } from "@material-ui/core";
import { Select } from "antd";
import { Col } from "antd";
import Loading from "./isLoading";
import Linechart from "./Linechart";
import { currencies } from "../data/currencies";
function CryptoDetails() {
  const { coinId } = useParams();
  const { Option } = Select;
  const [timeperiod, settimeperiod] = useState("7d");
  const { data } = useGetCryptoDetailsQuery(coinId);
  const { data: Info, isFetching } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });
  const currency = currencies.coins.find(
    (coin) => Number(coin.id) === Number(coinId)
  );
  const detailedInfo = data?.data?.coin || currency;
  if (isFetching) return <Loading />;
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const stats = [
    {
      title: "Price to USD",
      value: detailedInfo?.price && `$ ${millify(detailedInfo?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "Rank",
      value: detailedInfo?.rank && `$ ${millify(detailedInfo?.rank)}`,
      icon: <NumberOutlined />,
    },
    {
      title: "24h Volume",
      value: detailedInfo?.volume && `$ ${millify(detailedInfo?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: detailedInfo?.marketCap && `$ ${millify(detailedInfo?.marketCap)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value:
        detailedInfo?.allTimeHigh?.price &&
        `$ ${millify(detailedInfo?.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const otherStats = [
    {
      title: "Number Of Markets",
      value:
        detailedInfo?.numberOfMarkets &&
        `${millify(detailedInfo?.numberOfMarkets)}`,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value:
        detailedInfo?.numberOfExchanges &&
        `${millify(detailedInfo?.numberOfExchanges)}`,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Approved Supply",
      value: detailedInfo?.approvedSupply && <CheckOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value:
        detailedInfo?.totalSupply && `$ ${millify(detailedInfo?.totalSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value:
        detailedInfo?.circulatingSupply &&
        `$ ${millify(detailedInfo?.circulatingSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];
  return (
    <div key={detailedInfo?.id} style={{ gap: "1rem", padding: "1rem" }}>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h4" style={{ color: "#287CF7" }}>
          <strong>{`${detailedInfo?.name} (${detailedInfo?.slug}) Price`}</strong>
        </Typography>
        <Typography variant="body2">{`${detailedInfo?.name} live price in US Dollar (USD). View value statistics, market cap and supply`}</Typography>
      </div>

      <Select defaultValue="7d" onChange={(value) => settimeperiod(value)}>
        {time?.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      {Info && (
        <Linechart
          coinHistory={Info?.data}
          coinPrice={millify(detailedInfo?.price)}
          coinName={detailedInfo?.name}
        />
      )}

      <div style={{ display: "flex" }}>
        <Col span={12} style={{ padding: "1rem", gap: "1rem" }}>
          <Typography variant="body1" style={{ color: "#287CF7" }}>
            {`${detailedInfo?.name}`} Value Statistics
          </Typography>
          <Typography variant="subtitle2">{`An overview showing the statistics of ${detailedInfo?.name}, subh as the base and quote currency, the rank and tranding volume `}</Typography>
          <Col>
            {stats.map((info, i) => (
              <div key={i} className="currency-stats">
                <div
                  style={{
                    display: "flex",
                    gap: ".40rem",
                    alignItems: "center",
                  }}
                >
                  {info.icon}
                  <Typography variant="body2">{info.title}</Typography>
                </div>
                <Typography>
                  <strong>{info.value}</strong>
                </Typography>
              </div>
            ))}
          </Col>
        </Col>

        <Col span={12} style={{ padding: "1rem", gap: "1rem" }}>
          <Typography variant="body1" style={{ color: "#287CF7" }}>
            {`${detailedInfo?.name}`} Value Statistics
          </Typography>
          <Typography variant="subtitle2">{`An overview showing the statistics of ${detailedInfo?.name}, subh as the base and quote currency, the rank and tranding volume `}</Typography>
          <Col>
            {otherStats?.map((info) => (
              <div className="currency-stats">
                <div
                  style={{
                    display: "flex",
                    gap: ".40rem",
                    alignItems: "center",
                  }}
                >
                  {info.icon}
                  <Typography variant="body2">{info.title}</Typography>
                </div>
                <Typography>
                  <strong>{info.value}</strong>
                </Typography>
              </div>
            ))}
          </Col>
        </Col>
      </div>
      <div span={12} style={{ padding: "1rem", gap: "1rem", display: "flex" }}>
        <Col xs={24} lg={12}>
          <Typography
            style={{ color: "#287CF7" }}
            variant="h5"
          >{`What is ${detailedInfo?.name}?`}</Typography>
          {HTMLParser(detailedInfo?.description || "")}
        </Col>
        <Col xs={24} lg={12}>
          {detailedInfo?.links?.map((info) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
                borderBottom: "1px solid rgba(171, 171, 171,0.4)",
              }}
            >
              <Typography variant="body1">{`${info?.type}`}</Typography>
              <a
                href={info.url}
                rel="noreferrer"
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <Typography
                  style={{ color: "#287CF7" }}
                  variant="body1"
                >{` ${info?.name}`}</Typography>
              </a>
            </div>
          ))}
        </Col>
      </div>
    </div>
    // ))
    // }
  );
}

export default CryptoDetails;
