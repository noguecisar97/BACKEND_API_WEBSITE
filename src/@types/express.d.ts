declare namespace Express {
  export interface Request {
    admin: {
      id: string;
    };
    client: {
      id: string;
    };
  }
}

declare namespace FindManyOptions {
  export interface MatchesMongo {
    regex: string;
  }
}
