import { Button, Card, CardContent, CardHeader } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Bar, getDatasetAtEvent, getElementAtEvent, getElementsAtEvent } from 'react-chartjs-2'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import DailyMessageDetail from '../dashboard/DailyMessageDetail' 
import CloseCircleOutline from 'mdi-material-ui/CloseCircleOutline';
import { EngagementTypeColors, GraphicColors } from 'src/utils/const'

interface LineProps {
    white: string
    warning: string
    primary: string
    success: string
    labelColor: string
    borderColor: string
    gridLineColor: string
    filterData: any
    type: string
    chartTitle: string
    colorType?: string
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
    if (title === "day") {
      cardTitle = chartTitle +" by Day"
    } else if (title === "time") {
      cardTitle = chartTitle +" by Time"
    } else if(title === "device") {
      cardTitle = chartTitle +" by Devices"
    } else if(title === "account") {
      cardTitle = chartTitle +" by Account"
    } else if(title === "channel") {
      cardTitle = chartTitle +" by Channel"
    } else if(title === "sentiment") {
      cardTitle = chartTitle +" by Sentiment"
    } else if(title === "bullyType") {
      cardTitle = chartTitle +" by Bully Type"
    } else if(title === "bullyLevel") {
      cardTitle = chartTitle +" by Bully Level"
    } else {
      cardTitle = chartTitle
    }

    return cardTitle;
  }

const MessagesByDay = (props: LineProps) => {

  const { white, labelColor, borderColor, gridLineColor, filterData, type, chartTitle, colorType } = props

  const [ label, setLabel ] = useState<string[]>([]);
  const [ dataset, setDataset ] = useState<StackChartDataset[]>([]);
  const [ showDetail , setShowDetail ] = useState<boolean>(false);
  const [current, setCurrent] = useState<any>({})

  const chartRef = useRef();
  const onClick = (event : any) => {
    if(chartRef.current) {
      console.log(getDatasetAtEvent(chartRef.current, event));
      console.log(getElementAtEvent(chartRef.current, event));
      console.log(getElementsAtEvent(chartRef.current, event));
      setShowDetail(true);
      setCurrent({})

    }
  }

  const showMessageDetail = () => {
    setShowDetail(false);
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
    const color = colorType === "engagementType" ? EngagementTypeColors :GraphicColors
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
        if(filterData) {
        const dailyMessageData = filterData;
        if(dailyMessageData) {
            const labels = chartLabel(dailyMessageData);
            setLabel(labels);
            
            const dataSets = chartDatasets(dailyMessageData);
            setDataset(dataSets);
        }
        }
    },[filterData]);

    const data = {
        labels: label || [],
        datasets: dataset
    }

    return (
        <Card>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <CardHeader
          title={getTitle(type, chartTitle)}
          titleTypographyProps={{ variant: 'h6' }}
          subheaderTypographyProps={{ variant: 'caption' }}
        />
        {
          showDetail ? 
          <Button style={{ marginTop: '20px', marginRight: '10px' }} 
             color="primary" onClick={showMessageDetail} size="small">
            <CloseCircleOutline fontSize='large'/>
          </Button>
          :
          ""
        }
      </div>
      
      <CardContent>
          <Bar ref={chartRef} data={data} options={options as any} height={400} onClick={onClick} />
          <DailyMessageDetail 
            show={showDetail}
            setShow={setShowDetail}
            current={current}
         />
        
      </CardContent>
    </Card>
    )
}

export default MessagesByDay