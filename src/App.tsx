import './App.css';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ManagedUIContext } from './components/ui/context';
import { CreatePostView, action } from './routes/CreatePostView';
import { Home } from './routes/Home';
import { PostDetails, loader as postDetailsLoader } from './routes/PostDetails';
import { LoginView } from './components/Auth';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 2,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<Home />} />
        <Route
          path="submit"
          action={action(queryClient)}
          element={<CreatePostView />}
        />
        <Route
          index
          path="/post/:postId"
          loader={postDetailsLoader(queryClient)}
          element={<PostDetails />}
        />
        <Route path="required_login" element={<LoginView />} />
        <Route
          index
          path="/:sort"
          loader={({ params, request }) => {
            return {
              params,
              request,
            };
          }}
          element={<Home />}
        />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ManagedUIContext>
        <RouterProvider router={router} />
      </ManagedUIContext>
    </QueryClientProvider>
  );
}

export default App;
