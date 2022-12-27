import { Avatar, Card, CardHeader, Grid, Typography } from "@mui/material";
import { Information } from "mdi-material-ui";
import { useState } from "react";
import AccountDetail from "./AccountDetail";
import { StyledTooltip } from "./overall";

const AccountList = ({resultKeywords, chartId} : {resultKeywords: any, chartId : string}) => {
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [current, setCurrent] = useState<any>({})

    return (
        <Card sx={{ maxHeight: 500,minHeight: 500, overflow: 'auto' }}>
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader
                    title='Accounts'
                    titleTypographyProps={{ variant: 'h6' }}
                />
                <StyledTooltip arrow title={chartId}>
                    <Information style={{marginTop: '22px', fontSize: '29px'}} />
                </StyledTooltip>
            </span>
                {
                    (resultKeywords||[])?.map((keyword: any, index:any) => {

                        return(
                            <div key={index}>
                                <Card sx={{ margin: '1rem' }} onClick={()=>{setShowDetail(true); setCurrent({})}}>
                                    <Grid container spacing={2}>

                                        <Grid item sm={2} xs={2}>
                                            <Avatar sx={{ height: 50, width: 50, marginTop: '1rem', ml: 2}}/>
                                        </Grid>
                                        <Grid item sm={7} xs={7}>
                                            <Typography variant="h6">User {index + 1}</Typography>
                                            <Typography variant="subtitle1">
                                                {keyword.message} messages
                                            </Typography>
                                            <Typography variant="subtitle1">
                                                {keyword.engagement} Engagements/posts
                                            </Typography>
                                        </Grid>
                                        <Grid item sm={2} xs={2}>
                                        <img src={"/images/logos/facebook-round.png"} alt="icon" style={{ height: 50, width: 50, marginTop: '1rem' }}/>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </div>
                        )
                    })
                }
                <AccountDetail 
                show={showDetail}
                setShow={setShowDetail}
                current={current}
                />
                
        </Card>
    )
}

export default AccountList