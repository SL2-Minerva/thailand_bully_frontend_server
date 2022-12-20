import { Card, CardHeader, Grid } from "@mui/material"

const SentimentDashboard = () => {
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Sentiment Dashboard' />
                </Card>
            </Grid>
        </Grid> 
    )
}

export default SentimentDashboard