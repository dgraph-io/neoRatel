import React, { useState, useEffect } from 'react';
import { useDgraphConfigStore } from '../../store/dgraphConfigStore';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

const DgraphConfigDialog = () => {
  const {
    serverUrl: defaultServerUrl,
    serverQueryTimeout: defaultServerQueryTimeout,
    slashApiKey: defaultSlashApiKey,
    authToken: defaultAuthToken,
    setServerUrl,
    setServerQueryTimeout,
    setSlashApiKey,
    setAuthToken,
  } = useDgraphConfigStore();

  const [open, setOpen] = useState(true);
  const [serverUrl, setServerUrlState] = useState(defaultServerUrl);
  const [serverQueryTimeout, setServerQueryTimeoutState] = useState(defaultServerQueryTimeout);
  const [slashApiKey, setSlashApiKeyState] = useState(defaultSlashApiKey);
  const [authToken, setAuthTokenState] = useState(defaultAuthToken);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setServerUrl(serverUrl);
    setServerQueryTimeout(serverQueryTimeout);
    setSlashApiKey(slashApiKey);
    setAuthToken(authToken);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Trigger />
  <Dialog.Portal>
    <Dialog.Overlay className="DialogOverlay" />
    <Dialog.Content className="DialogContent">
      <Dialog.Title className="DialogTitle">
        Dgraph Configuration
      </Dialog.Title>
      <Dialog.Description className="DialogDescription">
        Please enter your Dgraph configuration:
      </Dialog.Description>

      <form onSubmit={handleSubmit}>
        <label>
          Server URL:
          <input
            className="Input"
            type="text"
            value={serverUrl}
            onChange={(e) => setServerUrlState(e.target.value)}
          />
        </label>
        <label>
          Server Query Timeout:
          <input
            className="Input"
            type="number"
            value={serverQueryTimeout}
            onChange={(e) =>
              setServerQueryTimeoutState(Number(e.target.value))
            }
          />
        </label>
        <label>
          Slash API Key:
          <input
            className="Input"
            type="text"
            value={slashApiKey}
            onChange={(e) => setSlashApiKeyState(e.target.value)}
          />
        </label>
        <label>
          Auth Token:
          <input
            className="Input"
            type="text"
            value={authToken}
            onChange={(e) => setAuthTokenState(e.target.value)}
          />
        </label>
        <input className="SubmitButton" type="submit" value="Submit" />
      </form>

      <Dialog.Close asChild>
        <button
          className="IconButton"
          aria-label="Close"
          onClick={handleClose}
        >
          <Cross2Icon />
        </button>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

  );
};

export default DgraphConfigDialog;
