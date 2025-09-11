export interface SendEmailModel {
        to_name: string;
        from_name: string;
        message: string;
        reply_to: string;
        tags: string;
      [key: string]: unknown;

}