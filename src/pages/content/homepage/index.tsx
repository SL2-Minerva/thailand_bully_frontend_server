import { Grid, Card, CardContent, Typography, CardHeader } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
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
  const { resultContents, errorCampaiganList } = ContentLists()
  const router = useRouter()

  useEffect(() => {
    if (errorCampaiganList) {
      window.localStorage.removeItem('userData')
      window.localStorage.clear()
      localStorage.clear()
      router.push('/login')
    }
  }, [errorCampaiganList])

  console.log('result content list : ', resultContents)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={12}>
        <Card>
          <CardHeader title='Content 1' />
        </Card>
      </Grid>
      {(resultContents || [])?.map((contents: any, index: any) => {
        return (
          <Grid item md={6} xs={12} key={index} mt={-5}>
            {contents.content_id == '1' ? (
              <Card>
                <h2 style={{ marginLeft: '2rem', marginBottom: '-2.6rem' }}>
                  <div dangerouslySetInnerHTML={{ __html: contents.title }} />
                </h2>
                <CardContent>
                  <Grid>
                    {contents?.picture ? (
                      <span style={{ display: 'flex', justifyContent: 'center' }}>
                        {/* <Img width={300} alt='Image' src={"http://202.44.231.31/storage/" + contents.picture} /> */}

                        <Img width={300} alt='Image' src={'https://cornea-analysis.com/storage/' + contents.picture} />
                      </span>
                    ) : (
                      <></>
                    )}
                    <Typography variant='h5' ml='1rem'>
                      <div dangerouslySetInnerHTML={{ __html: contents.content_text }} />
                    </Typography>
                  </Grid>

                  <Grid container spacing={2} mt={2} ml={3}>
                    Date : {contents.date}
                  </Grid>
                </CardContent>
              </Card>
            ) : (
              <></>
            )}
          </Grid>
        )
      })}

      <Grid item xs={12} sm={12} mb={2}>
        <Card>
          <CardHeader title='Content 2' />
        </Card>
      </Grid>

      {(resultContents || []).map((contents: any, index: any) => {
        return (
          <Grid item md={6} xs={12} key={index} mt={-5}>
            {contents.content_id == '2' ? (
              <Card>
                <h2 style={{ marginLeft: '2rem', marginBottom: '-2.6rem' }}>
                  <div dangerouslySetInnerHTML={{ __html: contents.title }} />
                </h2>
                <CardContent>
                  <Grid>
                    {contents?.picture ? (
                      <span style={{ display: 'flex', justifyContent: 'center' }}>
                        {/* <Img width={300} alt='Image' src={"http://202.44.231.31/storage/" + contents.picture} /> */}
                        <Img width={300} alt='Image' src={'https://cornea-analysis.com/storage/' + contents.picture} />
                      </span>
                    ) : (
                      <></>
                    )}
                    <Typography variant='h5' ml='1rem'>
                      <div dangerouslySetInnerHTML={{ __html: contents.content_text }} />
                    </Typography>
                  </Grid>

                  <Grid container spacing={2} mt={2} ml={3}>
                    Date : {contents.date}
                  </Grid>
                </CardContent>
              </Card>
            ) : (
              <> </>
            )}
          </Grid>
        )
      })}

      <Grid item xs={12} sm={12} mb={2}>
        <Card>
          <CardHeader title='Content 3' />
        </Card>
      </Grid>

      {(resultContents || []).map((contents: any, index: any) => {
        return (
          <Grid item md={6} xs={12} key={index}>
            {contents.content_id == '3' ? (
              <Card>
                <h2 style={{ marginLeft: '2rem', marginBottom: '-2.6rem' }}>
                  <div dangerouslySetInnerHTML={{ __html: contents.title }} />
                </h2>
                <CardContent>
                  <Grid>
                    {contents?.picture ? (
                      <span style={{ display: 'flex', justifyContent: 'center' }}>
                        {/* <Img width={300} alt='Image' src={"http://202.44.231.31/storage/" + contents.picture} /> */}
                        <Img width={300} alt='Image' src={'https://cornea-analysis.com/storage/' + contents.picture} />
                      </span>
                    ) : (
                      <></>
                    )}
                    <Typography variant='h5' ml='1rem'>
                      <div dangerouslySetInnerHTML={{ __html: contents.content_text }} />
                    </Typography>
                  </Grid>

                  <Grid container spacing={2} mt={2} ml={3}>
                    Date : {contents.date}
                  </Grid>
                </CardContent>
              </Card>
            ) : (
              <> </>
            )}
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ContentPage
