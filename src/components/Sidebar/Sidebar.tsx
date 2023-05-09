import React from 'react';
import { SidebarContainer, IconContainer, IconSpacing } from './styles';
import { FiFile, FiFolder } from 'react-icons/fi';
import { SiDgraph, SiGraphql } from "react-icons/si";
import {RiSettings5Fill } from "react-icons/ri";


const Sidebar: React.FC = () => {
    return (
        <SidebarContainer>
            <IconContainer> 
            <IconSpacing>
            <SiDgraph size={80} style={{ filter: 'drop-shadow(4px 4px 4px rgba(0, 0, 0, 1.25))' }} />
            </IconSpacing>
            <IconSpacing>
            <FiFolder size={35} />
            </IconSpacing>
            <IconSpacing>
            <FiFile size={35} />
            </IconSpacing>
            <IconSpacing>
            <SiGraphql size={35} />
            </IconSpacing>
            <IconSpacing>
            <RiSettings5Fill size={35} />
            </IconSpacing>
            </IconContainer>
        </SidebarContainer>
    );
};

export default Sidebar;
