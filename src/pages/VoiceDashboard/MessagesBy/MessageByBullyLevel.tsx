import {  CardContent, CardHeader, LinearProgress, Paper } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Bar, getDatasetAtEvent, getElementAtEvent} from 'react-chartjs-2'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import { GraphicColors } from 'src/utils/const'
import { Information } from 'mdi-material-ui'
import { InteractionItem } from 'chart.js'
import { LineProps } from './MessageByDays'
import { StyledTooltip } from 'src/pages/dashboard/overall'
import MessageDetail from 'src/pages/ChannelDashboard/MessageDetail'
import { useTranslation } from 'react-i18next'
import Translations from 'src/layouts/components/Translations'

const MessagesByBullyLevel = (props: LineProps) => {
  const { t } = useTranslation();

  const { white, labelColor, borderColor, gridLineColor, chartId, params, highlight, result, loading } = props

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
    const dailyMessageData = result?.value;

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
      const getIndex = getElementAtEvent(chartRef.current, event);

      if(getIndex?.length > 0 ) {
        const index =  getIndex[0].index;
        params.label = label[index];
      }
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

  const chartLabel = (data:any) => {
    if(!data) return [];
    const labels : any[] = [];
    
    if(data) {
      for(let i =0 ; i<data.labels?.length ; i++) {
        labels.push(t(data.labels[i]))
      }
      
    }
  
    return labels;
  }

    useEffect(() => {
        if(result) {
        const dailyMessageData = result;
        if(dailyMessageData) {
            const labels = chartLabel(dailyMessageData);
            setLabel(labels);
            
            const dataSets = chartDatasets(dailyMessageData);
            setDataset(dataSets);
        }
        }
    },[result]);

    useEffect(() =>{
      if(result) {
        const labels = chartLabel(result);
        setLabel(labels);
      }
    },[t])

    const data = {
        labels: label || [],
        datasets: dataset
    }

    const reportNo = '2.2.009';

    const chartTitle = chartId + ", Report Level 2(" + reportNo + ")";

    return (
      <Paper sx={{ border: `3px solid #fff`, borderRadius: 1 }} square variant='outlined'>
        {loading && (
          <LinearProgress
            style={{ width: "100%" }}
          />
        )}
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text="Daily Messages By Bully Level"/>}
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
                title="Daily Messages: Message Transactions"
                networkTitle="Daily Messages: Social Network Analysis"
            />: ""
          }
        
      </CardContent>
    </Paper>
    )
}

export default MessagesByBullyLevel