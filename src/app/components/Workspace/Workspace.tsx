import React from 'react';
import styled from 'styled-components';
import { Column } from './components/Column';
import { AddColumn } from './components/AddColumn';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addNewColumn, RetroColumn } from '../../store/retroWorkspace.slice';

const WorkspaceContainer = styled.div`
  display: flex;
  background-color: rgba(80, 89, 96, 0.6);
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 40px 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
`;


export function Workspace() {
  const columns = useSelector((state: RootState) => state.retroWorkspace);
  const dispatch = useDispatch();
  return (
    <WorkspaceContainer>
      <Content>
        {columns.map((column: RetroColumn) => <Column title={column.title} id={column.id} comments={column.comments} color={column.color}/>)}
        <AddColumn onClick={() => dispatch(addNewColumn())}/>
      </Content>
    </WorkspaceContainer>
  );
}
