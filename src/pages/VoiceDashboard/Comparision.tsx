import { Grid } from '@mui/material'
import PlatformsComparison from './PlatformsComparison'
import DevicesComparison from './DevicesComparison'
import ChannelVsDevice from './ChannelVsDevice'
import { GetChannelDeviceAll } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'

const Comparison = ({
  params,
  highlight,
  resultReportPermission
}: {
  params: any
  highlight: string
  resultReportPermission: any
}) => {
  const { result, loading } = GetChannelDeviceAll(
    params?.campaign,
    params?.date,
    params?.endDate,
    params?.period,
    params?.keywordIds
  )

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
