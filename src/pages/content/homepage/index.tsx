import { useEffect } from 'react'
import { Grid, Card, CardContent, Typography, CardHeader, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { ContentOneLists, ContentThreeLists, ContentTwoLists } from 'src/services/api/content/ContentAPI'

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
  const { resultContentOne, errorContentOne } = ContentOneLists()
  const { resultContentTwo, errorContentTwo } = ContentTwoLists()
  const { resultContentThree, errorContentThree } = ContentThreeLists()
  const router = useRouter()

  useEffect(() => {
    if (errorContentOne || errorContentThree || errorContentTwo) {
      window.localStorage.removeItem('userData')
      window.localStorage.clear()
      localStorage.clear()
      router.push('/login')
      window.location.reload()
    }
  }, [errorContentOne, errorContentTwo, errorContentThree])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} mb={2}>
        <Card sx={{ backgroundColor: '#f2f2f2' }}>
          <CardHeader title='Content 1' />
        </Card>
      </Grid>

      {(resultContentOne || [])?.map((contents: any, index: any) => {
        return (
          <Grid item xs={12} key={index}>
            <Card>
              <h2 style={{ marginLeft: '2rem', marginBottom: '-2.6rem' }}>
                <div dangerouslySetInnerHTML={{ __html: contents.title }} />
              </h2>
              <CardContent>
                <Grid container>
                  <Grid item md={4} xs={12}>
                    {contents?.picture ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', height: '200px' }}>
                        <Img width={200} alt='Image' src={'https://cornea-analysis.com/storage/' + contents.picture} />
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', justifyContent: 'center', height: '200px' }}>
                        <Img width={200} alt='Image' src={'/images/NoImage.png'} />
                      </Box>
                    )}
                  </Grid>

                  <Grid item xs={12} md={8} spacing={2} mt={5}>
                    <Typography variant='h5'>
                      <div dangerouslySetInnerHTML={{ __html: contents.content_text }} />
                    </Typography>
                    Date : {contents.date}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )
      })}

      <Grid item xs={12} sm={12} mb={2} mt={2}>
        <Card sx={{ backgroundColor: '#f2f2f2' }}>
          <CardHeader title='Content 2' />
        </Card>
      </Grid>

      {(resultContentTwo || []).map((contents: any, index: any) => {
        return (
          <Grid item xs={12} key={index}>
            <Card>
              <h2 style={{ marginLeft: '2rem', marginBottom: '-2.6rem' }}>
                <div dangerouslySetInnerHTML={{ __html: contents.title }} />
              </h2>
              <CardContent>
                <Grid container>
                  <Grid item md={4} xs={12}>
                    {contents?.picture ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', height: '200px' }}>
                        <Img width={200} alt='Image' src={'https://cornea-analysis.com/storage/' + contents.picture} />
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', justifyContent: 'center', height: '200px' }}>
                        <Img width={200} alt='Image' src={'/images/NoImage.png'} />
                      </Box>
                    )}
                  </Grid>

                  <Grid item xs={12} md={8} spacing={2} mt={5}>
                    <Typography variant='h5'>
                      <div dangerouslySetInnerHTML={{ __html: contents.content_text }} />
                    </Typography>
                    Date : {contents.date}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )
      })}

      <Grid item xs={12} sm={12} mb={2} mt={2}>
        <Card sx={{ backgroundColor: '#f2f2f2' }}>
          <CardHeader title='Content 3' />
        </Card>
      </Grid>

      {(resultContentThree || []).map((contents: any, index: any) => {
        return (
          <Grid item xs={12} key={index}>
            <Card>
              <h2 style={{ marginLeft: '2rem', marginBottom: '-2.6rem' }}>
                <div dangerouslySetInnerHTML={{ __html: contents.title }} />
              </h2>
              <CardContent>
                <Grid container>
                  <Grid item md={4} xs={12}>
                    {contents?.picture ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', height: '200px' }}>
                        <Img width={200} alt='Image' src={'https://cornea-analysis.com/storage/' + contents.picture} />
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', justifyContent: 'center', height: '200px' }}>
                        <Img width={200} alt='Image' src={'/images/NoImage.png'} />
                      </Box>
                    )}
                  </Grid>

                  <Grid item xs={12} md={8} spacing={2} mt={5}>
                    <Typography variant='h5'>
                      <div dangerouslySetInnerHTML={{ __html: contents.content_text }} />
                    </Typography>
                    Date : {contents.date}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ContentPage
