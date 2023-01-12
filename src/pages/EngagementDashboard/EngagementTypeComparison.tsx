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
import { GetEngagementComparison } from 'src/services/api/dashboards/engagement/EngagementApi';

const EngagementTypeComparison  = ({params, chartId, highlight} : {params: any, chartId: string, highlight: boolean}) => {
  const { resultEngagementComparison } = GetEngagementComparison(params?.campaign, params?.date, params?.endDate, params?.period);

  return (
    <Card>
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title='Engagement Type Comparison'
            titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
            subheader="Period over Period"
          />
          <StyledTooltip arrow title={chartId}>
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
                            Total
                          </TableCell>
                          <TableCell variant="head" align='center'> 
                            Share
                          </TableCell>
                          <TableCell variant="head" align='center'> 
                            Comment
                          </TableCell>
                          <TableCell variant="head" align='center'>
                            Reaction
                          </TableCell>
                      </TableRow>
                        
                    </TableHead>
                    {
                      (resultEngagementComparison || []).map((comparison : any, index: number) => {
                        return(
                          <TableRow key={index}>
                            <TableCell>{comparison.keyword_name}</TableCell>
                            <TableCell align='left'>
                                <span style={{ display: 'flex', justifyContent : 'center' }}> 
                                    {
                                        comparison.total?.type === 'plus' ?
                                        <ChevronUp fontSize='large' sx={{ color: 'green', marginTop: '10px', marginRight: '10px'}} />
                                        :
                                        <ChevronDown fontSize='large' sx={{ color: 'red', marginTop: '10px',  marginRight: '10px'}} />
                                    }
                                    <Typography variant='h5'> 
                                        {comparison.total?.value}
                                        <Typography variant='h6'>{comparison.total?.percentage} %</Typography>
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

export default EngagementTypeComparison
