import { gql } from '@apollo/client';
import { RetroColumn } from '../../../store/retroWorkspace.slice';

export interface GetAllColumns {
  getColumns: Array<RetroColumn>
}

export const GET_ALL_COLUMNS = gql`
    query {
        getColumns {
            id
            title
            color
            comments {
                name
                text
            }
        }
    }
`;


export interface AddNewColumnResponse {
  createColumn: {
    id: string
    title: string
    color: string
  }
}

export const ADD_NEW_COLUMN = gql`
    mutation CreateColumn($title: String!, $color: String!) {
        createColumn(data:{ title: $title, color: $color}) {
            id
            title
            color
        }
    }
`;

export interface AddCommentResponse {
  createComment: {
    id: string;
    name: string;
    text: string;
    column: {
      id: string
    }
  }
}

export const ADD_COMMENT = gql`
    mutation CreateComment($name: String!, $text: String!, $columnId: String!) {
        createComment(data:{
            name: $name,
            text: $text,
            columnId: $columnId
        }) {
            id
            name
            text
            column {
                id
            }
        }
    }
`;

export interface SetTitleResponse {
  setTitle: {
    id: string;
    title: string;
  }
}

export const SET_TITLE = gql`
    mutation SetTitle($id: String!, $title: String! ){
        setTitle(data:{
            id: $id,
            value: $title
        }) {
            id
            title
        }
    }
`;

export interface SetColorResponse {
  setColor: {
    id: string;
    color: string;
  }
}

export const SET_COLOR = gql`
    mutation SetColor($id: String!, $color: String! ){
        setColor(data:{
            id: $id,
            value: $color
        }) {
            id
            color
        }
    }
`;
