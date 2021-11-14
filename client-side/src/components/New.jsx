import React, { useState } from 'react'
import moment from 'moment'
import { Grid, Typography, } from '@material-ui/core'
import { Row, Col, Card, Avatar, Button } from 'antd'
import { useGetCryptoNewsQuery } from '../redux/services/cryptoNewsapi'
import Loading from './isLoading'
import Demo from '../images/logo (1).png'
import { news } from '../data/news'
function News({ filtered }) {
    // const {value} = news
    const count = filtered ? 10 : 100
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count });
    const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
    if (isFetching) return <Loading />
    return (
        <Row  gutter={[32, 32]}>
            {
                cryptoNews?.value?.map((article, i) => (
                    <Grid item sm={12} lg={4} md={6} key={i} style={{ padding: !filtered ? '2rem' : "0rem" }}>
                        <a href={article.url} rel='noreferrer' target='_blank' style={{ gap: '2rem' }}>
                            <Card hoverable className='news-card'  >
                                <div style={{ display: 'flex', padding: '.30rem' }}>
                                    <Typography variant='subtitle1'><strong>{article.name}</strong></Typography>
                                    <div className="news-img">
                                    <img src={article?.image?.thumbnail?.contentUrl || demoImage} alt="thumbnail" style={{ maxHeight: '150px', maxWidth: '150px' }} />

                                    </div>

                                </div>
                                <Typography variant='body2' style={{ color: 'black', padding: '.60rem 0rem' }}>{article.description.length > 100 ? `${article.description.substring(0, 100)} ... ` : article?.description}</Typography>
                                <div className="news-provider-container">
                                    <div className="news-provider">
                                        <Avatar src={article?.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="provider" style={{ width: '20px', height: '20px' }} />
                                        <Typography variant='subtitle2'>{article?.provider[0]?.name}</Typography>
                                    </div>
                                    <Typography style={{color:'#287CF7'}} variant='body2'>{moment(article.datePublished).startOf('ss').fromNow()}</Typography>
                                </div>
                                <div className="button" style={{ textAlign:'right'}}>
                                <Button  style={{ backgroundColor: '#287CF7',width:'50%', color: 'white', borderTopLeftRadius: '50px', marginLeft: 'auto' }}>Read more</Button>

                                </div>
                            </Card>
                        </a>
                    </Grid>
                ))
            }
        </Row>

    )
}

export default News
