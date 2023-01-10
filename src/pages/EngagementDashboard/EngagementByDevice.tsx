import { Card, CardContent, CardHeader } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Bar, getDatasetAtEvent} from 'react-chartjs-2'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import DailyMessageDetail from '../dashboard/DailyMessageDetail'
import { GraphicColors } from 'src/utils/const'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { InteractionItem } from 'chart.js'
import { LineProps,chartLabel } from '../VoiceDashboard/MessageByDays'
import { GetMessagesByDevice } from 'src/services/api/dashboards/engagement/EngagementApi'
  
const EngagementByDevice = (props: LineProps) => {

  const { white, labelColor, borderColor, gridLineColor, chartId, params } = props

  const [ label, setLabel ] = useState<string[]>([]);
  const [ dataset, setDataset ] = useState<StackChartDataset[]>([]);
  const [ showDetail , setShowDetail ] = useState<boolean>(false);
  const [current, setCurrent] = useState<any>({})
  const [keywordId, setKeywordId] = useState<any>();
  const { resultMessagesByDevice } = GetMessagesByDevice(params?.campaign, params?.date, params?.endDate, params?.period);

  const chartRef = useRef();
  const getKeywordId = (dataset: InteractionItem[]) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;
    const keywordName = data.datasets[datasetIndex].label;
    const dailyMessageData = resultMessagesByDevice?.daily_message;
    let keywordId : number | null= null;
    if (dailyMessageData?.length > 0) {
      for (let i =0; i<dailyMessageData?.length; i++) {
          if(keywordName === dailyMessageData[i].keyword_name) {
            keywordId = dailyMessageData[i].keyword_id;
          }
      }
    }

    return keywordId;
  };
  
  const onClick = (event : any) => {
    if(chartRef.current) {
      const keyword_id =  getKeywordId(getDatasetAtEvent(chartRef.current, event));
      setShowDetail(true);

      if(keyword_id) {
        // setShowDetail(true);
        setCurrent({})
      }
      
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
    const color = GraphicColors
    const total = data?.value || data?.data || [];

    for(let i = 0 ; i<total?.length; i++) {
      totalAmount = []

      for(let j=0; j<total[i]?.data?.length ; j++ ) {
        totalAmount.push(total[i]?.data[j]);
      } 
      
      keywordName = total[i]?.keyword_name;
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
        if(resultMessagesByDevice) {
        const dailyMessageData = resultMessagesByDevice;
        if(dailyMessageData) {
            const labels = chartLabel(dailyMessageData);
            setLabel(labels);
            
            const dataSets = chartDatasets(dailyMessageData);
            setDataset(dataSets);
        }
        }
    },[resultMessagesByDevice]);

    const data = {
        labels: label || [],
        datasets: dataset
    }

    return (
      <Card>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title="Engangement By Device"
            titleTypographyProps={{ variant: 'h6' }}
            subheaderTypographyProps={{ variant: 'caption' }}
          />
          <StyledTooltip arrow title={chartId || ""}>
              <Information style={{marginTop: '22px', fontSize: '29px'}} />
          </StyledTooltip>
        </span>
      
      <CardContent>
          <Bar ref={chartRef} data={data} options={options as any} height={400} onClick={onClick} />
          {
            showDetail ? 
            <DailyMessageDetail 
                show={showDetail}
                setShow={setShowDetail}
                current={current}
                keywordId={keywordId}
                setKeywordId={setKeywordId}
            /> : ""
          }
        
      </CardContent>
    </Card>
    )
}

export default EngagementByDevice