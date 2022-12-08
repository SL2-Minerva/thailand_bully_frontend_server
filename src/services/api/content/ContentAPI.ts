import { CallAPI } from 'src/services/CallAPI'

export const ContentLists = (reload?: boolean) => {
    
    // const [{ data: response, loading, error }, refetch] = CallAPI<{ data?: any }>({
    //   url: `/campaign/list/${query}`,
    //   method: 'GET',
    //   data: {
    //     reload: reload
    //   }
    // })

    const response = {
        data: [
            {
                id: 1, 
                topic : "Contents",
                content_name: 'Aaaaaa aaaa',
                picture: 'Aaaa.jpg',
                status: true, 
                date: '07/09/2022' 
            },
            {
                id: 2, 
                topic : "Contents",
                content_name: 'Bbbbbb bbb',
                picture: 'Bbbbbb.jpg',
                status: false, 
                date: '09/10/2022' 
            }
        ]
    }
    
    return {
      resultContents: response?.data || null,

    //   loadingCampaiganList: loading,
    //   errorCampaiganList: error
    }
  }