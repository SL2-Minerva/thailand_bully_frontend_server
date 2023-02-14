import { Ref, useState, forwardRef, ReactElement, useCallback, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CardContent, { CardContentProps } from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import Repeater from 'src/@core/components/repeater'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import { format } from 'date-fns'

// ** Icons Imports
import Plus from 'mdi-material-ui/Plus'
import Close from 'mdi-material-ui/Close'
import DomainList from 'src/services/api/domains/DomainAPI'
import KeywordForm from './KeywordForm'
import axios from 'axios'
import authConfig from '../../../configs/auth'
import { API_PATH } from 'src/utils/const'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface DialogInfoProps {
  show: boolean
  setShow: any
  action: string
  current?: any
  table: any
  keywordLimit: number
}

const RepeaterWrapper = styled(CardContent)<CardContentProps>(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(5.5),
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(12)
  }
}))

const DialogCampaign = (props: DialogInfoProps) => {
  const { show, setShow, action, current, keywordLimit } = props

  const [domain, setDomain] = useState<string>('')
  const [frequency, setFrequency] = useState<string>('')
  const [date, setDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(new Date())

  const [campaignName, setCampaignName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [status, setStatus] = useState<boolean>(false)

  const [keywords, setKeywords] = useState([
    {
      id: 1,
      name: '',
      keyword_or: [''],
      keyword_and: [''],
      keyword_exclude: [''],
      colors: [''],
      keyword_or_color: [''],
      keyword_and_color: [''],
      keyword_exclude_color: ['']
    }
  ])

  function addKeyword() {
    const news = [
      ...keywords,
      {
        id: keywords.length + 1,
        name: '',
        keyword_or: [''],
        keyword_and: [''],
        keyword_exclude: [''],
        colors: [''],
        keyword_or_color: [''],
        keyword_and_color: [''],
        keyword_exclude_color: ['']
      }
    ]
    setKeywords(news)
  }

  function removeKeyword(current: any) {
    const results = keywords.filter(keyword => keyword.id !== current.id)
    setKeywords(results)
  }

  const { result_domain_list } = DomainList()
  const handleDomain = useCallback((e: SelectChangeEvent) => {
    setDomain(e.target.value)
  }, [])

  function handleCampaignName(event: any) {
    setCampaignName(event.target.value)
  }

  function handleDescription(event: any) {
    setDescription(event.target.value)
  }

  function handleFrequency(event: any) {
    setFrequency(event.target.value)
  }

  function closeDialogBox() {
    setShow(false)
  }

  const createNewCampaign = async () => {
    // const startdate = new Date(date);

    // var formattedDate =

    const input_data = {
      name: campaignName,
      organization_id: 1,
      domain_id: parseInt(domain),
      status: status ? 1 : 0,
      description: description,
      frequency: frequency,
      start_at: format(date ? date : new Date(), 'yyyy-MM-dd'),
      end_at: format(endDate ? endDate : new Date(), 'yyyy-MM-dd'),
      keywords: keywords,
      id: current.id ?? undefined
    }

    if (action === 'edit') {
      input_data.id = current.id

      axios
        .put(`${API_PATH}/campaign/update`, input_data, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
          }
        })
        .then(async response => {
          const { data, status } = response.data
          console.log('response', status, data)

          closeDialogBox()
        })
        .catch((ex: any) => {
          console.log(ex)
        })
    } else {
      axios
        .post(`${API_PATH}/campaign/create`, input_data, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
          }
        })
        .then(async response => {
          const { data, status } = response.data
          console.log(data, status)

          closeDialogBox()
        })
        .catch((ex: any) => {
          console.log(ex)
        })
    }
  }

  useEffect(() => {
    if (action === 'edit') {
      if (current) {
        console.log('current', current)
        setCampaignName(current.name)
        setDescription(current.description)
        setDomain(current.domain_id)
        setDate(new Date(current.start_at))
        setEndDate(new Date(current.end_at))
        setFrequency(current.frequency)

        if (current.keyword && current.keyword.length > 0) {
          console.log('current.keyword', current.keyword)
          setKeywords(current.keyword)
        }

        const campaignStatus = current.status === 1 ? true : false
        setStatus(campaignStatus)
      }
    } else {
      setCampaignName('')
      setDescription('')
      setDomain('')
      setFrequency('')
      setKeywords([
        {
          id: 1,
          name: '',
          keyword_or: [''],
          keyword_and: [''],
          keyword_exclude: [''],
          colors: [''],
          keyword_or_color: [''],
          keyword_and_color: [''],
          keyword_exclude_color: ['']
        }
      ])
      setDate(null)
      setEndDate(null)
      setStatus(true)
    }
  }, [current, action])

  // useEffect(() => {
  //   if (current) {
  //     console.log(current.keywords)
  //     setCampaignName(current.name)
  //     setDescription(current.description)
  //     setDomain(current.domain_id)
  //     setDate(new Date(current.start_at))
  //     setEndDate(new Date(current.end_at))
  //     setKeywords(current.keywords)
  //   }
  // }, [current])

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={closeDialogBox}
        TransitionComponent={Transition}
        onBackdropClick={closeDialogBox}
      >
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={closeDialogBox} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Close />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              {action === 'edit' ? 'Edit Campaign Information ' : 'Create Campaign Information'}
            </Typography>
          </Box>
          <div id={`campaign-master`}>
            <Grid container spacing={6} style={{ paddingLeft: '1.5rem' }}>
              <Grid item sm={12} xs={12}>
                <TextField
                  fullWidth
                  label='Campaign Name'
                  value={campaignName}
                  onChange={handleCampaignName}
                  placeholder=''
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label='Description'
                  value={description}
                  onChange={handleDescription}
                  id='textarea-outlined-controlled'
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>Select Domain</InputLabel>
                  <Select
                    fullWidth
                    value={domain}
                    id='select-domain'
                    label='Select Domain'
                    labelId='domain-select'
                    onChange={handleDomain}
                    inputProps={{ placeholder: 'Select Domain' }}
                  >
                    {(result_domain_list || []).map((domain: any, index: number) => (
                      <MenuItem key={index} value={domain?.id?.toString()}>
                        {domain.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={12} xs={12}>
                <FormControl fullWidth>
                  <TextField fullWidth label='frequency' value={frequency} onChange={handleFrequency} placeholder='' />
                </FormControl>
              </Grid>
            </Grid>
          </div>

          <div id={`repeat`}>
            <Grid item sm={12}>
              <RepeaterWrapper>
                <Repeater count={keywords.length}>
                  {(i: number) => {
                    return (
                      <KeywordForm
                        key={i}
                        value={keywords[i] ?? null}
                        indexNumber={i}
                        keywords={keywords}
                        setKeywords={setKeywords}
                        removeKeyword={removeKeyword}
                      />
                    )
                  }}
                </Repeater>

                <Grid container sx={{ mt: 4.75 }}>
                  <Grid item xs={12} sx={{ px: 0 }}>
                    {keywords?.length === keywordLimit ? (
                      ''
                    ) : (
                      <Button
                        size='small'
                        variant='contained'
                        startIcon={<Plus fontSize='small' />}
                        onClick={addKeyword}
                      >
                        Add Keyword
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </RepeaterWrapper>
            </Grid>

            <Grid container spacing={6} mt={1} style={{ paddingLeft: '1.5rem' }}>
              <Grid item sm={12} xs={12}>
                {/*<TextField*/}
                {/*  fullWidth*/}
                {/*  multiline*/}
                {/*  label='Exclude Campaign'*/}
                {/*  id='textarea-outlined-controlled'*/}
                {/*/>*/}
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label='Start Date'
                      value={date}
                      onChange={newValue => setDate(newValue)}
                      renderInput={params => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label='End Date'
                      value={endDate}
                      onChange={newValue => setEndDate(newValue)}
                      renderInput={params => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>

              <Grid item sm={6} xs={12} mt={3}>
                <FormControl>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={status}
                        onChange={e => {
                          setStatus(e.target.checked)
                        }}
                      />
                    }
                    label='Campaign Status : '
                    labelPlacement='start'
                  />
                </FormControl>
              </Grid>
              {action === 'edit' && (
                <Grid item sm={6} xs={12}>
                  <div> {` Last update: ${new Date(current.updated_at).toLocaleString('th')}`} </div>
                </Grid>
              )}

              <Grid item sm={6} xs={12} mt={4}>
                {/*<b>Update Date:</b> {updateDate?.toDateString() + ' ' + updateDate?.toLocaleTimeString()}*/}
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='contained' sx={{ mr: 2 }} onClick={createNewCampaign}>
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={closeDialogBox}>
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default DialogCampaign
