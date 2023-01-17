import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { Card, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useCallback, useState } from "react";
import SourceService from "src/services/api/source/SourceApi";
import { StyledTooltip } from "./overall";
import { Information } from "mdi-material-ui";
import { GetWordCloudsPlatform } from "src/services/api/dashboards/overall/overallDashboardApi";

const WordCloudChannel = ({params, chartId} : {params: any, chartId : string}) => {
    const [ platformId, setPlatformId ] = useState<string>("1")
    const { result_source_list  } = SourceService();
    const { resultWordCloudsPlatform } = GetWordCloudsPlatform(params?.campaign, params?.platformId, params?.date, params?.endDate, params?.period, params?.previousDate, params?.previousEndDate);

    const handleSelectList = useCallback((e: SelectChangeEvent) => {
        setPlatformId(e.target.value)
    }, [])

    const reportNo = '1.2.023';

    const chartTitle = chartId + ", Report Level 2(" + reportNo + ")";

    return (
        <Card sx={{ maxHeight: 500,minHeight: 500 }}>
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader
                    title='Word Clouds By Channel'
                    titleTypographyProps={{ variant: 'h6' }}
                />
                <StyledTooltip arrow title={chartTitle}>
                    <Information style={{marginTop: '22px', fontSize: '29px'}} />
                </StyledTooltip>
            </span>
            <Grid container spacing={2}>
                <Grid item sm={6} xs={6} ml={4}>
                    <FormControl fullWidth>
                        <InputLabel id='plan-select'>Select Platform</InputLabel>
                        <Select
                            fullWidth
                            value={platformId}
                            id='select-platform'
                            label='Select Channel'
                            labelId='platform-select'
                            onChange={(e) => {handleSelectList(e)}}
                            inputProps={{ placeholder: 'Select Channel' }}
                        >
                            {
                                result_source_list && result_source_list.map((item: any, index: number) => {
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
            <div style={{ height: 400, width: 600 }}>
                <ReactWordcloud words={resultWordCloudsPlatform?.word_clouds_platform || []} />
            </div>
        </Card>
    )
}

export default WordCloudChannel