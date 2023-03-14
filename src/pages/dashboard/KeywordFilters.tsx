import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useEffect } from 'react'
import { GetKeyWordsList } from 'src/services/api/dashboards/overall/overallDashboardApi'
import { wordBreaks } from './overall'

interface Props {
    campaign: string
    keyword : string
    setKeyword: any
    filterKeyword: any
    setFilterKeyword: any
    checkKeywordId: any
    setKeywordLoading?: any
}

const KeywordFilters = (data: Props) => {

    const {campaign, keyword, setKeyword, filterKeyword, setFilterKeyword, checkKeywordId , setKeywordLoading} = data;

  const { resultKeywordList, loadingKeywordList, keywordsColor } = GetKeyWordsList(campaign)

  useEffect(() => {
    if(setKeywordLoading) {
        setKeywordLoading(loadingKeywordList)
    }
  }, [loadingKeywordList])

  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Filter'></CardHeader>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={6} md={2}>
                <Button
                  sx={{ mb: 2 }}
                  onClick={() => {
                    if (keyword === 'all') {
                      setKeyword('')
                    } else {
                      setKeyword('all')
                      setFilterKeyword([])
                    }
                  }}
                  variant='contained'
                  color={keyword === 'all' ? 'primary' : 'secondary'}
                >
                  ALL
                </Button>
              </Grid>

              {resultKeywordList &&
                (resultKeywordList || [])?.map((keywords: any, index: number) => {
                  return (
                    <Grid item xs={6} md={2} key={index}>
                      <Button
                        sx={{
                          mb: 2,
                          bgcolor:
                            filterKeyword?.indexOf(keywords?.id) > -1
                              ? keywordsColor && keywordsColor[index] !== '#'
                                ? keywordsColor[index]
                                : 'black'
                              : keyword === 'all'
                              ? keywordsColor && keywordsColor[index] !== '#'
                                ? keywordsColor[index]
                                : 'black'
                              : 'grey',
                          ':hover': {
                            bgcolor:
                              filterKeyword?.indexOf(keywords?.id) > -1
                                ? keywordsColor && keywordsColor[index] !== '#'
                                  ? keywordsColor[index]
                                  : 'black'
                                : keyword === 'all'
                                ? keywordsColor && keywordsColor[index] !== '#'
                                  ? keywordsColor[index]
                                  : 'black'
                                : 'grey'
                          }
                        }}
                        onClick={() => {
                          checkKeywordId(filterKeyword, keywords?.id)
                        }}
                        variant='contained'
                      >
                        <span style={{ wordWrap: 'break-word' }}>{wordBreaks(keywords.name)}</span>
                      </Button>
                    </Grid>
                  )
                })}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default KeywordFilters
