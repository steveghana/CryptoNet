import React,{} from 'react'
import {Statistic, Row} from 'antd'
import {Crypto, News} from "./exports"
import {Link} from 'react-router-dom'
import {Grid, Typography} from '@material-ui/core'
import { useGetDataQuery } from '../redux/services/cryptoapi'
import millify from 'millify'
import { currencies } from '../data/currencies'
import Loading from './isLoading'
function Main() {

   const {data: cryptoStats, isFetching} = useGetDataQuery(10)
// const {stats} = currencies 

   if(isFetching) return <Loading/>
   
    return (
        <Grid container style={{gap:'2rem', padding:'3rem', display:"flex", flexDirection:"column"}}>
            
           <Typography variant="h4" style={{color: '#287CF7',marginTop : "3rem"}} >Global Crypto Stats</Typography>
           <Row gutter={[3,3]} >
               <Grid   item xs={6} md={5}><Typography color='primary'><Statistic  className="stat" title="Total Crypto Currencis" value={millify( cryptoStats?.data?.stats?.total)}/></Typography></Grid>
               <Grid  item xs={6} md={5}><Statistic style={{color:'red'}} className="stat" title="Total Exchanges" value={millify( cryptoStats?.data?.stats?.totalExchanges)}/></Grid>
               <Grid  item xs={6} md={5}><Statistic className="stat" title="Total Market Cap" value={millify( cryptoStats?.data?.stats?.totalMarketCap)}/></Grid>
               <Grid  item xs={6} md={5}><Statistic className="stat" title="Total Crypto 24h volume" value={millify( cryptoStats?.data?.stats?.total24hVolume)}/></Grid>
               <Grid  item xs={6} md={5}><Statistic className="stat" title="Total Markets" value={millify( cryptoStats?.data?.stats?.totalMarkets)}/></Grid>
           </Row>
           <Grid container style={{display :"flex", flexDirection : 'column', gap:"1rem"}} spacing={3} >
           <div className="top-10-header">
               <Typography style={{color: '#287CF7'}} variant="h5" ><strong> Top 10 Cryptos in the World</strong></Typography>
               <Typography component={Link} style={{textDecoration : "none"}} to="/cryptocurrencies" variant="subtitle1">Show More</Typography>
           </div>
           <Grid item>
               <Crypto filtered/>
           </Grid>
           <div className="news-header">
            <Typography style={{color: '#287CF7'}} variant="h5"> <strong>Latest Crypto News</strong> </Typography>
            <Typography component={Link} to="/News" variant="subtitle1" style={{textDecoration: "none"}}>Show More</Typography>
        </div>
           <Grid item>
               <News filtered/>
           </Grid>

           </Grid>
        </Grid>
    )
}

export default Main
