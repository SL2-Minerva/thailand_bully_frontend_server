import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import 'react-quill/dist/quill.bubble.css'
import { styled } from '@mui/material/styles'

// import dynamic from 'next/dynamic'

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false, loading: () => <p>Loading ...</p> })

interface Props {
  resultContentList: any
}

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

const Contents = (props: Props) => {
  const { resultContentList } = props

  return (
    <Grid container spacing={3}>
      {(resultContentList || []).map((contents: any, index: any) => {
        return (
          <Grid item xs={12} key={index}>
            <Card>
              <h2 style={{ marginLeft: '2rem', marginBottom: '-2rem' }}>
                <div dangerouslySetInnerHTML={{ __html: contents.title }} />
              </h2>
              <CardContent>
                <Grid container minHeight={450}>
                  <Grid item md={5.5} xs={12} mb={2}>
                    {contents?.picture ? (
                      <Box sx={{ minHeight: '250px', marginLeft: '1rem' }}>
                        <Img
                          style={{ width: "100%", height: 'auto' }}
                          alt='Image'
                          src={'https://cornea-analysis.com/storage/' + contents.picture}
                        />
                      </Box>
                    ) : (
                      <Box sx={{ minHeight: '250px', marginLeft: '1rem' }}>
                        <Img style={{ width: 400, height: 400 }} alt='Image' src={'/images/NoImage.png'} />
                      </Box>
                    )}
                  </Grid>

                  <Grid item xs={12} md={6} spacing={2} mt={5} ml={3}>
                    <Typography>
                      {/* <ReactQuill value={contents.content_text} readOnly={true} theme='bubble' /> */}
                      <div dangerouslySetInnerHTML={{ __html: contents.content_text || '-' }} />
                      
                    </Typography>
                    <Typography ml={4}>Date : {contents.date}</Typography>
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

export default Contents
