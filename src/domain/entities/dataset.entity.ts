export interface DatasetProps {
  _id?: string;
  downloadProgress?: string;
  providerId?: string;
  name: string;
  format: string;
  downloadLink?: string;
  type: string;
  path?: string;
}

export class Dataset implements DatasetProps {
  _id?: string;
  downloadProgress?: string;
  providerId?: string;
  name: string;
  format: string;
  downloadLink?: string;
  type: string;
  path?: string;

  constructor(props: DatasetProps) {
    this._id = props._id;
    this.downloadProgress = props.downloadProgress;
    this.providerId = props.providerId;
    this.name = props.name;
    this.format = props.format;
    this.downloadLink = props.downloadLink;
    this.type = props.type;
    this.path = props.path;
  }
}