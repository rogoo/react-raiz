export const loggerMiddleware =
  (store: any) => (next: any) => (action: any) => {
    console.group((action as { type?: string }).type || "Unknown Action");
    console.log(
      "%cPrevious State:",
      "color: #9E9E9E; font-weight: bold;",
      store.getState(),
    );
    console.log("%cAction:", "color: #03A9F4; font-weight: bold;", action);
    const result = next(action);
    console.log(
      "%cNext State:",
      "color: #4CAF50; font-weight: bold;",
      store.getState(),
    );
    console.groupEnd();

    return result;
  };
