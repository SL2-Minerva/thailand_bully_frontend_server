import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { Card, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useCallback, useState } from "react";
import SourceService from "src/services/api/source/SourceApi";
import { StyledTooltip } from "./overall";
import { Information } from "mdi-material-ui";

const WordCloudChannel = ({resultWordClouds, chartId} : {resultWordClouds: any, chartId : string}) => {
    const [ platformId, setPlatformId ] = useState<string>("1")
    const { result_source_list  } = SourceService();

    const handleSelectList = useCallback((e: SelectChangeEvent) => {
        setPlatformId(e.target.value)
    }, [])

    return (
        <Card sx={{ maxHeight: 500,minHeight: 500 }}>
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader
                    title='Word Clouds'
                    titleTypographyProps={{ variant: 'h6' }}
                />
                <StyledTooltip arrow title={chartId}>
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
                <ReactWordcloud words={resultWordClouds?.word_clouds_platform || []} />
            </div>
        </Card>
    )
}

export default WordCloudChannel