export interface Mailer {
  send(payload: {
    to: string;
    template: any;
    data: any;
    headers?: string;
  }): Promise<any>;
}
