import { useEffect, useState } from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { useRouter } from 'next/router'
import { ContentHomepageList } from 'src/services/api/content/ContentAPI'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Contents from './Contents'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const ContentPage = () => {
  const router = useRouter()
  const [value, setValue] = useState(0)
  const { resultContents, errorContents } = ContentHomepageList(value + 1)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (errorContents) {
      window.localStorage.removeItem('userData')
      window.localStorage.clear()
      localStorage.clear()
      router.push('/login')
      window.location.reload()
    }
  }, [errorContents])

  return (
    <Grid container spacing={3}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='contents tabs'>
            <Tab label='News' {...a11yProps(0)} />
            <Tab label='Announcements' {...a11yProps(1)} />
            <Tab label='Contents' {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {resultContents?.length > 0 ? (
            <Contents resultContentList={resultContents} />
          ) : (
            <Typography sx={{ display: 'flex', justifyContent: 'center', color: 'grey' }} variant='h6' mt={5}>
              There is no data.
            </Typography>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {resultContents?.length > 0 ? (
            <Contents resultContentList={resultContents} />
          ) : (
            <Typography sx={{ display: 'flex', justifyContent: 'center', color: 'grey' }} variant='h6' mt={5}>
              There is no data.
            </Typography>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {resultContents?.length > 0 ? (
            <Contents resultContentList={resultContents} />
          ) : (
            <Typography sx={{ display: 'flex', justifyContent: 'center', color: 'grey' }} variant='h6' mt={5}>
              There is no data.
            </Typography>
          )}
        </CustomTabPanel>
      </Box>
    </Grid>
  )
}

export default ContentPage
