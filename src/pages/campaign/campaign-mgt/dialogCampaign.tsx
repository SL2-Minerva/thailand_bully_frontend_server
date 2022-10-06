// ** React Imports
import { Ref, useState, forwardRef, ReactElement, useCallback, SyntheticEvent, useEffect } from 'react'

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import Grid, { GridProps } from '@mui/material/Grid'
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
import Collapse from '@mui/material/Collapse'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'

// ** Icons Imports
import Plus from 'mdi-material-ui/Plus'
import Close from 'mdi-material-ui/Close'



const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface DialogInfoProps {
    show : boolean
    setShow: any
    action : string
}

const RepeaterWrapper = styled(CardContent)<CardContentProps>(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(5.5),
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(12)
  }
}))

const RepeatingContent = styled(Grid)<GridProps>(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-1.5rem',
    position: 'absolute'
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.secondary
  },
  [theme.breakpoints.down('lg')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}))

const KeyWordAction = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 1),
  borderLeft: `1px solid ${theme.palette.divider}`
}))


const DialogCampaign = (props: DialogInfoProps) => {
   const { show, setShow, action } = props
   const [domain, setDomain] = useState<string>('')
   const [count, setCount] = useState<number>(1)
   const [date, setDate] = useState<Date | null>(new Date())
   const [endDate, setEndDate] = useState<Date | null>(new Date())
   const [updateDate, setUpdatedDate ] = useState<Date>(new Date())

   const handleDomain = useCallback((e: SelectChangeEvent) => {
        setDomain(e.target.value)
    }, [])

   // ** Deletes form
   const deleteForm = (e: SyntheticEvent) => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-wrapper').remove()
  }

  useEffect(() => {
    const timer = setInterval(()=>setUpdatedDate(new Date()), 1000 )
    
    return function cleanup() {
        clearInterval(timer)
    }

  });

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton
            size='small'
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Close />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
               {
                  action === 'edit' ?  'Edit Campaign Information ': 'Create Campaign Information'
               }
               
            </Typography>
          </Box>
          <Grid container spacing={6} style={{ paddingLeft: '1.5rem' }}>
            <Grid item sm={12} xs={12}>
              <TextField fullWidth  label='Campaign Name' placeholder='' />
            </Grid>
            <Grid item sm={12} xs={12}>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label='Description'
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
                    <MenuItem value=''>Domain</MenuItem>
                    <MenuItem value='1'>Domain 1</MenuItem>
                    <MenuItem value='2'>Domain 2</MenuItem>
                    <MenuItem value='3'>Domain 3</MenuItem>
                    <MenuItem value='4'>Domain 4</MenuItem>
                  </Select>
                </FormControl>
            </Grid>
            </Grid>

            <Grid item sm={12}>
              <RepeaterWrapper>
                <Repeater count={count}>
                  {(i: number) => {
                    const Tag = i === 0 ? Box : Collapse

                    return (
                      <Tag key={i} className='repeater-wrapper' {...(i !== 0 ? { in: true } : {})}>
                        <RepeatingContent item xs={12}>
                            <Grid container sx={{ py: 4, width: '100%' }}>
                              <Grid item sm={6} xs={12} sx={{ px: 4 }}>
                                <Typography
                                  variant='subtitle2'
                                  className='col-title'
                                  sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
                                >
                                  Keyword 
                                </Typography>
            
                                <TextField
                                  fullWidth
                                  multiline
                                  size='small'
                                  sx={{ mt: 3.5 }}
                                  placeholder='Enter included keyword'
                                  label = "Include Keyword"
                                />
                              </Grid>
                              <Grid item sm={6} xs={12} sx={{ px: 4 }}>
                                <TextField
                                  fullWidth
                                  multiline
                                  size='small'
                                  sx={{ mt: 3.5 }}
                                  placeholder='Enter excluded keyword'
                                  label = "Exclude Keyword"
                                />
                              </Grid>
                              
                              
                            </Grid>
                            <KeyWordAction>
                              <IconButton size='small' onClick={deleteForm}>
                                <Close fontSize='small' />
                              </IconButton>
                            </KeyWordAction>
                          </RepeatingContent>
                      </Tag>
                    )
                  }}
                </Repeater>

                <Grid container sx={{ mt: 4.75 }}>
                  <Grid item xs={12} sx={{ px: 0 }}>
                    <Button
                      size='small'
                      variant='contained'
                      startIcon={<Plus fontSize='small' />}
                      onClick={() => setCount(count + 1)}
                    >
                      Add Keyword
                    </Button>
                  </Grid>
                </Grid>
              </RepeaterWrapper>
            </Grid>
            
            <Grid container spacing={6} mt={1} style={{ paddingLeft: '1.5rem' }}>
              <Grid item sm={12} xs={12}>
                  <TextField
                      fullWidth
                      multiline
                      label='Exclude Campaign'
                      id='textarea-outlined-controlled'
                      />
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
                      <FormControlLabel control={<Switch defaultChecked />} label='Campaign Status : ' labelPlacement='start' />
                </FormControl>
              </Grid>

              <Grid item sm={6} xs={12} mt={4}>
                <b>Update Date:</b> {updateDate?.toDateString() + " " + updateDate?.toLocaleTimeString()}
              </Grid>

          </Grid>
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='contained' sx={{ mr: 2 }} onClick={() => setShow(false)}>
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default DialogCampaign
