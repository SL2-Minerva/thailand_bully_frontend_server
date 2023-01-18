import moment from 'moment';
import { CallAPI } from 'src/services/CallAPI'
import { ContentInput, ContentList } from 'src/types/content/ContentType'

export type FormInput = {
    file: File;
  };

export const ContentLists = (reload?: boolean, contentId?: string, page?:number ) => {
    let params : any = {
      reload: reload,
      content_id: contentId
    };

    if(page ||  page === 0  ) {
      params = {
        reload: reload,
        content_id: contentId,
        page: page,
        limit : 10
      }
    }
    
    const [{ data: response, loading, error }] = CallAPI<{ data?: {data: ContentList[] , total : number} }>({
      url: `/organization-content`,
      method: 'GET',
      params: params
    })

    return {
      resultContents: response?.data?.data || [],
      total : response?.data?.total || 0,
      loadingCampaiganList: loading,
      errorCampaiganList: error
    }
  }

export const CreateContent = () => {
    const [{ data: res, loading, error }, fetch] = CallAPI<{
      code: 0 | 1;
      message: string;
      data: any;
    }>(
      {
        url: `/organization-content`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
      {
        manual: true,
      }
    );
    
    return {
      resultFileUpload: res?.code === 1 ? res?.data : null,
      loadingFileUpload: loading,
      errorFileUpload: res?.code === 0 ? res?.message : error,
      fileUpload: (FormInput: FormInput, input: ContentInput) => {
        const inputDate = input.date ? moment(input.date).format('YYYY-MM-DD') : "";
        const formData = new FormData();
        if(FormInput?.file) {
            formData.append("picture", FormInput.file);
        }
        
        if (input.content_id) {
          formData.append('content_id', input.content_id);
      }

        formData.append('title', input.title);
        formData.append('content_text', input.content_text);
        formData.append('date',inputDate?.toString());
        formData.append('status', input.status);

        console.log("contentID", input.content_id);

        return new Promise((resolve, reject) => {
          fetch({
            data: formData,
          })
            .then(({ data: { data, code, message } }) => {
              if (code === 0) {
                reject(message);
              } else {
                resolve(data);
              }
            })
            .catch((ex) => {
              reject(ex.toString());
            });
        });
      },
    };
  };

  export const UpdateContent = () => {
    const [{ data: res, loading, error }, fetch] = CallAPI<{
      code: 0 | 1;
      message: string;
      data: any;
    }>(
      {
        url: `/organization-content/update`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
      {
        manual: true,
      }
    );
    
    return {
      resultUpdateContent: res?.code === 1 ? res?.data : null,
      loadingUpdateContent: loading,
      errorUpdateContent: res?.code === 0 ? res?.message : error,
      updateContentData: (FormInput: FormInput, input: ContentInput) => {
        const inputDate = input.date ? moment(input.date).format('YYYY-MM-DD') : "";
        const formData = new FormData();
        if(FormInput?.file) {
            formData.append("picture", FormInput.file);
        }
        if (input.content_id) {
            formData.append('content_id', input.content_id);
        }
        formData.append('title', input.title);
        formData.append('content_text', input.content_text);
        formData.append('date',inputDate?.toString());
        formData.append('status', input.status);
        formData.append('id', input.id ? input.id : null);

        return new Promise((resolve, reject) => {
          fetch({
            data: formData,
          })
            .then(({ data: { data, code, message } }) => {
              if (code === 0) {
                reject(message);
              } else {
                resolve(data);
              }
            })
            .catch((ex) => {
              reject(ex.toString());
            });
        });
      },
    };
  };