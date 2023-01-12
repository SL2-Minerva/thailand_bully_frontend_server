import { Card, CardContent, CardHeader } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Bar, getDatasetAtEvent} from 'react-chartjs-2'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { InteractionItem } from 'chart.js'
import { LineProps } from '../VoiceDashboard/MessageByDays'
import { GetChannelByBullyType } from 'src/services/api/dashboards/channel/ChannelDashboardApi'
import { chartDatasets, chartLabel } from './ChannelByBullyLevel'
import MessageDetail from './MessageDetail'
  
const ChannelByBullyType = (props: LineProps) => {

  const { labelColor, borderColor, gridLineColor, chartId, params, highlight } = props

  const [ label, setLabel ] = useState<string[]>([]);
  const [ dataset, setDataset ] = useState<StackChartDataset[]>([]);
  const [ showDetail , setShowDetail ] = useState<boolean>(false);
  const { resultChannelByBullyType } = GetChannelByBullyType(params?.campaign, params?.date, params?.endDate, params?.period);
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
    const dailyMessageData = resultChannelByBullyType?.value;

    const keywordId : number | null= null;
    let sourceId : number | null = null;
    let campaign_id : number | null = null;
    const organization_id : number | null = null;

    if (dailyMessageData?.length > 0) {
      for (let i =0; i<dailyMessageData?.length; i++) {
          if(keywordName === dailyMessageData[i].source_name) {
            sourceId = dailyMessageData[i].source_id;
            campaign_id = dailyMessageData[i].campaign_id;
          }
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
        if(resultChannelByBullyType) {
        const dailyMessageData = resultChannelByBullyType;
        if(dailyMessageData) {
            const labels = chartLabel(dailyMessageData);
            setLabel(labels);
            
            const dataSets = chartDatasets(dailyMessageData);
            setDataset(dataSets);
        }
        }
    },[resultChannelByBullyType]);

    const data = {
        labels: label || [],
        datasets: dataset
    }

    return (
      <Card>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title="Channel By Bully Type"
            titleTypographyProps={{ variant: 'h6' }}
            subheaderTypographyProps={{ variant: 'caption',color: highlight ? 'green' : '#4c4e64de' }}
          />
          <StyledTooltip arrow title={chartId || ""}>
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
            /> : ""
          }
        
      </CardContent>
    </Card>
    )
}

export default ChannelByBullyType