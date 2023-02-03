import { Card, CardContent, CardHeader, LinearProgress } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Bar, getDatasetAtEvent, getElementAtEvent} from 'react-chartjs-2'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import { GraphicColors } from 'src/utils/const'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { InteractionItem } from 'chart.js'
import { LineProps } from '../VoiceDashboard/MessageByDays'
import MessageDetail from './MessageDetail'
import Translations from 'src/layouts/components/Translations'

export const chartLabel = (currentData:any, previousData : any) => {
  if(!currentData && !previousData) return [];
  
  let labels : string[] = [];

    const currentPeriod = currentData?.labels;
    const previousPeriod = previousData?.labels;

    if ( currentPeriod?.length > previousPeriod?.length) {
      labels = currentPeriod;
    } else {
      labels = previousPeriod;
    }

  return labels;
}

export const chartDatasets = (currentData:any, previousData: any) => {
  if(!currentData) return [];
  const returnData : StackChartDataset[] = [];

  const color = GraphicColors

    const totalCurrent = currentData?.value?.current_period?.data || [];
    const totalPrevious = previousData?.value?.previous_period?.data || [];

    const chartDatasetCurrent : StackChartDataset  = {
      fill: false,
      tension: 0.5,
      pointRadius: 1,
      label: "Current Period",
      pointHoverRadius: 5,
      pointStyle: 'circle',
      borderColor: color[0],
      backgroundColor: color[0],
      pointHoverBorderWidth: 5,
      pointHoverBorderColor: '#fff',
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: color[0],
      data: totalCurrent
    }

    const chartDatasetPrevious : StackChartDataset  = {
      fill: false,
      tension: 0.5,
      pointRadius: 1,
      label: "Previous Period",
      pointHoverRadius: 5,
      pointStyle: 'circle',
      borderColor: color[1],
      backgroundColor: color[1],
      pointHoverBorderWidth: 5,
      pointHoverBorderColor: "#fff",
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: color[1],
      data: totalPrevious
   }

    returnData.push(chartDatasetCurrent);
    returnData.push(chartDatasetPrevious)


  return returnData;

}
  
const EngagementRate = (props: LineProps) => {

  const { labelColor, borderColor, gridLineColor, chartId, params, highlight,resultBy, resultByPrevious, loading  } = props

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
    const dailyMessageData = resultByPrevious?.value?.previous_period;

    const keywordId : number | null= null;
    let sourceId : number | null = null;
    let campaign_id : number | null = null;
    const organization_id : number | null = null;

    if (dailyMessageData?.length > 0) {
      for (let i =0; i<dailyMessageData?.length; i++) {
          if(keywordName === dailyMessageData[i].source_name) {
            sourceId = dailyMessageData[i].source_id || "";
            campaign_id = dailyMessageData[i].campaign_id || "";          }
      }
    }

    const returnData  = {
      keywordId : keywordId,
      sourceId: sourceId,
      campaign_id: campaign_id,
      organization_id: organization_id
    }
    
    return returnData;
  };
  
  const onClick = (event : any) => {
    if(chartRef.current) {
      const getIndex = getElementAtEvent(chartRef.current, event);

      if(getIndex?.length > 0 ) {
        const index =  getIndex[0].index;
        params.label = label[index];
      }
      const messageDetailIds =  getKeywordId(getDatasetAtEvent(chartRef.current, event));

      if(messageDetailIds) {
        setParamsId(messageDetailIds);
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

    useEffect(() => {
        if(resultBy) {
        const currentEngagementData = resultBy;
        const previousEngagementData = resultByPrevious;

        if(currentEngagementData) {
            const labels = chartLabel(currentEngagementData, previousEngagementData);
            setLabel(labels);
            
            const dataSets = chartDatasets(currentEngagementData, previousEngagementData);
            setDataset(dataSets);
        }
        }
    },[resultBy, resultByPrevious]);

    const data = {
        labels: label || [],
        datasets: dataset
    }

    const reportNo = '3.2.013';

    const chartTitle = chartId + ", Report Level 2(" + reportNo + ")";

    return (
      <Card>
        { loading && (
        <LinearProgress
            style={{ width: "100%" }}
        />
        )}
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text="Engagement Rate"/>}
            titleTypographyProps={{ variant: 'h6',color: highlight ? 'green' : '#4c4e64de' }}
            subheaderTypographyProps={{ variant: 'caption',color: highlight ? 'green' : '#4c4e64de' }}
          />
          <StyledTooltip arrow title={chartTitle || ""}>
              <Information style={{marginTop: '22px', fontSize: '29px',color: highlight ? 'green' : '#4c4e64de'}} />
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
            /> : ""
          }
        
      </CardContent>
    </Card>
    )
}

export default EngagementRate