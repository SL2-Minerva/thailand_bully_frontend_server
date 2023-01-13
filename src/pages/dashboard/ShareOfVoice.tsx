// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid, TableBody, Typography } from "@mui/material"
import { Table, TableRow, TableHead, TableCell } from "@mui/material"; 

// ** Third Party Imports
import { Bar } from 'react-chartjs-2'
import { StyledTooltip } from './overall';
import { Information } from 'mdi-material-ui';
import { GetShareOfVoice, GetShareOfVoiceChart } from 'src/services/api/dashboards/overall/overallDashboardApi';
import { FacebookIcon, InstagramIcon, PantipIcon, TwitterIcon, YoutubeIcon } from 'src/utils/const';

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

  const ShareOfVoiceTable = (data: any) => {
    if(!data) return null;
  
    const percentageData = data?.data?.value;

    return (
       <>
              {
                (percentageData || []).map((percentage : any , index: number) => {
                  return (
                    <TableCell key={index}>
                        <span style={{ border : percentage?.highlight ? "1px solid red" : "", padding: '4px' }}>
                            { percentage?.percentage  + "%"} 
                          </span>
                    </TableCell>
                  )
                })
              }
       </> 
    );
  }

  const ShareOfVoiceTableHead = (data: any) => {
    if(!data) return null; 
    const tableHeader : any[] = [];

    const headerData = data?.data;

    for(let i=0; i<headerData?.length ; i++) {
      const value = headerData[i]?.value ; 
      for(let j=0; j<value?.length; j++) {
        tableHeader.push(value[i]?.channel);
      }
    }

    const filterData = [...new Set(tableHeader)];

    return (
      <>
          {
            (filterData || []).map((title :any, i :number) => {
              const imgPath = title === 'twitter' ? TwitterIcon : title === 'youtube' ? YoutubeIcon : title === 'facebook' ? FacebookIcon
                              :  title === 'instagram' ? InstagramIcon :  title === 'pantip' ? PantipIcon : ""; 

                return (
                  <TableCell key={i}>
                    
                      {
                        imgPath ? 
                        <img alt="logo" width={34} height={34} src={imgPath}/>
                        : 
                        <Typography variant="caption" textTransform="uppercase">
                            {title}
                        </Typography>
                      }
                  </TableCell>
                )
            })
          }
      </>
    )
    
  }


  return (
    <Card sx={{ minHeight: 380 }}>
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
                    <TableRow>
                        <ShareOfVoiceTableHead data={resultShareOfVoice} />
                    </TableRow>
                </TableHead>
                {
                  (resultShareOfVoice || []).map((shareVoice : any, index: number) => {
                    return(
                      <TableBody key={index}>
                          <TableRow>
                              <ShareOfVoiceTable data={shareVoice} />
                          </TableRow>
                      </TableBody>
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
