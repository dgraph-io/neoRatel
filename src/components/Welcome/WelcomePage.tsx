import React from 'react';
import { useTabsStore } from '../../store/tabsStore';
import styled from '@emotion/styled';
import { SiDgraph, SiGraphql } from "react-icons/si";
import { VscJson } from "react-icons/vsc";


const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: #29648f;
  border: none;
  color: white;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition-duration: 0.4s;

  &:hover {
    background-color: #45a049;
  }
`;

const WelcomePage = () => {
  const addTab = useTabsStore((state) => state.addTab);

  const handleCreateTab = (type) => {
    addTab(type);
  };

  return (
    <WelcomeContainer>
      <Title>Welcome to Dgraph</Title>
      <Description>To get started, create a new tab in the format you desire:</Description>
      <ButtonsContainer>
        <Button onClick={() => handleCreateTab('DQL')}><SiDgraph /> Create DQL Tab</Button>
        <Button onClick={() => handleCreateTab('GraphQL')}><SiGraphql /> Create GraphQL Tab</Button>
        <Button onClick={() => handleCreateTab('JSON View')}><VscJson /> Create JSON Tab</Button>
        <Button onClick={() => handleCreateTab('RDF')}>Create RDF Tab</Button>
      </ButtonsContainer>
    </WelcomeContainer>
  );
};

export default WelcomePage;
