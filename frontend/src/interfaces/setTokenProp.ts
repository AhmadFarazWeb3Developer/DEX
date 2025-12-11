import { Dispatch, SetStateAction } from "react";

import { TokenType } from "../types/TokenType";

export interface setTokenProp {
  setToken: Dispatch<SetStateAction<TokenType[]>>;
}
