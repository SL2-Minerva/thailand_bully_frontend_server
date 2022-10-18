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
import DomainList from 'src/services/api/domains/DomainAPI'
import CreateCampaign from 'src/services/api/campaign/CampaignAPI'

// import KeywordRepeater from './KeywordRepeater'


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

   //repeat input field
   const [keywords, setKeyword] = useState([{ value: null }]);
   const [mustHaveKeywords, setMustHaveKeyword] = useState<string[]>(['']);
   const [excludeKeywords, setExcludeKeyword] = useState([{ value: null }]);

   const [ campaign_name, set_campaign_name ] = useState<string>('');
   const [ description, set_description ] = useState<string>('');
  
   //  const [ keyword_or, set_keyword_or] = useState([]);
  //  const [ keyword_and, set_keyword_and] = useState([]);
  //  const [ keyword_exclude, set_keyword_exclude] = useState([]);


   const { result_domain_list } = DomainList();
   const { create_campaign } = CreateCampaign();

  //  const [countKeyword, setCountKeyword ] = useState<number>(1)

   const handleDomain = useCallback((e: SelectChangeEvent) => {
        setDomain(e.target.value)
    }, [])

    function handleCampaignName(event: any) {
      set_campaign_name(event.target.value);
    }

    function handleDescription(event: any) {
      set_description(event.target.value);
    }

   // ** Deletes form
   const deleteForm = (e: SyntheticEvent) => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-wrapper').remove()
  }

  function handleChangeKeyword(i: number, event: any) {
    const values = [...keywords];
    values[i].value = event.target.value;
    setKeyword(values);
  }

  function handleAddKeyword() {
    const values = [...keywords];
    values.push({ value: null });
    setKeyword(values);
  }

  function handleRemoveKeyword(i: number) {
    const values = [...keywords];
    values.splice(i, 1);
    setKeyword(values);
  }

  function handleChangeMustHaveKeyword(i: number, event: any) {
    const values = [...mustHaveKeywords];
    values[i] = event.target.value;
    setMustHaveKeyword(values);
  }

  function handleAddMustHaveKeyword() {
    const values = [...mustHaveKeywords];
    values.push('');
    setMustHaveKeyword(values);
  }

  function handleRemoveMustHaveKeyword(i: number) {
    const values = [...mustHaveKeywords];
    values.splice(i, 1);
    setMustHaveKeyword(values);
  }
  
  function handleChangeExcludeKeyword(i: number, event: any) {
    const values = [...excludeKeywords];
    values[i].value = event.target.value;
    setExcludeKeyword(values);
  }

  function handleAddExcludeKeyword() {
      const values = [...excludeKeywords];
      values.push({ value: null });
      setExcludeKeyword(values);  
  }

  function handleRemoveExcludeKeyword(i: number) {
    const values = [...excludeKeywords];
    values.splice(i, 1);
    setExcludeKeyword(values);
  }

  function closeDialogBox () {
    setShow(false);
    setDomain('');
  }

  const createNewCampaign = async () => {
    
    console.log('keyyyyyy',keywords, mustHaveKeywords, excludeKeywords)

    let keywordArray = [];


    
    const input_data = {
      "name" : campaign_name, 
      "organization_id" : 1, 
      "domain_id" : parseInt(domain), 
      "status" : 1

    }
    // try {
    //   create_campaign(input_data)
    //     .then(() => {
    //       console.log('create success');
          
    //     })
    //     .catch((ex : any) => {
    //       console.log(ex) 
    //     });
    // } catch (ex) {}

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
        onClose={closeDialogBox}
        TransitionComponent={Transition}
        onBackdropClick={closeDialogBox}
      >
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton
            size='small'
            onClick={closeDialogBox}
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
              <TextField fullWidth  label='Campaign Name' value= {campaign_name}
                    onChange = {handleCampaignName} placeholder='' />
            </Grid>
            <Grid item sm={12} xs={12}>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label='Description'
                    value= {description}
                    onChange = {handleDescription}
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

                  {
                    (result_domain_list || []).map((domain : any, index : number) => (
                      <MenuItem key={index} value={domain?.id?.toString()}>{domain.name}</MenuItem>
                    ))
                  }
                  
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
                             <Grid item xs={12} sx={{ px: 4 }}>
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
                                  placeholder='Enter Label'
                                  label = "Label"
                                />
                              </Grid>

                              <Grid item sm={4} xs={12} sx={{ px: 4 }}>
                                <Typography
                                  variant='subtitle2'
                                  className='col-title'
                                  sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
                                >
                                  Keyword 
                                </Typography>
            
                                
                                {keywords.map((keyword, index) => {
                                 return (
                                    <span key={`${keyword}-${index}`} style= {{display: 'flex'}}>
                                        <TextField
                                          fullWidth
                                          multiline
                                          size='small'
                                          sx={{ mt: 3.5 }}
                                          placeholder='คำที่ควรมี'
                                          label = "คำที่ควรมี"
                                          value={keyword.value || ""}
                                          onChange = {e => handleChangeKeyword(index, e)}
                                        />
                                        <Close fontSize='small' sx={{ mt: 5.5}} onClick={() => handleRemoveKeyword(index)}/>
                                        <br/>
                                    </span>
                                    
                                  );
                                })}

                                <Button
                                  sx ={{ mt: '3%', p: '0px' }}
                                  size='small'
                                  variant='contained'
                                  startIcon={<Plus fontSize='small' />}
                                  onClick={() => handleAddKeyword()}
                                >
                                </Button>
                              </Grid>

                              <Grid item sm={4} xs={12} sx={{ px: 4 }}>
                              {mustHaveKeywords.map((keyword, index) => {
                                 return (
                                    <span key={`${keyword}-${index}`} style= {{display: 'flex'}}>
                                        <TextField
                                          fullWidth
                                          multiline
                                          size='small'
                                          sx={{ mt: 3.5}}
                                          placeholder='คำที่ต้องมี'
                                          label = "คำที่ต้องมี"
                                          value={keyword}
                                          onChange = {e => handleChangeMustHaveKeyword(index, e)}
                                        />
                                        <Close fontSize='small' sx={{ mt: 5.5}} onClick={() => handleRemoveMustHaveKeyword(index)}/>
                                        <br/>
                                    </span>
                                    
                                  );
                                })}

                                <Button
                                  sx ={{ mt: '3%', p: '0px' }}
                                  size='small'
                                  variant='contained'
                                  startIcon={<Plus fontSize='small' />}
                                  onClick={() => handleAddMustHaveKeyword()}
                                >
                                </Button>
                              </Grid>

                              <Grid item sm={4} xs={12} sx={{ px: 4 }}>
                                {excludeKeywords.map((keyword, index) => {
                                 return (
                                    <span key={`${keyword}-${index}`} style= {{display: 'flex'}}>
                                        <TextField
                                          fullWidth
                                          multiline
                                          size='small'
                                          sx={{ mt: 3.5 }}
                                          placeholder='ที่ห้ามมี'
                                          label = "ที่ห้ามมี"
                                          value={keyword.value || ""}
                                          onChange = {e => handleChangeExcludeKeyword(index, e)}
                                        />
                                        <Close fontSize='small' sx={{ mt: 5.5}} onClick={() => handleRemoveExcludeKeyword(index)}/>
                                        <br/>
                                    </span>
                                    
                                  );
                                })}

                                <Button
                                  sx ={{ mt: '3%', p: '0px' }}
                                  size='small'
                                  variant='contained'
                                  startIcon={<Plus fontSize='small' />}
                                  onClick={() => handleAddExcludeKeyword()}
                                >
                                </Button>
                              </Grid>

                              <Grid item xs={12} sx={{ px: 4 }}>
                              {/* <RepeaterWrapper>
                                  <KeywordRepeater count={countKeyword}>
                                    <Tag key={j} className='repeater-wrapper' {...(i !== 0 ? { in: true } : {})}>
                                      <RepeatingContent item xs={12}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                size='small'
                                                sx={{ mt: 3.5 }}
                                                placeholder='ที่ห้ามมี'
                                                label = "ที่ห้ามมี"
                                            />
                                        </RepeatingContent>
                                    </Tag>
                                  </KeywordRepeater>
                                </RepeaterWrapper> */}
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
