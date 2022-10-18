
// import {Ref, useState, forwardRef, ReactElement, useCallback, SyntheticEvent, useEffect} from 'react'

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// import Card from '@mui/material/Card'
// import Switch from '@mui/material/Switch'
// import Dialog from '@mui/material/Dialog'
// import Button from '@mui/material/Button'

import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// import FormControl from '@mui/material/FormControl'
// import Fade, { FadeProps } from '@mui/material/Fade'
// import DialogContent from '@mui/material/DialogContent'
// import DialogActions from '@mui/material/DialogActions'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import InputLabel from '@mui/material/InputLabel'
// import Select, { SelectChangeEvent } from '@mui/material/Select'
// import MenuItem from '@mui/material/MenuItem'
// import CardContent, { CardContentProps } from '@mui/material/CardContent'

import { styled } from '@mui/material/styles'

// import Repeater from 'src/@core/components/repeater'
// import Collapse from '@mui/material/Collapse'
// import LocalizationProvider from '@mui/lab/LocalizationProvider'
// import AdapterDateFns from '@mui/lab/AdapterDateFns'
// import DatePicker from '@mui/lab/DatePicker'

// ** Icons Imports
// import Plus from 'mdi-material-ui/Plus'

import Close from 'mdi-material-ui/Close'

// import DomainList from 'src/services/api/domains/DomainAPI'
// import CreateCampaign from 'src/services/api/campaign/CampaignAPI'

const KeyWordAction = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 1),
  borderLeft: `1px solid ${theme.palette.divider}`
}))

interface KeywordsProps {
  indexNumber: number,
  keywords: any, 
  setKeywords: any,
  handleKeyword: any
}

const KeywordForm = ( props: KeywordsProps ) => {

  const { indexNumber, keywords, setKeywords,  handleKeyword } = props;

  function handleChangeLabel(i: number, event: any) {
    
    const values = [...keywords];
    console.log("values", values);
    values[i].label = event.target.value;
    setKeywords(values);
  }

  return (
    <>
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
                value = {keywords[indexNumber]?.label || ""}
                onChange ={e => handleChangeLabel(indexNumber, e)}
              />
            </Grid>

            <Grid item sm={4} xs={12} sx={{ px: 4 }}>
              
              {/* {input_keyword[i]?.keywords.map((keyword, index) => {
                return (
                  <span key={`${keyword}-${index}`} style= {{display: 'flex'}}>
                      <TextField
                        fullWidth
                        multiline
                        size='small'
                        sx={{ mt: 3.5 }}
                        placeholder='คำที่ควรมี'
                        label = "คำที่ควรมี"
                        value={input_keyword[i]?.keywords[index] || ""}
                        onChange = {e => handleChangeKeywords(i, index, e)}
                      />
                      <Close fontSize='small' sx={{ mt: 5.5}} onClick={() => handleRemoveKeywords(i, index)}/>
                      <br/>
                  </span>
                  
                );
              })}

              <Button
                sx ={{ mt: '3%', p: '0px' }}
                size='small'
                variant='contained'
                startIcon={<Plus fontSize='small' />}
                onClick={() => handleAddKeywords(i)}
              >
              </Button> */}
            </Grid>

            {/* <Grid item sm={4} xs={12} sx={{ px: 4 }}>
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
                        value={keyword.value || ""}
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
            </Grid> */}
 
          </Grid>
        <KeyWordAction>
          <IconButton size='small'>
            <Close fontSize='small' onClick={() => { handleKeyword('remove', indexNumber) }} />
          </IconButton>
        </KeyWordAction>
    </>

  )
}
export default KeywordForm;
