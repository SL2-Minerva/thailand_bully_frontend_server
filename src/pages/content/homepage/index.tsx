import { Grid, Card, CardHeader, CardContent, Typography, TypographyProps } from '@mui/material'
import { styled } from '@mui/material/styles'

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

const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(4)
    }
}))

const ContentPage = () => {
    return(
        <Grid container spacing={6}>
            <Grid item md={6} xs={12}>
                <Card>
                    <CardHeader title='Announcement' />
                    <CardContent>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Img width={300} alt='Image' src='/images/misc/upload.png' />
                        </div>
                        <Grid container spacing={2} mt={2} ml={2}>
                            Date : 02/12/2022
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item md={6} xs={12}>
                <Card>
                    <CardHeader title='News' />
                    <CardContent>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Img width={300} alt='Image' src='/images/misc/upload.png' />
                        </div>
                        <Grid container spacing={2} mt={2} ml={2}>
                            Date : 08/12/2022
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item md={6} xs={12}>
                <Card>
                    <CardContent>
                        <HeadingTypography variant='h5'>Topic 1</HeadingTypography>
                        <Typography color='textSecondary' variant='h5'>
                          Aaaaaaaa aaaaaaa
                        </Typography>
                        <Grid container spacing={2} mt={3} ml={1}>
                            Date : 08/12/2022
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item md={6} xs={12}>
                <Card>
                    <CardContent>
                        <HeadingTypography variant='h5'>Topic 2</HeadingTypography>
                        <Typography color='textSecondary' variant='h5'>
                            Bbbbbbbbb bbbbbb
                        </Typography>
                        <Grid container spacing={2} mt={3} ml={1}>
                            Date : 08/12/2022
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default ContentPage;