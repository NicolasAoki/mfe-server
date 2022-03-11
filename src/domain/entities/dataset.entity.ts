export interface DatasetProps {
  providerId: string;
  name: string;
  format: string;
  downloadLink: string;
}

export class Dataset implements DatasetProps {
  providerId: string;
  name: string;
  format: string;
  downloadLink: string;

  constructor(props: DatasetProps) {
    this.providerId = props.providerId
    this.name = props.name
    this.format = props.format
    this.downloadLink = props.downloadLink
  }
}