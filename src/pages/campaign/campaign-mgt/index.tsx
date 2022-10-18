// ** React Imports
import { useState, useCallback } from 'react'

// ** MUI Imports
import { Grid , Card, CardHeader, CardContent } from "@mui/material";
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Switch from '@mui/material/Switch'
import { PencilOutline } from 'mdi-material-ui'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import DatePicker from '@mui/lab/DatePicker'
import MenuItem from '@mui/material/MenuItem'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DialogCampaign from './dialogCampaign';
import { CampaignList } from 'src/services/api/campaign/CampaignAPI';
import DomainList from 'src/services/api/domains/DomainAPI';

const CampaignManagement = () => {
  const [ showEdit , setShowEdit ] = useState<boolean>(false)
  const [ showCreate, setShowCreate ] = useState<boolean>(false)

  // const [campaignName, setCampaignName] = useState<string>('')

  const [campaignName] = useState<string>('')

  const [organization, setOrganization] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [date, setDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(new Date())

  // const [tableData, setTableData ] = useState(rows);

  const {resultCampaiganList} = CampaignList();
  const {result_domain_list} = DomainList();

  const toggleCreate = () => setShowCreate(!showCreate)

  const handleOrganization = useCallback((e: SelectChangeEvent) => {
    setOrganization(e.target.value)
  }, [])

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }, [])

  // handle toggle status 
  // function handleChange(i: number, event: any) {
  //   const values = [...tableData];
  //   values[i].status = event.target.checked;
  //   setTableData(values);
  // }

  return (
    <Grid container spacing={6}>
      <Grid item md={12} xs={12}>
        <Card>
        <CardHeader title='Campaign Management' />
        <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <TextField id='campaign' label='Campaign Name' value={campaignName} />
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>Select Organization</InputLabel>
                  <Select
                    fullWidth
                    value={organization}
                    id='select-organization'
                    label='Select Organization'
                    labelId='organization-select'
                    onChange={handleOrganization}
                    inputProps={{ placeholder: 'Select Organization' }}
                  >
                    <MenuItem value=''>Organization Name </MenuItem>
                    <MenuItem value='1'>Oragnization 1</MenuItem>
                    <MenuItem value='2'>Oragnization 2</MenuItem>
                    <MenuItem value='3'>Oragnization 3</MenuItem>
                    <MenuItem value='4'>Oragnization 4</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Select Status</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'
                    onChange={handleStatusChange}
                    inputProps={{ placeholder: 'Select Status' }}
                  >
                    <MenuItem value=''>Select Status</MenuItem>
                    <MenuItem value='pending'>Pending</MenuItem>
                    <MenuItem value='active'>Active</MenuItem>
                    <MenuItem value='inactive'>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={6} mt={2}>
              <Grid item sm={4} xs={12}>
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
              <Grid item sm={4} xs={12}>
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
              <Grid item sm={4} xs={12} mt={2}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        
                  <Button sx={{ mb: 2 }} onClick={()=>{console.log("search")}} variant='contained'>
                    search
                  </Button>
                </Box>
              </Grid>
            </Grid>

          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
              <TableContainer component={Paper}>
                  <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'right' }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                      
                          <Button sx={{ mb: 2 }} onClick={toggleCreate} variant='contained'>
                              Add
                          </Button>
                      </Box>
                  </Box>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                      <TableHead>
                      <TableRow>
                          <TableCell>Campaign Name</TableCell>
                          <TableCell align='center'>Keyword</TableCell>
                          <TableCell align='center'>Domain</TableCell>
                          <TableCell align='center'>Organization</TableCell>
                          <TableCell align='center'>Status</TableCell>
                          <TableCell align='center'>Action</TableCell>
                      </TableRow>
                      </TableHead>
                      <TableBody>
                      {(resultCampaiganList || []).map((campaignList : any, index : number) => (
                          <TableRow
                          key={index}
                          sx={{
                              '&:last-of-type td, &:last-of-type th': {
                              border: 0
                              }
                          }}
                          >
                          <TableCell component='th' scope='row'>
                              {campaignList.name}
                          </TableCell>
                          <TableCell align='center'>
                            {
                              ((campaignList.keyword || []).map((keyword: any, i : number) => (
                                <div key={i}>
                                  <span>
                                    <b>
                                      {keyword.name} : 
                                    </b> 
                                    { " " + keyword.keyword_or + ", " + keyword.keyword_and + ", " + keyword.keyword_exclude }
                                   </span>
                                </div>
                              )) )
                            }
                            
                          </TableCell>
                          <TableCell align='center'>
                            {
                              ((result_domain_list || []).map((domain: any, domainIndex : number) => (
                                  <>
                                    {
                                      domain.id === campaignList.domain_id &&
                                      <span key={domainIndex}>
                                         {domain.name}
                                      </span>
                                    }
                                  </>
                              )))
                            }
                          </TableCell>
                          <TableCell align='center'>{campaignList.organization}</TableCell>
                          <TableCell align='center'>
                              {/* <Switch key={index} checked={true} onChange={ e =>handleChange(index, e) }/> */}
                              <Switch checked/>
                          </TableCell>
                          <TableCell align='center'>
                              <PencilOutline onClick={()=> { setShowEdit(true) }}/>
                          </TableCell>
                          </TableRow>
                      ))}
                      </TableBody>
                  </Table>
              </TableContainer>
              
            </CardContent>
        </Card>
          <DialogCampaign show={showEdit} setShow={setShowEdit} action="edit"/>
          <DialogCampaign show={showCreate} setShow={setShowCreate} action="create"/>                
        </Grid>
    </Grid>
  )
}

export default CampaignManagement
