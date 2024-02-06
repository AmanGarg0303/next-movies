interface IMovie {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  coverImg?: string;
  rating: number;
  publishedDate?: string;
  genres?: [string];
}

interface ICat {
  id: string;
  catName: string;
  createdAt: string;
}

interface IUser {
  id: string;
  name: string;
  role: string;
  email: string;
  createdAt: string;
}
