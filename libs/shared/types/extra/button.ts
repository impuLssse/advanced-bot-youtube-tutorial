import { I18nPath } from '..';

export interface IButton {
  text: I18nPath;
  callback_data?: string;
  args?: any;
  hide?: boolean;
}
