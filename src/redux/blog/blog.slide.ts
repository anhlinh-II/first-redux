import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchListBlogs = createAsyncThunk(
     'blogs/fetchListBlogs',
     async () => {
          const res = await fetch("http://localhost:8000/blogs");
          const data = await res.json();
          return data;
     }
)

interface ICreateBlog {
     title: string;
     author: string;
     content: string;
}

export const createNewBlog = createAsyncThunk(
     'blogs/createNewBlog',
     async (payload: ICreateBlog, thunkAPI) => {
          const res = await fetch("http://localhost:8000/blogs", {
               method: "POST",
               body: JSON.stringify({
                    title: payload.title,
                    author: payload.author,
                    content: payload.content,
               }),
               headers: {
                    "Content-type": " application/json"
               }
          });
          const data = await res.json();
          if (data && data.id) {
               // create success
               thunkAPI.dispatch(fetchListBlogs())
          }
          return data;
     }
)

interface IUpdateBlog {
     id: number | null;
     title: string;
     author: string;
     content: string;
} 

export const updateBlog = createAsyncThunk(
     'blogs/updateBlog',
     async (payload: IUpdateBlog, thunkAPI) => {
          const res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
               method: "PUT",
               body: JSON.stringify({
                    title: payload.title,
                    author: payload.author,
                    content: payload.content,
               }),
               headers: {
                    "Content-type": " application/json"
               }
          });
          const data = await res.json();
          if (data && data.id) {
               // create success
               thunkAPI.dispatch(fetchListBlogs())
          }
          return data;
     }
)

interface IBlog {
     id: number;
     title: string;
     author: string;
     content: string;
}

const initialState: {
     listBlogs: IBlog[];
     isCreateSuccess: boolean;
     isUpdateSuccess: boolean;
} = {
     listBlogs: [],
     isCreateSuccess: false,
     isUpdateSuccess: false,
}

export const blogSlice = createSlice({
     name: 'user',
     initialState,
     reducers: {
          resetUpdate: (state) => {
               state.isUpdateSuccess = false;
          },
          resetCreate: (state) => {
               state.isCreateSuccess = false;
          }
     },
     extraReducers: (builder) => {
          // Add reducers for additional action types here, and handle loading state as needed
          builder.addCase(fetchListBlogs.fulfilled, (state, action) => {
               console.log(action.payload)
               state.listBlogs = action.payload
          })
               .addCase(createNewBlog.fulfilled, (state, action) => {
                    state.isCreateSuccess = true;
               })
               .addCase(updateBlog.fulfilled, (state, action) => {
                    state.isUpdateSuccess = true;
               })
     }
})

export const { resetCreate, resetUpdate } = blogSlice.actions

export default blogSlice.reducer