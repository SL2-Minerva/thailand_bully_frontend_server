// import { Card, CardContent, Grid, Typography } from '@mui/material'
// import 'react-quill/dist/quill.bubble.css'
// import dynamic from 'next/dynamic'
// import { useTranslation } from 'react-i18next'


// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false, loading: () => <p>Loading ...</p> })

// interface Props {
//   resultContentList: any
// }

// const ContentAnnouncement = (props: Props) => {
//   const { resultContentList } = props
//   const {t} = useTranslation();


//   return (
//     <Grid container spacing={3}>
//       {(resultContentList || []).map((contents: any, index: any) => {
//         return (
//           <Grid item xs={12} key={index}>
//             <Card
//               sx={{
//                 backgroundImage: `url(${'https://cornea-ai.com/images/' + contents.picture})`,
//                 backgroundPosition: 'center',
//                 backgroundSize: 'contain',
//                 backgroundPositionX: 'center',
//                 backgroundPositionY: 'center',
//                 backgroundRepeat: 'no-repeat'

//                 // backgroundSize: 'cover',
//               }}
//             >
//               <CardContent>
//                 <Grid
//                   container

//                   minHeight={800}
//                   style={{
//                     display: 'flex',
//                     width: '70%',
//                     paddingLeft: '100px'
//                   }}
//                 >
//                   <Grid item xs={12} md={8} spacing={2} mt={40}>
//                     <h1>
//                       <ReactQuill value={contents.title} readOnly={true} theme='bubble' />
//                     </h1>
//                     <Grid>
//                       {/* <ReactQuill value={contents.content_text} readOnly={true} theme='bubble' /> */}
//                       <div dangerouslySetInnerHTML={{ __html: contents.content_text || '-' }} />

//                     </Grid>
//                     <Typography>
//                       {/* <ReactQuill value={'Date:' + contents.date} readOnly={true} theme='bubble' /> */}
//                       <div dangerouslySetInnerHTML={{ __html: t('Date') + ": " + contents.date || '-' }} />

//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>
//         )
//       })}
//     </Grid>
//   )
// }

// export default ContentAnnouncement

// แสดง Logo อย่างเดียว
import { Card, Grid } from '@mui/material'
import 'react-quill/dist/quill.bubble.css'

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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

                // height: '800px',
                overflow: 'hidden',
              }}
            > 
              <img
                src={'https://cornea-ai.com/images/banners/' + contents.picture}
                alt="content picture"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain', 
                }}
              />
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ContentAnnouncement



// import { Card, CardContent, Grid, Typography } from '@mui/material'
// import 'react-quill/dist/quill.bubble.css'

// // import dynamic from 'next/dynamic'
// import { useTranslation } from 'react-i18next'


// // const ReactQuill = dynamic(() => import('react-quill'), { ssr: false, loading: () => <p>Loading ...</p> })

// interface Props {
//   resultContentList: any
// }

// const ContentAnnouncement = (props: Props) => {
//   const { resultContentList } = props
//   const {t} = useTranslation();


//   return (
//     <Grid container spacing={3}>
//       {(resultContentList || []).map((contents: any, index: any) => {
//         return (
//           <Grid item xs={12} key={index}>
//             <Card
//               sx={{
//                 backgroundImage: `url(${'https://cornea-ai.com/images/' + contents.picture})`,
//                 backgroundPosition: 'center',
//                 backgroundSize: 'contain',
//                 backgroundPositionX: 'center',
//                 backgroundPositionY: 'center',
//                 backgroundRepeat: 'no-repeat'

//                 // backgroundSize: 'cover',
//               }}
//             >
//               <CardContent>
//                 <Grid
//                   container

//                   // minHeight={800}
//                   style={{
//                     display: 'flex',
//                     width: '70%',
//                     paddingLeft: '10px'
//                   }}
//                 >
//                   <Grid item xs={12} md={8} spacing={2} >
//                     <Typography>
//                       {/* <ReactQuill value={'Date:' + contents.date} readOnly={true} theme='bubble' /> */}
//                       <div dangerouslySetInnerHTML={{ __html: t('Date') + ": " + contents.date || '-' }} />

//                     </Typography>
//                     {/* <h2>
//                       <ReactQuill value={contents.title} readOnly={true} theme='bubble' />
//                     </h2> */}
//                       <div dangerouslySetInnerHTML={{ __html: t('Header') + ": " + contents.title }} />     
                
//                     <Grid>
//                       {/* <ReactQuill value={contents.content_text} readOnly={true} theme='bubble' /> */}
//                       <div dangerouslySetInnerHTML={{ __html: t('Version') + ": " + contents.content_text || '-' }} /> 
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>
//         )
//       })}
//     </Grid>
//   )
// }

// export default ContentAnnouncement
