import { useState } from "react" 
import { Grid, Card, CardHeader, CardContent } from "@mui/material"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DailyMessageGraph from "./DailyMessageGraph"
import DailyMessagePercentage from "./DailyMessagePercentage"
import InfluencerGraph from "./InfluencerGraph"
import InfluencerComparison from "./InfluencerComparison"
import MessageText  from 'mdi-material-ui/MessageText'
import { AccountGroup } from "mdi-material-ui"
import DayTimeComparison from "./DayTimeComparison"
import DayTimeSentiment from "./DayTimeSentiment"
import DayTimeBullyLevel from "./DayTimeBullyLevel"
import DayTimeBullyType from "./DayTimeBullyType"

const VoiceDashboard = () => {
    const [date, setDate] = useState<Date | null>(new Date())
    const [endDate, setEndDate] = useState<Date | null>(new Date())
    
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Voice Dashboard' />
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
            <Grid item xs={12} md={6}>
                <DailyMessageGraph/>
            </Grid>
            <Grid item xs={12} md={6}>
                <DailyMessagePercentage />
            </Grid>
            <Grid item xs={12} md={8}>
                <InfluencerGraph />
            </Grid>
            <Grid item xs={12} md={4}>
                <Grid xs={12}>
                    <InfluencerComparison 
                        color='primary'
                        trendNumber='29%'
                        icon={<MessageText />}
                        totalText = 'Messages'
                        totalValue = '+1,550'
                    />
                </Grid>
                <Grid xs={12} mt={5}>
                    <InfluencerComparison 
                        color='primary'
                        trendNumber='9%'
                        icon={<AccountGroup />}
                        totalText = 'Influencer'
                        totalValue = '+100'
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <DayTimeComparison />
            </Grid>
            <Grid item xs={12}>
                <DayTimeSentiment />
            </Grid>
            <Grid item xs={12}>
                <DayTimeBullyLevel />
            </Grid>
            <Grid item xs={12}>
                <DayTimeBullyType />
            </Grid>
        </Grid>
    )

}

export default VoiceDashboard 