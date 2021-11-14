import React from 'react'
import { Line, Bar } from 'react-chartjs-2'
import { Typography } from '@material-ui/core'
import millify from 'millify'
import { currencies } from '../data/currencies'
function Linechart({ coinHistory, coinPrice, coinName }) {
  const currentprice = []
  const coinTimestamp = []
  for (let i = 0; i < coinHistory.history.length; i++) {
    currentprice.push(coinHistory.history[i].price)
  }
  for (let i = 0; i < coinHistory.history.length; i++) {
    coinTimestamp.push(new Date(coinHistory.history[i].timestamp).toLocaleString())
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: currentprice,
        backgroundColor: '#287CF7',
       
        fill: true,
        borderColor: 'blue'

      }
    ]
  }
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };


  const polaroptions = {
    responsive: true
  }



  // 
  const polardata = {
    labels: coinTimestamp,
    datasets: [{
      label: `${coinName} Dataset`,
      data: currentprice,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
        'rgb(201, 203, 207)',
        'rgb(54, 162, 235)'
      ]
    }]
  };
  return (
    <div>

      <div className="chart-headers" style={{ display: "flex", justifyContent: 'space-between', alignItems: "center" }}>
        <Typography variant="h4"   style={{color: '#287CF7'}}>{`${coinName} Price Chart`}</Typography>
        <Typography variant='body1'><strong>{`Change: ${coinHistory.change} Current: $ ${millify(currentprice)} `}</strong></Typography>
      </div>
      <div className="graph" >
        <div className="line" >
          <Line data={data} options={options} />

        </div>
       
      </div>
    </div>
  )
}

export default Linechart
