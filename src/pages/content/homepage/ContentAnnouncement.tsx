import { Card, CardContent, Grid, Typography } from '@mui/material'
import 'react-quill/dist/quill.bubble.css'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false, loading: () => <p>Loading ...</p> })

interface Props {
  resultContentList: any
}

const ContentAnnouncement = (props: Props) => {
  const { resultContentList } = props;

  return (
    <Grid container spacing={3}>
      {(resultContentList || []).map((contents: any, index: any) => {
        return (
          <Grid item xs={12} key={index}>
            <Card
              sx={{
                backgroundImage: `url(${'https://cornea-analysis.com/storage/' + contents.picture})`,
                backgroundPosition: 'center',
                backgroundSize: '100% 100%'

                // backgroundSize: 'cover',
              }}
            >
              <CardContent>
                <Grid
                  container
                  minHeight={800}
                  style={{
                    display: 'flex',
                    width: '70%',
                    paddingLeft: '100px'
                  }}
                >
                  <Grid item xs={12} md={8} spacing={2} mt={40}>
                    <h1>
                      <ReactQuill value={contents.title} readOnly={true} theme='bubble' />
                    </h1>
                    <Grid>
                      <ReactQuill value={contents.content_text} readOnly={true} theme='bubble' />
                    </Grid>
                    <Typography>
                      <ReactQuill value={'Date:' + contents.date} readOnly={true} theme='bubble' />
                    </Typography>
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

export default ContentAnnouncement
