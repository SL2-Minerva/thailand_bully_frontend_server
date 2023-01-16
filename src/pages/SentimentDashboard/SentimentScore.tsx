// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box, Grid, Pagination, Typography } from "@mui/material"
import { Table, TableRow, TableHead, TableCell } from "@mui/material"; 

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { StyledTooltip } from '../dashboard/overall';
import { Information } from 'mdi-material-ui';
import { GetSentimentScore } from 'src/services/api/dashboards/sentiment/sentimentDashboard';
import { useEffect, useState } from 'react';

const SenitmentScore  = ({params, chartId, highlight} : {params: any, chartId: string, highlight: boolean}) => {
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const { resultSenitmentScore, total } = GetSentimentScore(params?.campaign, params?.date, params?.endDate, params?.period, page);

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value-1);
  };

    useEffect(()=> {
        if (total > 0) {
        setPageCount(Math.ceil(total / 10));
        }
    }, [total]);

    const reportNo = '5.2.015';

    const title = chartId + ", Report Level 2(" + reportNo + ")";

  return (
    <Card sx={{ minHeight: 455 }}>
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title='Sentiment Score'
            titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
          />
          <StyledTooltip arrow title={title || ""}>
              <Information style={{marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de'}} />
          </StyledTooltip>
      </span>

      <CardContent>
        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Table size="small">
                    <TableHead>
                      <TableRow>
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
                      </TableRow>
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
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center'}}> 
                  {
                      total > 0 ? 
                      <Pagination count={pageCount} page={page+1} onChange={handleChangePagination} variant='outlined' color='primary'/>
                      : ""
                  }
                </Box>
            </Grid>  
        </Grid>
        
      </CardContent>
    </Card>
  )
}

export default SenitmentScore
