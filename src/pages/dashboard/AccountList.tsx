import { Avatar, Button, Card, CardHeader, Grid, Typography } from "@mui/material";
import { CloseCircleOutline } from "mdi-material-ui";
import { useState } from "react";
import AccountDetail from "./AccountDetail";

const AccountList = ({resultKeywords} : {resultKeywords: any}) => {
    const [showDetail, setShowDetail] = useState<boolean>(false);

    return (
        <Card sx={{ maxHeight: 500,minHeight: 500, overflow: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <CardHeader
                    title='Accounts'
                    titleTypographyProps={{ variant: 'h6' }}
                />
                {
                    showDetail ? 
                    <Button style={{ marginTop: '20px', marginRight: '10px' }} 
                        color="primary" onClick={()=>{setShowDetail(false)}} size="small">
                        <CloseCircleOutline fontSize='large'/>
                    </Button>
                    :
                    ""
                }
            </div>
            {
                showDetail ? 
                <AccountDetail />
                :
                <>
                    {
                        (resultKeywords||[])?.map((keyword: any, index:any) => {

                            return(
                                <div key={index}>
                                    <Card sx={{ margin: '1rem' }} onClick={()=>{setShowDetail(true)}}>
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
                </>
            }
                
        </Card>
    )
}

export default AccountList