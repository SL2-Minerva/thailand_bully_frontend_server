import { CallAPI } from "src/services/CallAPI";

// const list =  (reload?: boolean) => {  
//     const [{data: res, loading, error}, refetch ] = CallAPI<{data?: any;}>({
//       url: `/source/list`,
//       method: "GET",
//       data: {
//         reload: reload
//       }
//     });
//     return{
//       result_source_list: res?.data ||  null,
//       result_source_list_load: loading,
//       error_source_list: error,
//     }
// }

// export default  list ;

const SourceService = (reload?: boolean) => {
    const [{data: res, loading, error} ] = CallAPI<{data?: any;}>({
      url: `/source/list`,
      method: "GET",
      data: {
        reload: reload
      }
    });

    return{
        result_source_list: res?.data ||  null,
        result_source_list_load: loading,
        error_source_list: error,
    }
  }

  export default  SourceService;