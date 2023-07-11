import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import 'react-quill/dist/quill.bubble.css'
import dynamic from 'next/dynamic'
import { styled } from '@mui/material/styles'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false, loading: () => <p>Loading ...</p> })

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
                <Grid container>
                  <Grid item md={4} xs={12} mb={2}>
                    {contents?.picture ? (
                      <Box sx={{ height: '250px', marginLeft: '1rem' }}>
                        <Img
                          style={{ width: 246, height: 246 }}
                          alt='Image'
                          src={'https://cornea-analysis.com/storage/' + contents.picture}
                        />
                      </Box>
                    ) : (
                      <Box sx={{ height: '250px', marginLeft: '1rem' }}>
                        <Img style={{ width: 246, height: 246 }} alt='Image' src={'/images/NoImage.png'} />
                      </Box>
                    )}
                  </Grid>

                  <Grid item xs={12} md={8} spacing={2} mt={5}>
                    <Typography>
                      <ReactQuill value={contents.content_text} readOnly={true} theme='bubble' />
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
