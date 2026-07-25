import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import type { PropsWithChildren } from "react";
import { createContext, useContext, useMemo, useState } from "react";

type MessageMui = {
  title?: string;
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
};

type MessageMuiContextValue = {
  showMessage: (message: MessageMui) => void;
};

const MessageMuiContext = createContext<MessageMuiContextValue | null>(null);

MessageMuiContext.displayName = "MessageMuiContext";

export const MessageMuiProvider = ({ children }: PropsWithChildren) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageMui | null>(null);

  const showMessage = (message: MessageMui) => {
    setMessage(message);
    setShowDialog(true);
  };

  const showMessageMemo = useMemo(() => ({ showMessage }), []);

  return (
    <MessageMuiContext.Provider value={showMessageMemo}>
      {children}
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>{message?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message?.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setShowDialog(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </MessageMuiContext.Provider>
  );
};

export const useMessageMui = () => {
  const ctx = useContext(MessageMuiContext);
  if (ctx === null) {
    throw new Error("useMessageMui must be used within a MessageMuiProvider");
  }
  return ctx;
};
