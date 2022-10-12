import { useState } from "react"
import { Grid , Card, CardHeader, CardContent } from "@mui/material"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import StackedChart from "./stackedChart"
import DonutChart from "./donutChart"
import { useTheme } from '@mui/material/styles'
import MessageText  from 'mdi-material-ui/MessageText'
import ThumbUp from 'mdi-material-ui/ThumbUp'
import Person from 'mdi-material-ui/Account'
import KeyStatusReport from "./keyStatusReport"

// ** Third Party Styles Imports

import 'chart.js/auto'
import 'react-datepicker/dist/react-datepicker.css'
import KeywordTable from "./keywordTable"
import MainKeyWordTable from "./MainKeywordTable"
import SubKeywordList from "./SubKeyWordList"
import TopHashtagList from "./TopHastagList"
import TopSiteList from "./TopSiteList"
import SentimentGaugeChart from "./SentimentGaugeChart"
import CommentSentiment from "./CommentSentiment"
import ShareOfVoice from "./ShareOfVoice"
import SentimentLevelChart from "./SentimentLevelChart"

const OverallDashboard = () => {
  const [date, setDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(new Date())
  const theme = useTheme()

  const whiteColor = '#fff'
  const lineChartYellow = '#d4e157'
  const lineChartPrimary = '#787EFF'
  const lineChartWarning = '#ff9800'
  const labelColor = theme.palette.text.primary
  const borderColor = theme.palette.action.focus
  const gridLineColor = theme.palette.action.focus

  return (
    <Grid container spacing={6}>
        <Grid item xs={12}>
            <Card>
                <CardHeader title='Overall Dashboard' />
                <CardContent>

                    <Grid container spacing={6} mt={2}>
                    <Grid item sm={4} xs={12}>
                        <FormControl fullWidth>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label='Start Date'
                                value={date}
                                onChange={newValue => setDate(newValue)}
                                renderInput={params => <TextField {...params} />}
                            />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <FormControl fullWidth>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label='End Date'
                                value={endDate}
                                onChange={newValue => setEndDate(newValue)}
                                renderInput={params => <TextField {...params} />}
                            />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>
                    <Grid item sm={4} xs={12} mt={2}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                
                            <Button sx={{ mb: 2, mr: 2 }} onClick={()=>{console.log("search")}} variant='contained'>
                                Daily
                            </Button>
                            <Button sx={{ mb: 2, mr: 2 }} onClick={()=>{console.log("search")}} variant='contained'>
                                Weekly
                            </Button>
                            <Button sx={{ mb: 2, mr: 2 }} onClick={()=>{console.log("search")}} variant='contained'>
                                Monthly
                            </Button>
                        </Box>
                    </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </Grid>

        
        <Grid item xs={12} md={8}>
            <StackedChart
                white={whiteColor}
                labelColor={labelColor}
                success={lineChartYellow}
                borderColor={borderColor}
                primary={lineChartPrimary}
                warning={lineChartWarning}
                gridLineColor={gridLineColor}
            />
        </Grid>

        <Grid item xs={12} md={4}>
            <DonutChart />
        </Grid>

        <Grid item xs={12} md={4}>
            <KeyStatusReport
                stats='+6000'
                color='primary'
                trendNumber='10%'
                icon={<MessageText />}
                title='Period over Period Comparison'
                chipText='Last 1 Month'
                totalText = 'Total Message'
                totalValue = '12600'
                averageText="Average Message per Day"
                averageValue="600"
            />
        </Grid>

        <Grid item xs={12} md={4}>
            <KeyStatusReport
                stats='+6000'
                color='primary'
                trendNumber='10%'
                icon={<ThumbUp />}
                title='Period over Period Comparison'
                chipText='Last 1 Month'
                totalText = 'Total Engagement'
                totalValue = '12600'
                averageText="Avg. Engagement per Day"
                averageValue="600"
            />
        </Grid>

        <Grid item xs={12} md={4}>
            <KeyStatusReport
                stats='+6000'
                color='primary'
                trendNumber='10%'
                icon={<Person />}
                title='Period over Period Comparison'
                chipText='Last 1 Month'
                totalText = 'Total Account'
                totalValue = '12600'
                averageText="Average Account per Day"
                averageValue="600"
            />
        </Grid>

        <Grid item xs={12}>
            <KeywordTable />
        </Grid>

        <Grid item xs={12} md={6}>
            <MainKeyWordTable/>
        </Grid>

        <Grid item xs={12} md={6}>
            <SubKeywordList/>
        </Grid>

        <Grid item xs={12} md={6}>
            <TopSiteList/>
        </Grid>

        <Grid item xs={12} md={6}>
            <TopHashtagList/>
        </Grid>

        <Grid item xs={12} md ={6}>
            <SentimentGaugeChart />
        </Grid>

        <Grid item xs={12} md={6}>
            <CommentSentiment/>
        </Grid>

        <Grid item xs={12} md={8}>
            <ShareOfVoice />
        </Grid>

        <Grid item xs={12} md={4}>
            <SentimentLevelChart />
        </Grid>

    </Grid>
  )
    
}

export default OverallDashboard