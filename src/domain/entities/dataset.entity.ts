export interface DatasetProps {
  providerId: string;
  name: string;
  format: string;
  downloadLink: string;
  type: string;
}

export class Dataset implements DatasetProps {
  providerId: string;
  name: string;
  format: string;
  downloadLink: string;
  type: string;

  constructor(props: DatasetProps) {
    this.providerId = props.providerId
    this.name = props.name
    this.format = props.format
    this.downloadLink = props.downloadLink
    this.type = props.type
  }
}