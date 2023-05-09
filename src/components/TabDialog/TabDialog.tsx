import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useTabsStore } from '../../store/tabsStore';
import { AddTabButton } from './styles';
import { SiDgraph, SiGraphql } from "react-icons/si";
import { VscJson } from "react-icons/vsc";

export const AddTabDialog: React.FC = () => {
    const addTab = useTabsStore((state) => state.addTab);

    const handleTabSelection = (type: string) => {
        addTab(type);
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <AddTabButton>+</AddTabButton>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">Add new tab</Dialog.Title>
                    <Dialog.Description className="DialogDescription">
                        Choose the type of tab you want to create:
                    </Dialog.Description>
                    <Dialog.Close asChild>
                        <button className="Button" onClickCapture={() => handleTabSelection('DQL')}>
                        <SiDgraph /> Create a DQL tab
                        </button></Dialog.Close>
                    <Dialog.Close asChild>
                        <button className="Button" onClickCapture={() => handleTabSelection('GraphQL')}>
                        <SiGraphql /> Create a GraphQL tab
                        </button></Dialog.Close>
                    <Dialog.Close asChild>
                        <button className="Button" onClickCapture={() => handleTabSelection('JSON View')}>
                        <VscJson /> Create a JSON View tab
                        </button>
                    </Dialog.Close>
                    <Dialog.Close asChild>
                        <button className="IconButton" aria-label="Close">
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default AddTabDialog;
