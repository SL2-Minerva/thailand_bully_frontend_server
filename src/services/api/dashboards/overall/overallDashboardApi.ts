import { CallAPI } from 'src/services/CallAPI'

export const FilterByCampaignId = (campaignId?: string, reload?: boolean) => {

    const [{ data: res, loading, error }, refetch] = CallAPI<{ data?: any }>({
      url: `/dashboard/overall?campaign_id=${campaignId}`,
      method: 'GET',
      data: {
        reload: reload
      }
    })
    return {
      resultFilterData: res?.data || null,
      loadingFilterData: loading,
      errorFilterData: error
    }
  }