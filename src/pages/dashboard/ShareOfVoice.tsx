// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid } from "@mui/material"
import { Table, TableRow, TableHead, TableCell } from "@mui/material"; 

// ** Third Party Imports
import { Bar } from 'react-chartjs-2'
import { StyledTooltip } from './overall';
import { Information } from 'mdi-material-ui';
import { GetShareOfVoice, GetShareOfVoiceChart } from 'src/services/api/dashboards/overall/overallDashboardApi';

const ChartLabels = (data: any) => {
  if (!data) return [];
  const keywordData = data;

  const labels : any[] = [];

  for (let i = 0; i<keywordData?.length ; i ++) {
    labels.push(keywordData[i].keyword_name)
  }
  
  return labels;
}

const ChartData = (data: any ) => {
  if (!data) return [];

  const chartDatas : any[] = [];
  for (let i = 0; i<data?.length ; i ++) {
    chartDatas.push(data[i]?.number_of_massage)
  }
  
  return chartDatas;
}

const ShareOfVoice  = ({params, chartId} : {params: any, chartId : string}) => {
  const { resultShareOfVoice } = GetShareOfVoice(params?.campaign, params?.platformId, params?.date, params?.endDate, params?.period, params?.previousDate, params?.previousEndDate);
  const { resultShareOfVoiceChart } = GetShareOfVoiceChart(params?.campaign, params?.platformId, params?.date, params?.endDate, params?.period, params?.previousDate, params?.previousEndDate);

  const labels = resultShareOfVoiceChart ? ChartLabels(resultShareOfVoiceChart) : [];
  const data = {
  labels: labels,
  datasets: [{
      axis: 'y',
      label: 'Number of Messages',
      data: ChartData(resultShareOfVoiceChart),
      fill: false,
      backgroundColor: ['rgb(54, 162, 235)'],
      borderColor: [
      'rgb(54, 162, 235)'
      ],
      borderWidth: 1
  }]
  };  

  const searchChannel = (data : any, channelName: string) => {
    if(!data ) return null;

    const result = data.find(({channel} : {channel: any}) => { return channel === channelName});

    return result;
  }


  return (
    <Card>
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title='Share of Voice'
            titleTypographyProps={{ variant: 'h6' }}
          />
          <StyledTooltip arrow title={chartId}>
              <Information style={{marginTop: '22px', fontSize: '29px'}} />
          </StyledTooltip>
      </span>
      <CardContent>
        <Grid container spacing={3}>
            <Grid item xs={5}>
                <Bar data={data} options={{ indexAxis: 'y' }} height={245}/>
            </Grid>
            <Grid item xs={7} >
                <Table size="small">
                    <TableHead>
                        <TableCell variant="head">  
                          <img
                            width={34}
                            height={34}
                            src={`/images/logos/facebook-round.png`}
                          />
                        </TableCell>
                        <TableCell variant="head"> 
                          <img
                              width={34}
                              height={34}
                              src={`/images/logos/twitter.png`}
                            />
                        </TableCell>
                        <TableCell variant="head"> 
                          <img
                              width={34}
                              height={34}
                              src={`/images/logos/youtube-text.png`}
                            />
                        </TableCell>
                        <TableCell variant="head">
                          <img
                              width={34}
                              height={34}
                              src={`/images/logos/instagram.png`}
                            />
                        </TableCell>
                        <TableCell variant="head">
                          <img
                              width={34}
                              height={34}
                              src={`/images/logos/pantip.png`}
                            />
                        </TableCell>
                    </TableHead>
                    {
                      (resultShareOfVoice || []).map((shareVoice : any, index: number) => {
                        return(
                          <TableRow key={index}>
                              <TableCell>
                                  { searchChannel(shareVoice?.value, "facebook") ? 
                                      <span style={{ border : searchChannel(shareVoice?.value, "facebook")?.highlight ? "1px solid red" : "", padding: '4px' }}>
                                        { searchChannel(shareVoice?.value, "facebook")?.percentage  + "%"}
                                      </span>
                                    : "0%"}
                              </TableCell>
                              <TableCell>
                                  { searchChannel(shareVoice?.value, "twitter") ?
                                    <span style={{ border : searchChannel(shareVoice?.value, "twitter")?.highlight ? "1px solid red" : "", padding: '4px' }}>
                                      { searchChannel(shareVoice?.value, "twitter")?.percentage  + "%"}
                                    </span>

                                   : "0%"}
                              </TableCell>
                              <TableCell>
                                  { searchChannel(shareVoice?.value, "youtube") ? 
                                    <span style={{ border : searchChannel(shareVoice?.value, "youtube")?.highlight ? "1px solid red" : "", padding: '4px' }}>
                                      { searchChannel(shareVoice?.value, "youtube")?.percentage  + "%"}
                                    </span>
                                  : "0%"}
                              </TableCell>
                              <TableCell>
                                  { searchChannel(shareVoice?.value, "instagram") ? 
                                    <span style={{ border : searchChannel(shareVoice?.value, "instagram")?.highlight ? "1px solid red" : "", padding: '4px' }}>
                                      { searchChannel(shareVoice?.value, "instagram")?.percentage  + "%"}
                                    </span>
                                  : "0%"}
                              </TableCell>
                              <TableCell>
                                  { searchChannel(shareVoice?.value, "pantip") ? 
                                    <span style={{ border : searchChannel(shareVoice?.value, "pantip")?.highlight ? "1px solid red" : "", padding: '4px' }}>
                                      { searchChannel(shareVoice?.value, "pantip")?.percentage  + "%"}
                                    </span> : "0%"}
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

export default ShareOfVoice
