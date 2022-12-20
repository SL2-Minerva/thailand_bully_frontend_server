import { Avatar, Card, CardHeader, Grid, Typography } from "@mui/material";
import { useState } from "react";
import AccountDetail from "./AccountDetail";

const AccountList = ({resultKeywords} : {resultKeywords: any}) => {
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [current, setCurrent] = useState<any>({})

    return (
        <Card sx={{ maxHeight: 500,minHeight: 500, overflow: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <CardHeader
                    title='Accounts'
                    titleTypographyProps={{ variant: 'h6' }}
                />
            </div>
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