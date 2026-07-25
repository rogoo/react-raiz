import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Message = { text: string; type?: "error" | "success" | "info" };

type MessageContextValue = {
  showMessage: (text: string, type?: Message["type"]) => void;
};

const MessageContext = createContext<MessageContextValue | null>(null);

MessageContext.displayName = "MessageContext";

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<Message | null>(null);

  const showMessage = (text: string, type: Message["type"] = "info") => {
    setMessage({ text, type });
    window.setTimeout(() => setMessage(null), 3000);
  };

  const showMessageMemo = useMemo(() => ({ showMessage }), []);

  return (
    <MessageContext.Provider value={showMessageMemo}>
      {message && <div>{message.text}</div>}
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const ctx = useContext(MessageContext);
  if (!ctx) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return ctx;
};
