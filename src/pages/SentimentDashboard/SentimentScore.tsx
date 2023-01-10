// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid, Typography } from "@mui/material"
import { Table, TableRow, TableHead, TableCell } from "@mui/material"; 

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { StyledTooltip } from '../dashboard/overall';
import { Information } from 'mdi-material-ui';
import { GetSentimentScore } from 'src/services/api/dashboards/sentiment/sentimentDashboard';

const SenitmentScore  = ({params, chartId} : {params: any, chartId: string}) => {

  const { resultSenitmentScore } = GetSentimentScore(params?.campaign, params?.date, params?.endDate, params?.period);

  return (
    <Card>
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title='Sentiment Score'
            titleTypographyProps={{ variant: 'h6' }}
          />
          <StyledTooltip arrow title={chartId}>
              <Information style={{marginTop: '22px', fontSize: '29px'}} />
          </StyledTooltip>
      </span>

      <CardContent>
        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Table size="small">
                    <TableHead>
                        <TableCell variant="head">  
                        </TableCell>
                        <TableCell variant="head" align='center'>  
                          Sentiment Score
                        </TableCell>
                        <TableCell variant="head" align='center'> 
                          
                        </TableCell>
                        <TableCell variant="head" align='center'> 
                          Previous Period
                        </TableCell>
                    </TableHead>
                    {
                      (resultSenitmentScore || []).map((comparison : any, index: number) => {
                        return(
                          <TableRow key={index}>  
                            <TableCell>
                                <Typography variant='h5'>{comparison.keyword_name}</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant='h4' sx={{ color: comparison.hightlightColor === "neutral" ? '#f5cd19' :  comparison.hightlightColor === "positive" ? '#5be12c' : '#ea4228' }}>
                                    {comparison.resultSenitmentScore}
                                </Typography>
                            </TableCell>
                            <TableCell align='left'>
                                {
                                    comparison?.type === 'plus' ?
                                    <ChevronUp fontSize='large' sx={{ color: 'green', marginTop: '10px', marginRight: '10px'}} />
                                    :
                                    <ChevronDown fontSize='large' sx={{ color: 'red', marginTop: '10px',  marginRight: '10px'}} />
                                }
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant='h4'>{comparison?.previous_period}</Typography>
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

export default SenitmentScore
