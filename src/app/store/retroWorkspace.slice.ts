import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apolloClient } from '../../index';
import {
  ADD_COMMENT,
  ADD_NEW_COLUMN,
  AddCommentResponse,
  AddNewColumnResponse, GET_ALL_COLUMNS, GetAllColumns, SET_COLOR,
  SET_TITLE, SetColorResponse,
  SetTitleResponse
} from '../components/Workspace/graphql/Workspace.graphql';

export interface RetroComment {
  id?: string
  text: string;
  name: string;
}

export interface RetroColumn {
  id: string;
  title: string;
  comments: Array<RetroComment>;
  color: string;
}

export type RetroWorkspaceSliceState = Array<RetroColumn>;

// todo: change state to accept loading and error app state and handle getColumns with loading!
const initialState: RetroWorkspaceSliceState = [];

export const getColumns = createAsyncThunk('RetroWorkspaceSlice/setColumns',
  async () => {
    const response = await apolloClient.query<GetAllColumns>({
      query: GET_ALL_COLUMNS
    });
    return response.data;
  });

export const addNewColumn = createAsyncThunk('RetroWorkspaceSlice/addNewColumn',
  async () => {
    const response = await apolloClient.mutate<AddNewColumnResponse>({
      mutation: ADD_NEW_COLUMN, variables: {
        title: 'Please input title...',
        color: '#8bc34a'
      }
    });
    return response.data;
  });

export const addComment = createAsyncThunk<any, { id: string, comment: RetroComment }>('RetroWorkspaceSlice/addComment', async ({ id, comment }) => {
  const response = await apolloClient.mutate<AddCommentResponse>({
    mutation: ADD_COMMENT, variables: {
      name: comment.name,
      text: comment.text,
      columnId: id
    }
  });
  return response.data;
});

export const setColumnTitle = createAsyncThunk<any, { id: string, title: string }>('RetroWorkspaceSlice/setColumnTitle', async ({ id, title }) => {
  const response = await apolloClient.mutate<SetTitleResponse>({
    mutation: SET_TITLE, variables: {
      id,
      title,
    }
  });
  return response.data;
});

export const setColumnColor = createAsyncThunk<any, { id: string, color: string }>('RetroWorkspaceSlice/setColumnColor', async ({ id, color }) => {
  const response = await apolloClient.mutate<SetColorResponse>({
    mutation: SET_COLOR, variables: {
      id,
      color,
    }
  });
  return response.data;
});

export const slice = createSlice({
  name: 'RetroWorkspaceSlice',
  initialState,
  reducers: {
    setColumns: (state: RetroWorkspaceSliceState, action: PayloadAction<Array<RetroColumn>>) => {
      return action.payload;
    },
  },
  extraReducers: (builder => {

    builder.addCase(getColumns.fulfilled,
      (state, { payload }) => {
        const { getColumns } = payload as GetAllColumns;
        return getColumns
      });

    builder.addCase(addNewColumn.fulfilled,
      (state, { payload }) => {
        const { createColumn: { id, color, title } } = payload as AddNewColumnResponse;
        state.push({
          id,
          title,
          color,
          comments: [],
        });
      });

    builder.addCase(addComment.fulfilled, (state, { payload }) => {
      const { createComment: { id, name, text, column: { id: columnId } } } = payload as AddCommentResponse;
      const index = state.findIndex((column: RetroColumn) => column.id === columnId);
      state[index].comments.push({ id, name, text });
    });

    builder.addCase(setColumnTitle.fulfilled, (state, { payload }) => {
      const { setTitle: { id, title } } = payload as SetTitleResponse;
      const index = state.findIndex((column: RetroColumn) => column.id === id);
      state[index].title = title;
    });

    builder.addCase(setColumnColor.fulfilled, (state, { payload }) => {
      const { setColor: { id, color } } = payload as SetColorResponse;
      const index = state.findIndex((column: RetroColumn) => column.id === id);
      state[index].color = color;
    });
  })
});

export const { setColumns } = slice.actions;

export default slice.reducer;
