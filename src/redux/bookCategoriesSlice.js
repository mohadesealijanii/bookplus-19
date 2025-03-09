
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const updateCategory = createAsyncThunk(
  "bookCategories/updateCategory",
  async ({ id, editedTitle, token }, { rejectWithValue }) => {
    try {
      const updatedCategory = {
        id,
        title: editedTitle,
      };

      const res = await fetch(
        "https://stg-core.bpapp.net/api/BookCategory/UpdateBookCategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedCategory),
        }
      );

      return await res.json(); // return the updated category or response data
    } catch (error) {
      return rejectWithValue(error.message); // pass error to rejected action
    }
    
  }
);

const initialState = {
  info: [],
  filteredCategories: [],
  currentPage: 1,
  categoryPerPage: 5,
  searchTerm: "",
  editingCategoryId: null,
  editedTitle: "",
  selectedId: "",
  jumpInput: "",
  newRows: 5,
  loading: false,
  error: null,
};

const bookCategoriesSlice = createSlice({
  name: "BookCategories",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },

    setFilteredCategories: (state, action) => {
      state.filteredCategories = action.payload;
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    setCategoryPerPage: (state, action) => {
      state.categoryPerPage = action.payload;
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    setEditedTitle: (state, action) => {
      state.editedTitle = action.payload;
    },

    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },

    setJumpInput: (state, action) => {
      state.jumpInput = action.payload;
    },

    setEditingCategoryId: (state, action) => {
      state.editingCategoryId = action.payload;
    },

    setNewRows: (state, action) => {
      state.newRows = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;

        const updatedCategory = action.payload;
        const updatedInfo = state.info.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category
        );
        state.info = updatedInfo; // Update your info list with the updated category
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle the error state
      });
  },
});

export const {
  setInfo,
  setFilteredCategories,
  setCurrentPage,
  setCategoryPerPage,
  setSearchTerm,
  setEditingCategoryId,
  setEditedTitle,
  setJumpInput,
  setLoading,
} = bookCategoriesSlice.actions;

export default bookCategoriesSlice.reducer;
