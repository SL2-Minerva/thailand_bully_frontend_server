import { useEffect } from 'react'
import { Grid, Card, CardContent, Typography, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { GetContentLists } from 'src/services/api/content/ContentAPI'

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
  const { resultContentList, errorResultContentList } = GetContentLists()
  const router = useRouter()

  useEffect(() => {
    if (errorResultContentList) {
      window.localStorage.removeItem('userData')
      window.localStorage.clear()
      localStorage.clear()
      router.push('/login')
      window.location.reload()
    }
  }, [errorResultContentList])

  console.log("resultCotent", resultContentList);

  return (
    <Grid container spacing={3}>

      {(resultContentList || []).map((contents: any, index: any) => {
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
