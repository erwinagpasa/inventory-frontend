import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppraisalState {
  appraisalItems: ReduxAppraisal[];
}

const initialState: AppraisalState = {
  appraisalItems: [],
};

interface ReduxAppraisal {
  schoolYear: string;
  schoolName: string;
}

const appraisalSlice = createSlice({
  name: 'reduxState',
  initialState,
  reducers: {
    setAppraisal: (state, action: PayloadAction<ReduxAppraisal[]>) => {
      state.appraisalItems = action.payload;
    },
  },
});

export const { setAppraisal } = appraisalSlice.actions;

export default appraisalSlice.reducer;