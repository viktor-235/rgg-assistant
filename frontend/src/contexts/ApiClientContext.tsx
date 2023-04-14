import { createContext, useContext } from "react";
import { ApiClient } from "../services/ApiClient";

const ApiClientContext = createContext<ApiClient>(new ApiClient());

export const ApiClientProvider = ApiClientContext.Provider

export const useApiClient = () => useContext(ApiClientContext);
