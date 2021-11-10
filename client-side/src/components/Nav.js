import React from 'react'
import crypto from '../images/cryptocurrency.png'
import {Avatar, Typography,Grid} from '@material-ui/core'
import { Link } from 'react-router-dom'
import {useMediaQuery} from '@material-ui/core'
import {BulbOutlined, HomeOutlined, MoneyCollectOutlined,FundOutlined} from '@ant-design/icons'
function Nav({toggleonMobile, settoggleonMobile}) {
    const isMobile = useMediaQuery('(max-width:700px)')

    return (
        <>
       
        <Grid className={isMobile && !toggleonMobile ? "nav-container" : "nav-container open" }>
            {
                !isMobile &&(
           <div className="Logo-container">
               <Avatar src={crypto} alt="crypto"/>
               <Typography variant="h4" className="title">Cryptoverse</Typography>
           </div>
                )
            }

           <Grid item spacing={3} className="nav-list">

               <Grid component={Link} to="/" className="list">
                   <HomeOutlined fontSize='small'/>
                   <Typography variant="subtitle1" className="home">Home</Typography>
               </Grid>
               <Grid component={Link} to="/cryptocurrencies" className="list">
                   <FundOutlined fontSize='small'/>
                   <Typography variant="subtitle1" className="home">Cryptocurrencies</Typography>
               </Grid>
               <Grid component={Link} to="/Exchanges" className="list">
                   <MoneyCollectOutlined fontSize='small'/>
                   <Typography variant="subtitle1" className="home">Exchanges</Typography>
               </Grid>
               <Grid component={Link} to="/News" className="list">
                   <BulbOutlined fontSize='small'/>
                   <Typography variant="subtitle1" className="home">News</Typography>
               </Grid>
           </Grid>
        </Grid>
</>
    )
}

export default Nav
