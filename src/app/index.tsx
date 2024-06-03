import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "@tanstack/react-router";
import {router} from "./router.tsx";
import "bootstrap/dist/css/bootstrap.min.css"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <QueryClientProvider client={client}>
          <RouterProvider router={router}/>
      </QueryClientProvider>
  </React.StrictMode>,
)
