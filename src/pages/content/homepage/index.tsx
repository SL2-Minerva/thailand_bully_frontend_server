import { useEffect, useState } from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { useRouter } from 'next/router'
import { GetContentLists } from 'src/services/api/content/ContentAPI'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Contents from './Contents'
import ContentAnnouncement from './ContentAnnouncement'
import Translations from 'src/layouts/components/Translations'

// import ContentAnnouncement from './ContentAnnouncement'

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

const ContentPage = () => {
  const router = useRouter()
  const [value, setValue] = useState(0)
  const [contentId, setContentId] = useState(2)
  const { resultContentList, errorResultContentList } = GetContentLists(contentId)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      setContentId(2)
    } else if (newValue === 1) {
      setContentId(1)
    } else if (newValue === 2) {
      setContentId(3)
    }
    setValue(newValue)
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  useEffect(() => {
    if (errorResultContentList) {
      window.localStorage.removeItem('userData')
      window.localStorage.clear()
      localStorage.clear()
      router.push('/login')
      window.location.reload()
    }
  }, [errorResultContentList])

  return (
    <Grid container spacing={3}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='contents tabs'>
            <Tab label={<Translations text='Announcement' />} {...a11yProps(0)} />
            <Tab label={<Translations text='News' />} {...a11yProps(1)} />
            <Tab label={<Translations text='FAQ' />} {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {resultContentList?.length > 0 ? (

            <ContentAnnouncement resultContentList={resultContentList} />
            
            // <Contents resultContentList={resultContentList} />
          ) : (
            <Typography sx={{ display: 'flex', justifyContent: 'center', color: 'grey' }} variant='h6' mt={5}>
              There is no data.
            </Typography>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {resultContentList?.length > 0 ? (
            <Contents resultContentList={resultContentList} />
          ) : (
            <Typography sx={{ display: 'flex', justifyContent: 'center', color: 'grey' }} variant='h6' mt={5}>
              There is no data.
            </Typography>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {resultContentList?.length > 0 ? (
            <Contents resultContentList={resultContentList} />
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
