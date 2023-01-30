import { Paper, CardContent, CardHeader, LinearProgress } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Bar, getDatasetAtEvent} from 'react-chartjs-2'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import { SentimentColors } from 'src/utils/const'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { InteractionItem } from 'chart.js'
import { LineProps,chartLabel } from '../VoiceDashboard/MessageByDays'
import MessageDetail from '../ChannelDashboard/MessageDetail'
  
const SentimentByTime = (props: LineProps) => {

  const { white, labelColor, borderColor, gridLineColor, chartId, params, highlight, resultBy, loading } = props

  const [ label, setLabel ] = useState<string[]>([]);
  const [ dataset, setDataset ] = useState<StackChartDataset[]>([]);
  const [ showDetail , setShowDetail ] = useState<boolean>(false);
  const [ paramsId, setParamsId] = useState<any>({
    keywordId : null,
    sourceId: null,
    campaign_id: null,
    organization_id: null
  });

  const chartRef = useRef();
  const getKeywordId = (dataset: InteractionItem[]) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;
    const keywordName = data.datasets[datasetIndex].label;
    const dailyMessageData = resultBy?.value;

    let keywordId : number | null= null;
    let sourceId : number | null = null;
    let campaign_id : number | null = null;

    if (dailyMessageData?.length > 0) {
      for (let i =0; i<dailyMessageData?.length; i++) {
          if(keywordName === dailyMessageData[i].keyword_name) {
            sourceId = dailyMessageData[i].source_id || "";
            campaign_id = dailyMessageData[i].campaign_id || "";
            keywordId = dailyMessageData[i].id || "";
          }
      }
    }

    const returnData  = {
      keywordId : keywordId,
      sourceId: sourceId,
      campaign_id: campaign_id,
      organization_id: ""
    }
    
    return returnData;
  };
  
  const onClick = (event : any) => {
    if(chartRef.current) {
      const keyword_id =  getKeywordId(getDatasetAtEvent(chartRef.current, event));

      if(keyword_id) {
        setParamsId(keyword_id);
        setShowDetail(true);
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
    const color = SentimentColors
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
        if(resultBy) {
        const dailyMessageData = resultBy;
        if(dailyMessageData) {
            const labels = chartLabel(dailyMessageData);
            setLabel(labels);
            
            const dataSets = chartDatasets(dailyMessageData);
            setDataset(dataSets);
        }
        }
    },[resultBy]);

    const data = {
        labels: label || [],
        datasets: dataset
    }

    const reportNo = '5.2.004';

   const chartTitle = chartId + ", Report Level 2(" + reportNo + ")";

    return (
      <Paper sx={{ border: `3px solid #fff`, borderRadius: 1}} square variant='outlined'>
        {loading && (
            <LinearProgress
                style={{ width: "100%" }}
            />
            )}
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title="Daily Sentiment By Time"
            titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
            subheaderTypographyProps={{ variant: 'caption', color: highlight ? 'green' : '#4c4e64de' }}
          />
          <StyledTooltip arrow title={chartTitle || ""}>
              <Information style={{marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de'}} />
          </StyledTooltip>
        </span>
      
      <CardContent>
          <Bar ref={chartRef} data={data} options={options as any} height={400} onClick={onClick} />
          {
            showDetail ? 
            <MessageDetail 
                show={showDetail}
                setShow={setShowDetail}
                params = {params}
                paramsId = {paramsId}
                setParamsId={setParamsId}
                reportNo = {reportNo}
            />: ""
          }
        
      </CardContent>
    </Paper>
    )
}

export default SentimentByTime