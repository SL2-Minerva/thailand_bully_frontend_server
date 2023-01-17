import { Box, Card, CardContent, CardHeader, Grid, Pagination, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Information } from 'mdi-material-ui'
import { useEffect, useRef, useState } from 'react'
import { Bar, getDatasetAtEvent, getElementAtEvent, getElementsAtEvent } from 'react-chartjs-2'
import { GetSenitmentComparisonByEngagement } from 'src/services/api/dashboards/sentiment/sentimentDashboard'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import { PeriodComparisonChannel, sentimentComparison, SentimentComparisonEngagment } from 'src/utils/const'
import { StyledTooltip } from '../dashboard/overall'

interface LineProps {
    white: string
    warning: string
    primary: string
    success: string
    labelColor: string
    borderColor: string
    gridLineColor: string
    params: any
    type: string
    chartTitle: string
    colorType?: string
    chartId: string
    highlight : boolean
    reportNo: string
  }
  
  const chartLabel = (data:any) => {
    if(!data) return [];
    
    let labels : string[] = [];
    if(data) {
      labels = data.labels;
    }
  
    return labels;
  }

  const getTitle = (title: string, chartTitle: string) => {
    if(!title && !chartTitle) return "";

    let cardTitle = "";
    if (title === "channel") {
      cardTitle = chartTitle +" by Channel"
    } else if (title === "sentiment") {
      cardTitle = chartTitle +" by Sentiment"
    } else if (title === "engagementType") {
      cardTitle = chartTitle +" by Engagement Type"
    } else {
      cardTitle = chartTitle
    }

    return cardTitle;
  }

const PeriodComparisonChart = (props: LineProps) => {

  const { white, labelColor, borderColor, gridLineColor, type, chartTitle, colorType, chartId, params, highlight, reportNo } = props
  const [ label, setLabel ] = useState<string[]>([]);
  const [ dataset, setDataset ] = useState<StackChartDataset[]>([]);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState<number>(0);

  const { resultSentimentComparisonByEngagement, total } = GetSenitmentComparisonByEngagement(params?.campaign, params?.date, params?.endDate, params?.period, page);

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value-1);
};

  useEffect(()=> {
      if (total > 0) {
      setPageCount(Math.ceil(total / 10));
      }
  }, [total]);


  const chartRef = useRef();
  const onClick = (event : any) => {
    if(chartRef.current) {
      console.log(getDatasetAtEvent(chartRef.current, event));
      console.log(getElementAtEvent(chartRef.current, event));
      console.log(getElementsAtEvent(chartRef.current, event));
    }
  }

  const options = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: labelColor },
        grid: {
          borderColor,
          color: gridLineColor
        },
        stacked: false
      },
      y: {
        min: 0,

        // max: 5000,
        
        scaleLabel: { display: true },
        ticks: {
          stepSize: 100,
          color: labelColor
        },
        grid: {
          borderColor,
          color: gridLineColor
        },

        // stacked: true
        
      }
    },
    plugins: {
      legend: {
        align: 'end',
        position: 'top',
        labels: {
          padding: 25,
          boxWidth: 10,
          color: labelColor,
          usePointStyle: true
        }
      }
    }
  }

  const chartDatasets = (data:any) => {
    if(!data) return [];
    let totalAmount : number[] = [];
    let keywordName = "";
    const returnData : StackChartDataset[] = [];
    const color = colorType === "SentimentComparisonEngagment" ? SentimentComparisonEngagment : colorType === "sentimentComparison" ? sentimentComparison :PeriodComparisonChannel
    for(let i = 0 ; i<data?.value?.length; i++) {
      totalAmount = []
      const total = data?.value;
    
      for(let j=0; j<total[i]?.data?.length ; j++ ) {
        totalAmount.push(total[i]?.data[j]);
      } 
      
      keywordName = data?.value[i]?.keyword_name;
      const chartDataset : StackChartDataset  = {
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: keywordName,
        pointHoverRadius: 5,
        pointStyle: 'circle',
        borderColor: color[i],
        backgroundColor: color[i],
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: white,
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: color[i],
        data: totalAmount
      }
  
      returnData.push(chartDataset);
    }

    return returnData;
  
  }

    useEffect(() => {
        if(resultSentimentComparisonByEngagement) {
        const dailyMessageData = resultSentimentComparisonByEngagement;
        if(dailyMessageData) {
            const labels = chartLabel(dailyMessageData);
            setLabel(labels);
            
            const dataSets = chartDatasets(dailyMessageData);
            setDataset(dataSets);
        }
        }
    },[resultSentimentComparisonByEngagement]);

    const data = {
        labels: label || [],
        datasets: dataset
    }

    const title = chartId + ", Report Level 2(" + reportNo + ")";

    return (
        <Card>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <CardHeader
              title={getTitle(type, chartTitle)}
              titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
              subheaderTypographyProps={{ variant: 'caption', color: highlight ? 'green' : '#4c4e64de' }}
            />
            <StyledTooltip arrow title={title || ""}>
                <Information style={{marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de'}} />
            </StyledTooltip>
        </span>
      
      <CardContent>
        <Grid container spacing={2} >
            <Grid item xs={12}> 
                <Bar ref={chartRef} data={data} options={options as any} height={400} onClick={onClick} />
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        
                        <TableRow>
                            <TableCell width={30}>
                              {
                                resultSentimentComparisonByEngagement?.share ? "Share" : "Positive"
                              }
                            </TableCell>
                            {
                                (resultSentimentComparisonByEngagement?.share || resultSentimentComparisonByEngagement?.positive || [])?.map((share : any, index : number) => {
                                    return(
                                        <TableCell align='left' key={index}>{share}</TableCell>
                                    )
                                })
                            }
                        </TableRow>
                        <TableRow>
                            <TableCell>
                              {
                                resultSentimentComparisonByEngagement?.comment ? "Comment" : "Neutral"
                              }
                            </TableCell>
                            {
                                (resultSentimentComparisonByEngagement?.comment || resultSentimentComparisonByEngagement?.neutral ||  [])?.map((comment : any, index : number) => {
                                    return(
                                        <TableCell align='left' key={index}>{comment}</TableCell>
                                    )
                                })
                            }
                        </TableRow>
                        <TableRow>
                            <TableCell>
                              {
                                resultSentimentComparisonByEngagement?.comment ? "Reaction" : "Negative"
                              }
                            </TableCell>
                            {
                                (resultSentimentComparisonByEngagement?.reaction || resultSentimentComparisonByEngagement?.negative || [])?.map((reaction : any, index : number) => {
                                    return(
                                        <TableCell align='left' key={index}>{reaction}</TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    </Table>
              </TableContainer>
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

export default PeriodComparisonChart