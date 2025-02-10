export default interface Contact {
  login: {
    uuid: string;
  }
  name: {
    first: string;
    last: string;
  }
  gender: string;
  email: string;
  cell: string;
  picture: {
    thumbnail: string;
  }
}