import { Grid } from '@mui/material'
import PlatformsComparison from './PlatformsComparison'
import DevicesComparison from './DevicesComparison'
import ChannelVsDevice from './ChannelVsDevice'
import { GetChannelDeviceAll } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'
import { useEffect, useState } from 'react'

const Comparison = ({
  params,
  highlight,
  resultReportPermission
}: {
  params: any
  highlight: string
  resultReportPermission: any
}) => {
  const [apiParams, setApiParams] = useState<any>()

  const { result, loading } = GetChannelDeviceAll(
    apiParams
  )

  useEffect(() => {
    if (params?.period !== 'customrange') {
      setApiParams({
        campaign_id: params?.campaign,
        source: params?.platformId,
        start_date: params?.date,
        end_date: params?.endDate,
        period: params?.period,
        fillter_keywords: params?.keywordIds
      })
    } 
    if (
      params?.period === 'customrange' &&
      params?.endDate &&
      params?.previousEndDate &&
      params?.date !== params?.endDate
      && params?.previousDate !== params?.previousEndDate
    ) {
      setApiParams({
        campaign_id: params?.campaign,
        source: params?.platformId,
        start_date: params?.date,
        end_date: params?.endDate,
        period: params?.period,
        start_date_period: params?.previousDate,
        end_date_period: params?.previousEndDate,
        fillter_keywords: params?.keywordIds
      })
    }
  }, [params])

  return (
    <>
      {resultReportPermission?.includes('37') ? (
        <Grid item xs={12} md={4} id='chart18'>
          <PlatformsComparison
            params={params}
            resultPlatformComparison={result?.channelPlatform}
            loadingPlatformComparison={loading}
            chartId='chart 18'
            highlight={highlight === 'chart18' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('38') ? (
        <Grid item xs={12} md={4} id='chart19'>
          <DevicesComparison
            resultDevicesComparison={result?.device}
            loadingDevicesComparison={loading}
            params={params}
            chartId='Chart 19'
            highlight={highlight === 'chart19' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('39') ? (
        <Grid item xs={12} md={4} id='chart20'>
          <ChannelVsDevice
            resultDeviceVsChannel={result?.channelDevice}
            loadingDeviceVsChannel={loading}
            params={params}
            chartId='Chart 20'
            highlight={highlight === 'chart20' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )}
    </>
  )
}

export default Comparison
