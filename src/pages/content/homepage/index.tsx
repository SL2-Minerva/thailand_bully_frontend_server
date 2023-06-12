import { useEffect } from 'react'
import { Grid, Card, CardContent, Typography, CardHeader } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { ContentOneLists, ContentThreeLists, ContentTwoLists } from 'src/services/api/content/ContentAPI'

// import TabPanel from '@mui/lab/TabPanel'
// import TabContext from '@mui/lab/TabContext'
// import TabList from '@mui/lab/TabList'
// import { Tab, TabName } from 'src/pages/pages/account-settings'

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

  // const [value, setValue] = useState<string>('1')

  // const handleChange = (event: any, newValue: string) => {
  //   setValue(newValue)
  // }

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
    <Grid container spacing={6}>
      {/* <Grid item xs={12}>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label='contents tabs'
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            <Tab
              value='1'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TabName>Content 1</TabName>
                </Box>
              }
            />
            <Tab
              value='2'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TabName>Content 2</TabName>
                </Box>
              }
            />

            <Tab
              value='3'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TabName>Content 3</TabName>
                </Box>
              }
            />
          </TabList>

          <TabPanel sx={{ p: 0 }} value='1'>test</TabPanel>
          <TabPanel sx={{ p: 0 }} value='2'>
            content 2
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='2'>
            content 3
          </TabPanel>
        </TabContext>
      </Grid> */}

      {(resultContentOne || [])?.map((contents: any, index: any) => {
        return (
          <Grid item md={6} xs={12} key={index} mt={-5}>
            <Card>
              <h2 style={{ marginLeft: '2rem', marginBottom: '-2.6rem' }}>
                <div dangerouslySetInnerHTML={{ __html: contents.title }} />
              </h2>
              <CardContent>
                <Grid>
                  {contents?.picture ? (
                    <span style={{ display: 'flex', justifyContent: 'center' }}>
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
          </Grid>
        )
      })}

      <Grid item xs={12} sm={12} mb={2}>
        <Card>
          <CardHeader title='Content 2' />
        </Card>
      </Grid>

      {(resultContentTwo || []).map((contents: any, index: any) => {
        return (
          <Grid item md={6} xs={12} key={index} mt={-5}>
            <Card>
              <h2 style={{ marginLeft: '2rem', marginBottom: '-2.6rem' }}>
                <div dangerouslySetInnerHTML={{ __html: contents.title }} />
              </h2>
              <CardContent>
                <Grid>
                  {contents?.picture ? (
                    <span style={{ display: 'flex', justifyContent: 'center' }}>
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
          </Grid>
        )
      })}

      <Grid item xs={12} sm={12} mb={2}>
        <Card>
          <CardHeader title='Content 3' />
        </Card>
      </Grid>

      {(resultContentThree || []).map((contents: any, index: any) => {
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
