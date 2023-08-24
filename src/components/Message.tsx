import { message } from "antd";

export const success = (content: any) => {
  message.success(content);
};
export const error = (content: any) => {
  message.error(content);
};
export const warning = (content: any) => {
  message.warning(content);
};
export const info = (content: any) => {
  message.info(content);
};
