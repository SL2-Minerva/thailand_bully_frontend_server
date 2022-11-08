import { CallAPI } from "src/services/CallAPI";

const DomainList = (reload?: boolean) => {
  const [{data: res, loading, error}, refetch ] = CallAPI<{data?: any;}>({
    url: `/domain/list`,
    method: "GET",
    data: {
      reload: reload
    }
  });
    return{
      result_domain_list: res?.data ||  null,
      loading_domain_list: loading,
      error_domain_list: error,
    }
  }

export default DomainList
