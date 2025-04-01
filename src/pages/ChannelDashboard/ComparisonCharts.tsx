import { GetEngagementBy } from 'src/services/api/dashboards/channel/ChannelDashboardApi'
import Translations from 'src/layouts/components/Translations'
import { Information } from 'mdi-material-ui'
import EngagementRate from './EngagementRate'
import { StyledTooltip } from '../dashboard/overall'
import ChannelComparison from './ChannelComparison'
import { useTheme } from '@mui/material/styles'
import { CardHeader, Grid, Paper, Typography } from '@mui/material'

interface Props {
  apiParams: any
  resultReportPermission: any
  highlight: string
  params: any
}

const ComparisonCharts = (props: Props) => {
  const { apiParams, resultReportPermission, highlight,  params } = props

  const theme = useTheme()

  const whiteColor = '#fff'
  const lineChartYellow = '#d4e157'
  const lineChartPrimary = '#787EFF'
  const lineChartWarning = '#ff9800'
  const labelColor = theme.palette.text.primary
  const borderColor = theme.palette.action.focus
  const gridLineColor = theme.palette.action.focus
  const {
    resultEngagementRate,
    resultEngagementRatePrevious,
    resultFacebookComparison,
    resultInstagramComparison,
    resultTwitterComparison,
    resultPantipComparison,
    resultYoutubeComparison,
    resultGoogleComparison,
    resultTiktokComparison,
    loadingEngagementBy
  } = GetEngagementBy(apiParams)

  return (
    <>
      {resultReportPermission?.includes('53') ? (
        <>
          <Grid item xs={12} id='chart10'>
            <Paper style={{ border: `3px solid #fff`, borderRadius: 7 }}>
              <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader
                  title={<Translations text='Channel Comparison: Period over Period' />}
                  titleTypographyProps={{ variant: 'h6'}}
                />
                <StyledTooltip
                  arrow
                  title={
                    <span>
                      <span>
                        <Typography variant='h6' sx={{ color: 'white' }}>
                          <Translations text='channelChart10Title' />
                        </Typography>
                        <Typography variant='body2' sx={{ color: 'white' }}>
                          <Translations text='channelChart10Description' />
                        </Typography>
                      </span>
                    </span>
                  }
                >
                  <Information
                    style={{
                      marginTop: '22px',
                      fontSize: '29px'
                    }}
                  />
                </StyledTooltip>
              </span>
            </Paper>
          </Grid>

          <Grid container spacing={3} pl={3} pt={3}>
            <Grid item xs={6} md={1.7}>
              {resultFacebookComparison ? (
                <ChannelComparison
                  color='#3b5998'
                  trendNumber={resultFacebookComparison?.percentage}
                  trend={resultFacebookComparison?.type}
                  totalText='Facebook'
                  totalValue={resultFacebookComparison?.comparison_value}
                  loading={loadingEngagementBy}
                />
              ) : (
                ''
              )}
            </Grid>
            <Grid item xs={6} md={1.7}>
              {resultTwitterComparison ? (
                <ChannelComparison
                  color='#00aced'
                  trendNumber={resultTwitterComparison?.percentage}
                  trend={resultTwitterComparison?.type}
                  totalText='X'
                  totalValue={resultTwitterComparison?.comparison_value}
                  loading={loadingEngagementBy}
                />
              ) : (
                ''
              )}
            </Grid>
            <Grid item xs={6} md={1.7}>
              {resultYoutubeComparison ? (
                <ChannelComparison
                  color='#e31010'
                  trendNumber={resultYoutubeComparison?.percentage}
                  trend={resultYoutubeComparison?.type}
                  totalText='Youtube'
                  totalValue={resultYoutubeComparison?.comparison_value}
                  loading={loadingEngagementBy}
                />
              ) : (
                ''
              )}
            </Grid>
            <Grid item xs={6} md={1.7}>
              {resultInstagramComparison ? (
                <ChannelComparison
                  color='#d62976'
                  trendNumber={resultInstagramComparison?.percentage}
                  trend={resultInstagramComparison?.type}
                  totalText='Instagram'
                  totalValue={resultInstagramComparison?.comparison_value}
                  loading={loadingEngagementBy}
                />
              ) : (
                ''
              )}
            </Grid>
            <Grid item xs={6} md={1.7}>
              {resultGoogleComparison ? (
                <ChannelComparison
                  color='#F4B400'
                  trendNumber={resultGoogleComparison?.percentage}
                  trend={resultGoogleComparison?.type}
                  totalText='Google'
                  totalValue={resultGoogleComparison?.comparison_value}
                  loading={loadingEngagementBy}
                />
              ) : (
                ''
              )}
            </Grid>
            <Grid item xs={6} md={1.7}>
              {resultPantipComparison ? (
                <ChannelComparison
                  color='#642c8c'
                  trendNumber={resultPantipComparison?.percentage}
                  trend={resultPantipComparison?.type}
                  totalText='Pantip'
                  totalValue={resultPantipComparison?.comparison_value}
                  loading={loadingEngagementBy}
                />
              ) : (
                ''
              )}
            </Grid>
            <Grid item xs={6} md={1.7}>
              {resultTiktokComparison ? (
                <ChannelComparison
                  color='#000000'
                  trendNumber={resultTiktokComparison?.percentage}
                  trend={resultTiktokComparison?.type}
                  totalText='Tiktok'
                  totalValue={resultTiktokComparison?.comparison_value}
                  loading={loadingEngagementBy}
                />
              ) : (
                ''
              )}
            </Grid>
          </Grid>
        </>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('54') ? (
        <Grid item xs={12} md={6} id='chart11'>
          <EngagementRate
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 11'
            highlight={highlight === 'chart11' ? true : false}
            resultBy={resultEngagementRate}
            loading={loadingEngagementBy}
            resultByPrevious={resultEngagementRatePrevious}
          />
        </Grid>
      ) : (
        ''
      )}
    </>
  )
}

export default ComparisonCharts
