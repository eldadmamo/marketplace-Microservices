import cloudinary, { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { error } from 'winston';

export function uploads(
    file: string, 
    public_id?:string, 
    overwrite?:boolean, 
    invalidate?:boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined>  {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
        file, 
        { 
            public_id, 
            overwrite, 
            invalidate, 
            resource_type: 'auto'
        },
    (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if(error) {
            resolve(error);
        }        
        resolve(result);
    }
    )
        .then((result) => {
            resolve(result);
        })
        .catch((error) => {
            resolve(error);
        }); 
    });
};


export function videoUpload(
    file: string, 
    public_id?:string, 
    overwrite?:boolean, 
    invalidate?:boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined>  {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
        file, 
        { 
            public_id, 
            overwrite, 
            invalidate, 
            chunk_size: 50000, // 5mb
            resource_type: 'video'
        },
    (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if(error) {
            resolve(error);
        }        
        resolve(result);
    }
    )
        .then((result) => {
            resolve(result);
        })
        .catch((error) => {
            resolve(error);
        }); 
    });
};