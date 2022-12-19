import { Button, Card, CardContent, CardHeader } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Bar, getDatasetAtEvent, getElementAtEvent, getElementsAtEvent } from 'react-chartjs-2'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import DailyMessageDetail from '../dashboard/DailyMessageDetail' 
import CloseCircleOutline from 'mdi-material-ui/CloseCircleOutline';

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
  }
  
  const chartLabel = (data:any) => {
    if(!data) return [];
    
    let labels : string[] = [];
    if(data) {
      labels = data.labels;
    }
  
    return labels;
  }

  const getTitle = (title: string) => {
    if(!title) return "";

    let cardTitle = "";
    if (title === "day") {
      cardTitle = "Message by Day"
    } else if (title === "time") {
      cardTitle = "Message by Time"
    } else if(title === "device") {
      cardTitle = "Message by Devices"
    } else if(title === "account") {
      cardTitle = "Message by Account"
    } else if(title === "channel") {
      cardTitle = "Message by Channel"
    } else if(title === "sentiment") {
      cardTitle = "Message by Sentiment"
    } else if(title === "bullyType") {
      cardTitle = "Message by Bully Type"
    } else if(title === "bullyLevel") {
      cardTitle = "Message by Bully Level"
    } else {
      cardTitle = ""
    }

    return cardTitle;
  }

const MessagesByDay = (props: LineProps) => {

  const { white, labelColor,primary,  borderColor, gridLineColor, filterData, type } = props

  const [ label, setLabel ] = useState<string[]>([]);
  const [ dataset, setDataset ] = useState<StackChartDataset[]>([]);
  const [ showDetail , setShowDetail ] = useState<boolean>(false);

  const chartRef = useRef();
  const onClick = (event : any) => {
    if(chartRef.current) {
      console.log(getDatasetAtEvent(chartRef.current, event));
      console.log(getElementAtEvent(chartRef.current, event));
      console.log(getElementsAtEvent(chartRef.current, event));
      setShowDetail(true);
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
    const color = ['#FF80AA','#36a2eb','#7FFFD4', '#A52A2A', '#29A6A6', '#FFA500',primary]
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
          title={getTitle(type)}
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
        {
          showDetail ? 
          <DailyMessageDetail/>
          :
          <Bar ref={chartRef} data={data} options={options as any} height={400} onClick={onClick} />
        }
        
      </CardContent>
    </Card>
    )
}

export default MessagesByDay