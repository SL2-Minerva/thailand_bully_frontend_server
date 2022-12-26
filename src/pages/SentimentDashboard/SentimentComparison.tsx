// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid, Typography } from "@mui/material"
import { Table, TableRow, TableHead, TableCell } from "@mui/material"; 

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const SentimentComparison  = ({sentimentComparison} : {sentimentComparison: any}) => {

  return (
    <Card>
      <CardHeader
        title='Engagement Type Comparison'
        titleTypographyProps={{ variant: 'h6' }}
        subheader="Period over Period"
      />

      <CardContent>
        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Table size="small">
                    <TableHead>
                        <TableCell variant="head">  
                        </TableCell>
                        <TableCell variant="head" align='center'>  
                          Total
                        </TableCell>
                        <TableCell variant="head" align='center'>  
                          Comparison with previous
                        </TableCell>
                        <TableCell variant="head" align='center'> 
                          Positive
                        </TableCell>
                        <TableCell variant="head" align='center'> 
                          Neutral
                        </TableCell>
                        <TableCell variant="head" align='center'>
                          Negative
                        </TableCell>
                    </TableHead>
                    {
                      (sentimentComparison || []).map((comparison : any, index: number) => {
                        return(
                          <TableRow key={index}>
                            <TableCell>{comparison.keyword_name}</TableCell>
                            <TableCell align='center'>
                                <Typography variant='h5'> 
                                            {comparison.total}
                                </Typography>
                            </TableCell>
                            <TableCell align='left'>
                                <span style={{ display: 'flex', justifyContent : 'center' }}> 
                                    {
                                        comparison.comparison?.type === 'plus' ?
                                        <ChevronUp fontSize='large' sx={{ color: 'green', marginTop: '10px', marginRight: '10px'}} />
                                        :
                                        <ChevronDown fontSize='large' sx={{ color: 'red', marginTop: '10px',  marginRight: '10px'}} />
                                    }
                                    <Typography variant='h5'> 
                                        {comparison.comparison?.value}
                                        <Typography variant='h6'>{comparison.comparison?.percentage} %</Typography>
                                    </Typography>
                                </span>
                            </TableCell>
                            <TableCell align='left'>
                                <span style={{ display: 'flex', justifyContent : 'center' }}> 
                                    {
                                        comparison.share?.type === 'plus' ?
                                        <ChevronUp fontSize='large' sx={{ color: 'green', marginTop: '10px', marginRight: '10px'}} />
                                        :
                                        <ChevronDown fontSize='large' sx={{ color: 'red', marginTop: '10px',  marginRight: '10px'}} />
                                    }
                                    <Typography variant='h5'> 
                                        {comparison.share?.value}
                                        <Typography variant='h6'>{comparison.share?.percentage} %</Typography>
                                    </Typography>
                                </span>
                            </TableCell>
                            <TableCell align='left'>
                                <span style={{ display: 'flex', justifyContent : 'center' }}> 
                                    {
                                        comparison.comment?.type === 'plus' ?
                                        <ChevronUp fontSize='large' sx={{ color: 'green', marginTop: '10px', marginRight: '10px'}} />
                                        :
                                        <ChevronDown fontSize='large' sx={{ color: 'red', marginTop: '10px',  marginRight: '10px'}} />
                                    }
                                    <Typography variant='h5'> 
                                        {comparison.comment?.value}
                                        <Typography variant='h6'>{comparison.comment?.percentage} %</Typography>
                                    </Typography>
                                </span>
                            </TableCell>
                            <TableCell align='left'>
                                <span style={{ display: 'flex', justifyContent : 'center' }}> 
                                    {
                                        comparison.reaction?.type === 'plus' ?
                                        <ChevronUp fontSize='large' sx={{ color: 'green', marginTop: '10px', marginRight: '10px'}} />
                                        :
                                        <ChevronDown fontSize='large' sx={{ color: 'red', marginTop: '10px',  marginRight: '10px'}} />
                                    }
                                    <Typography variant='h5'> 
                                        {comparison.reaction?.value}
                                        <Typography variant='h6'>{comparison.reaction?.percentage} %</Typography>
                                    </Typography>
                                </span>
                            </TableCell>

                          </TableRow>
                        )
                      })
                    }
                    
                </Table>
            </Grid>  
        </Grid>
        
      </CardContent>
    </Card>
  )
}

export default SentimentComparison
