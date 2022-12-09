import { useCallback, useState } from "react" 
import { Grid, Card, CardHeader, CardContent, InputLabel, MenuItem } from "@mui/material"
import Select, { SelectChangeEvent } from '@mui/material/Select'
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
import { calculateDate, get1stAndLastDayOfMonth } from "../dashboard/overall"


const VoiceDashboard = () => {
    const [date, setDate] = useState<Date | null>(new Date())
    const [endDate, setEndDate] = useState<Date | null>(new Date())
    const [ dateSelect, setDateSelect ] = useState<string>("1")
    const [ disableSelectDate, setDisableSelectDate ] = useState<boolean>(true);

    const handleDateSelect = useCallback((e:SelectChangeEvent) => {
        const value = e.target.value; 
        setDateSelect(value);
        setDisableSelectDate(true);
        if (value === '1') {
            setDate(new Date());
            setEndDate(new Date());
        } else if (value === '2') {
            const yesterday = calculateDate(1);
            setDate(yesterday);
            setEndDate(yesterday);
        } else if (value === '3') {
            const lastSevenDays = calculateDate(6);
            setDate(lastSevenDays);
            setEndDate(new Date());
        } else if (value === '4') {
            const last30Days = calculateDate(29);
            setDate(last30Days);
            setEndDate(new Date());
        } else if (value === '5') {
            const date = new Date();
            const firstDayofMonth = get1stAndLastDayOfMonth(
                date.getFullYear(),
                date.getMonth(),
                1
              );
            setDate(firstDayofMonth);
            setEndDate(date);
        } else if (value === '6') {
            const date = new Date();
            const firstDayofLastMonth = get1stAndLastDayOfMonth(
                date.getFullYear(),
                date.getMonth()-1,
                1
              );
            const lastDayofMonth = get1stAndLastDayOfMonth(
                date.getFullYear(),
                date.getMonth(),
                0
            );
            setDate(firstDayofLastMonth);
            setEndDate(lastDayofMonth);
        } else {
            setDisableSelectDate(false);
        }
    }, [])
    
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Voice Dashboard' />
                    <CardContent>

                        <Grid container spacing={2} mt={2}>
                        <Grid item sm={4} xs={12}>
                            <FormControl fullWidth>
                            <InputLabel id='plan-select'>Select Date</InputLabel>
                            <Select
                                fullWidth
                                value={dateSelect}
                                id='select-date'
                                label='Select Date'
                                labelId='date-select'
                                onChange={handleDateSelect}
                                inputProps={{ placeholder: 'Select Date' }}
                            >
                                <MenuItem value="1">Today</MenuItem>
                                <MenuItem value="2">Yesterday</MenuItem>
                                <MenuItem value="3">Last 7 days</MenuItem>
                                <MenuItem value="4">Last 30 days</MenuItem>
                                <MenuItem value="5">This Month</MenuItem>
                                <MenuItem value="6">Last Month</MenuItem>
                                <MenuItem value="7">Custom Date Range</MenuItem>

                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    readOnly = {disableSelectDate}
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
                                    readOnly = {disableSelectDate}
                                    label='End Date'
                                    value={endDate}
                                    onChange={newValue => setEndDate(newValue)}
                                    renderInput={params => <TextField {...params} />}
                                />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        {/* <Grid item sm={4} xs={12} mt={2}>
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
                        </Grid> */}

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