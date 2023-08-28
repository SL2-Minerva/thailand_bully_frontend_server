import { Card, CardContent, Grid, Typography } from '@mui/material'
import 'react-quill/dist/quill.bubble.css'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false, loading: () => <p>Loading ...</p> })

interface Props {
  resultContentList: any
}

const ContentAnnouncement = (props: Props) => {
  const { resultContentList } = props

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
              <h2 style={{ marginLeft: '2rem', marginBottom: '-2rem' }}>
                <div dangerouslySetInnerHTML={{ __html: contents.title }} />
              </h2>
              <CardContent>
                <Grid container minHeight={1100}>
                  <Grid item xs={12} md={8} spacing={2} mt={5}>
                    <Typography
                      sx={{
                        lineHeight: '200px',
                        textAlign: 'center'
                      }}
                    >
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

export default ContentAnnouncement
