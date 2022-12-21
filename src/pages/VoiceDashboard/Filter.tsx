import { Box, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { CampaignList } from "src/services/api/campaign/CampaignAPI"
import { calculateDate, get1stAndLastDayOfMonth, PickerProps } from "../dashboard/overall"

import DatePicker from 'react-datepicker'
import format from 'date-fns/format'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { forwardRef, useCallback } from "react";

interface Props {
    date : Date | null
    setDate: any
    endDate : Date | null
    setEndDate : any
    period : string
    setPeriod: any
    dateSelect : string
    setDateSelect : any
    campaign : string
    setCampaign : any
    tilte : string
}

const Filter = (props : Props) => {
    const { date, setDate, endDate, setEndDate, setPeriod, dateSelect, setDateSelect, campaign, setCampaign, tilte } = props;
    const { resultCampaiganList } = CampaignList();

    const handleDateSelect = (e:any) => {
        const value = e.target?.value ? e.target?.value : e; 
        setDateSelect(value);
        if (value === '1') {
            setPeriod('daily');
            setDate(new Date());
            setEndDate(new Date());
        } else if (value === '2') {
            const yesterday = calculateDate(1);
            setPeriod('yesterday');
            setDate(yesterday);
            setEndDate(yesterday);
        } else if (value === '3') {
            setPeriod('last7days');
            const lastSevenDays = calculateDate(6);
            setDate(lastSevenDays);
            setEndDate(new Date());
        } else if (value === '4') {
            setPeriod('last30days');
            const last30Days = calculateDate(29);
            setDate(last30Days);
            setEndDate(new Date());
        } else if (value === '5') {
            setPeriod('thismonth');
            const date = new Date();
            const firstDayofMonth = get1stAndLastDayOfMonth(
                date.getFullYear(),
                date.getMonth(),
                1
              );
            setDate(firstDayofMonth);
            setEndDate(date);
        } else if (value === '6') {
            setPeriod('lastmonth');
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
            setPeriod('customrange');
        }
    }

    const handleSelectList = useCallback((e: SelectChangeEvent) => {
        setCampaign(e.target.value)
    }, [])

    const handleOnChangeDate = (dates: any) => {
        handleDateSelect("7")
        const [start, end] = dates
        setDate(start)
        setEndDate(end)
      }

    const CustomInput = forwardRef((props: PickerProps, ref) => {
        const startDate = format(props.start, 'dd/MM/yyyy')
        const endDate = props.end !== null ? ` - ${format(props.end, 'dd/MM/yyyy')}` : null
    
        const value = `${startDate}${endDate !== null ? endDate : ''}`
    
        return <FormControl fullWidth><TextField inputRef={ref} label={props.label || ''} {...props} value={value} /></FormControl>
    })

    return (
        <Grid item xs={12}>
            <Card>
                <CardHeader title={tilte}/>
                <CardContent>

                    <Grid container spacing={2} mt={2}>
                    <Grid item sm={4} xs={12}>
                        <FormControl fullWidth>
                        <InputLabel id='plan-select'>Select Period</InputLabel>
                        <Select
                            fullWidth
                            value={dateSelect}
                            id='select-date'
                            label='Select Period'
                            labelId='date-select'
                            onChange={handleDateSelect}
                            inputProps={{ placeholder: 'Select Period' }}
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
                        <Box>
                            <DatePickerWrapper>
                                <DatePicker
                                selectsRange
                                monthsShown={2}
                                endDate={endDate}
                                selected={date}
                                startDate={date}
                                shouldCloseOnSelect={false}
                                id='date-range-picker-months'
                                onChange={handleOnChangeDate}
                                customInput={
                                    <CustomInput
                                    label='Period Range'
                                    end={endDate as Date | number}
                                    start={date as Date | number}
                                    />
                                }
                                />
                            </DatePickerWrapper>
                        </Box>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <FormControl fullWidth>
                        <InputLabel id='plan-select'>Select Campaign</InputLabel>
                        <Select
                            fullWidth
                            value={campaign}
                            id='select-campaign'
                            label='Select campaign'
                            labelId='campaign-select'
                            onChange={(e) => {handleSelectList(e)}}
                            inputProps={{ placeholder: 'Select Campaign' }}
                        >
                            {
                            resultCampaiganList && resultCampaiganList.map((item: any, index: number) => {
                                return (
                                <MenuItem key={index} value={item.id}>
                                    {item.name}
                                </MenuItem>
                                )
                            })
                            }
                        </Select>
                        </FormControl>
                    </Grid>

                    </Grid>

                </CardContent>
            </Card>
        </Grid>
    )
}

export default Filter;