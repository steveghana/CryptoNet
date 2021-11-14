import React, { useState, useEffect } from "react";
import millify from "millify";
import { Col, Card, Row, Input } from "antd";
import { useGetDataQuery } from "../redux/services/cryptoapi";
import { Link } from "react-router-dom";

import Loading from "./isLoading";
function Crypto({ filtered }) {
  const count = filtered ? 10 : 100;
  const { data: cryptoStats, isFetching } = useGetDataQuery(count);
  const [cryptos, setcryptos] = useState();
  const [cryptosearch, setcryptosearch] = useState("");
  useEffect(() => {
    setcryptos(cryptoStats);

    const filteredData = cryptoStats?.data?.coins?.filter((data) =>
      data.name.toLowerCase().includes(cryptosearch)
    );
    setcryptos(filteredData);
  }, [cryptosearch, cryptoStats]);
  if (isFetching) return <Loading />;

  return (
    <div style={{ padding: !filtered ? "2rem" : "0rem" }}>
      {!filtered && (
        <Col span={6} style={{ marginTop: "3rem", margin: "auto" }}>
          <Input
            style={{ borderRadius: "60px" }}
            placeholder="Search Cryptocurrency"
            onChange={(e) => setcryptosearch(e.target.value.toLowerCase())}
          />
        </Col>
      )}
      <Row gutter={[32, 32]} style={{ marginTop: "1rem" }}>
        {cryptos?.map((coin, i) => (
          <Col xs={24} md={12} lg={6}>
            <Link to={`/cryptocurrencies/${coin.id}`}>
              <Card
                key={coin.id}
                title={`${coin.rank}. ${coin.name}`}
                extra={
                  <img
                    style={{ maxWidth: "20px", maxHeight: "20px" }}
                    src={coin?.iconUrl}
                    alt="coin"
                  />
                }
                hoverable
              >
                <p style={{ fontWeight: "bold" }}>
                  Price: {millify(coin.price)}
                </p>
                <p style={{ fontWeight: "bold" }}>
                  marketCap: {millify(coin.marketCap)}
                </p>
                <p style={{ fontWeight: "bold" }}>
                  DailyChange: {millify(coin.numberOfExchanges)}
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Crypto;
