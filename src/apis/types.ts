export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterResponse {
  id: string | number;
  token: string;
}

export interface ListUserResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Users[];
}

export interface Users {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
