import { Status } from './status.interface';

export interface Response extends Status {
  body?: string;
}
