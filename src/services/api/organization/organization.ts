import { CallAPI } from 'src/services/CallAPI'


export const Organization = {
	getList: (reload? :any, page?: number) => {
    let params;

    if(page ||  page === 0  ) {
      params = {
        page: page,
        limit : 10
      }
    }
    const [{ data: res, error }, store] = CallAPI<{ data?: any }>({
      url: `/organization/list`,
      method: 'GET',
      params : params,
      data: {
        reload: reload
      }
    })

    return {
      list: res?.data || null,
      total: res?.data?.total || 0,
      error,
     
    }
  },
  
};