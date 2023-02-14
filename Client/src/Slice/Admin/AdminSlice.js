import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../App";




export const getAllEvents = createAsyncThunk(
  "admin/events",
  async ( thunkAPI) => {
    const response = await API.get(`/admin/events`);
    return response.data;
  }
);

export const getAllCategories = createAsyncThunk(
  'admin/DesactivedAndActivedCategories',
  async (CategoryId,formData, thunkAPI) => {
    const response = await API.get(`/admin/categories/${CategoryId}`, formData)    
    return response.data
  })

  export const getUsers = createAsyncThunk(
    'admin/getUsers',
  async (thunkAPI) => {
    const response = await API.get(`/admin/users`)    
    return response.data
  })

  export const changeUserRole = createAsyncThunk(
    "admin/changeUserRole",
    async (userId, thunkAPI) => {
      const response = await API.put(`/admin/users/change/${userId}`);
      console.log(response , userId)
      return response.data;
    }
  );

export const changeStateEvent = createAsyncThunk(
  "admin/changeStateEvent",
  async (eventId, thunkAPI) => {
    console.log(eventId)
    const response = await API.put(`/admin/events/${eventId}`);
    
    return response.data;
  }
);


export const disableUser = createAsyncThunk(
  "admin/disableUser",
  async (userId, thunkAPI) => {
    const response = await API.put(`/admin/users/ban/${userId}`);
    return response.data;
  }
);

// export const deleteComment = createAsyncThunk(
//   "admin/deleteComment",
//   async (commentId, thunkAPI) => {
//     const response = await api.delete(`${api}/admin/comments/${commentId}`);
//     return response.data;
//   }
// );
export const changeInfoCategory= createAsyncThunk(
  "admin/ChangeEvent",
  async (category, thunkAPI) => {
    const response = await API.put(`/admin/categories/${category.id}`, category.category);
    return response.data;
  }
);


export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    events: [],
    users: [],
    categories: [],
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {
    // ...
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getAllCategories.pending]: (state) => {
      state.loading = true;
    },
    [getAllCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getAllCategories.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getAllEvents.pending]: (state) => {
      state.loading = true;
    },
    [getAllEvents.fulfilled]: (state, action) => {
      state.loading = false;
      state.events = action.payload
    },
    [getAllEvents.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [disableUser.pending]: (state) => {
      state.loading = true;
    },
    [disableUser.fulfilled]: (state, action) => {
      state.loading = false;
      const userId = action.payload.id;

      // 2. Buscar el índice del usuario en el arreglo state.users usando findIndex
      const userIndex = state.users.findIndex(user => user.id === userId);
    
      // 3. Actualizar la propiedad isBanned del usuario con el id correspondiente
      if (userIndex !== -1) {
        state.users[userIndex].isBanned = !state.users[userIndex].isBanned }
    },
    [disableUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    // [deleteComment.pending]: (state) => {
      [changeUserRole.pending]: (state) => {
        state.loading = true;
    },
    [changeUserRole.fulfilled]: (state, action) => {
      state.loading = false;
      const userId = action.payload.id;

      // 2. Buscar el índice del usuario en el arreglo state.users usando findIndex
      const userIndex = state.users.findIndex(user => user.id === userId);
    
      // 3. Actualizar la propiedad isBanned del usuario con el id correspondiente
      if (userIndex !== -1) {
        state.users[userIndex].roleAdmin = state.users[userIndex].roleAdmin === "USER" ? "ADMIN" : "USER"}
    },
    [changeUserRole.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [changeStateEvent.pending]: (state) => {
      state.loading = true;
    },
    [changeStateEvent.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [changeStateEvent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },



    //   state.loading = true;
    // },
    // [deleteComment.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.comments = state.comments.filter(
    //     (comment) => comment.id !== action.payload
    //   );
    // },
    // [deleteComment.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // },
  },
});

export default adminSlice.reducer;
