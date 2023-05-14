import { PlayIcon, Cross1Icon, CopyIcon, PlusIcon, GearIcon } from '@radix-ui/react-icons';
import { TabLink, StyledControl, ControlButton } from "./StyledComponents";

const FloatingControl = ({ activeTab, onPlay, onClear, onClone, onAdd, onSettings }) => {

    return (
        <StyledControl>
            <TabLink active={activeTab === 'play'}>
                <ControlButton onClick={onPlay}>
                    <PlayIcon />
                </ControlButton>
            </TabLink>
            <TabLink active={activeTab === 'clear'}>
                <ControlButton onClick={onClear}>
                    <Cross1Icon />
                </ControlButton>
            </TabLink>
            <TabLink active={activeTab === 'clone'}>
                <ControlButton onClick={onClone}>
                    <CopyIcon />
                </ControlButton>
            </TabLink>
            <TabLink active={activeTab === 'add'}>
                <ControlButton onClick={onAdd}>
                    <PlusIcon />
                </ControlButton>
            </TabLink>
            <TabLink active={activeTab === 'settings'}>
                <ControlButton onClick={onSettings}>
                    <GearIcon />
                </ControlButton>
            </TabLink>
        </StyledControl>
    );
};

export default FloatingControl;
