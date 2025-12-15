import { createContext, PropsWithChildren, useContext, useState } from "react";
import { IApiService } from "type/types";

const ApiContext = createContext<IApiContext>({} as IApiContext);

interface IApiContext {
  currentApi: IApiService;
  definirCurrentApi: (e: IApiService) => void;
}

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApi deve estar dentro do bonitão do ApiContext");
  }
  return context;
};

export const ApiProvider = ({ children }: PropsWithChildren) => {
  const [currentApi, setCurrentApi] = useState<IApiService>({} as IApiService);

  const definirCurrentApi = (api: IApiService) => {
    setCurrentApi(api);
  };

  return (
    <ApiContext.Provider value={{ currentApi, definirCurrentApi }}>
      {children}
    </ApiContext.Provider>
  );
};
