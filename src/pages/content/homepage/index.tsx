import { Grid, Card, CardContent, Typography, CardHeader } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ContentLists } from 'src/services/api/content/ContentAPI'

const Img = styled('img')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(10)
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.down('sm')]: {
      width: 250
    }
  }))

const ContentPage = () => {

    const {resultContents} = ContentLists();

    console.log("result Contents", resultContents);

    return(
        <Grid container spacing={6}>
            <Grid item xs={12} sm={12}>
                <Card>
                        <CardHeader title="Content 1"/> 
                </Card>
            </Grid>
            {
                    (resultContents || []).map((contents, index) => {
                        return(
                            <>
                            {
                                contents.content_id == "1" ? 
                                <>
                                    <Grid item md={6} xs={12} key={index}>
                                        <Card>
                                            <h2 style={{ marginLeft: '2rem', marginBottom: '-2.6rem' }}> 
                                                <div dangerouslySetInnerHTML={ {__html: contents.title} } /> 
                                            </h2>
                                            <CardContent>
                                                <Grid>
                                                    {
                                                        contents?.picture ?
                                                            <span style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <Img width={300} alt='Image' src={"http://cornea-analysis.com/storage/" + contents.picture} />
                                                            </span>
                                                        :   
                                                            <></>
                                                    }
                                                    <Typography variant='h5' ml='1rem'>
                                                        <div dangerouslySetInnerHTML={ {__html: contents.content_text} } /> 
                                                    </Typography>
                                                </Grid>
                                                
                                                <Grid container spacing={2} mt={2} ml={3}>
                                                    Date : {contents.date}
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </>
                                :
                                <></>
                            }
                            </>
                        )
                    })
                    
                }
            
            <Grid item xs={12} sm={12}>
                <Card>
                        <CardHeader title="Content 2"/> 
                </Card>
            </Grid>

                {
                    (resultContents || []).map((contents, index) => {
                        return(
                            <>
                            {
                                contents.content_id == "2" ? 
                                <>
                                    <Grid item md={6} xs={12} key={index}>
                                        <Card>
                                            <h2 style={{ marginLeft: '2rem', marginBottom: '-2.6rem' }}> 
                                                <div dangerouslySetInnerHTML={ {__html: contents.title} } /> 
                                            </h2>
                                            <CardContent>
                                                <Grid>
                                                    {
                                                        contents?.picture ?
                                                            <span style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <Img width={300} alt='Image' src={"http://cornea-analysis.com/storage/" + contents.picture} />
                                                            </span>
                                                        :   
                                                            <></>
                                                    }
                                                    <Typography variant='h5' ml='1rem'>
                                                        <div dangerouslySetInnerHTML={ {__html: contents.content_text} } /> 
                                                    </Typography>
                                                </Grid>
                                                
                                                <Grid container spacing={2} mt={2} ml={3}>
                                                    Date : {contents.date}
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </>
                                :
                                <> </>
                            }
                            </>
                        )
                    })    
                }      

            <Grid item xs={12} sm={12}>
                <Card>
                        <CardHeader title="Content 3"/> 
                </Card>
            </Grid>

                {
                    (resultContents || []).map((contents, index) => {
                        return(
                            <>
                            {
                                contents.content_id == "3" ? 
                                <>
                                    <Grid item md={6} xs={12} key={index}>
                                        <Card>
                                            <h2 style={{ marginLeft: '2rem', marginBottom: '-2.6rem' }}> 
                                                <div dangerouslySetInnerHTML={ {__html: contents.title} } /> 
                                            </h2>
                                            <CardContent>
                                                <Grid>
                                                    {
                                                        contents?.picture ?
                                                            <span style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <Img width={300} alt='Image' src={"http://cornea-analysis.com/storage/" + contents.picture} />
                                                            </span>
                                                        :   
                                                            <></>
                                                    }
                                                    <Typography variant='h5' ml='1rem'>
                                                        <div dangerouslySetInnerHTML={ {__html: contents.content_text} } /> 
                                                    </Typography>
                                                </Grid>
                                                
                                                <Grid container spacing={2} mt={2} ml={3}>
                                                    Date : {contents.date}
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </>
                                :
                                <> </>
                            }
                            </>
                        )
                    })    
                }       
                
        </Grid>
    )
}

export default ContentPage;