import { CallAPI } from 'src/services/CallAPI'


export const Organization = {
	getList: (reload? :any) => {
    const [{ data: res, error }, store] = CallAPI<{ data?: any }>({
      url: `/organization/list`,
      method: 'GET',
      data: {
        reload: reload
      }
    })
    return {
      list: res?.data || null,
      error,
     
    }
  },
  
};