/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

// Create a new QueryClient for each test
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

interface TestProviderProps {
  children: ReactNode;
  queryClient?: QueryClient;
}

// Wrapper with QueryClientProvider
export function TestProvider({ children, queryClient }: TestProviderProps) {
  const client = queryClient || createTestQueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

// Custom render with providers
export function render(
  ui: ReactNode,
  { queryClient, ...renderOptions }: { queryClient?: QueryClient } & RenderOptions = {}
) {
  const client = queryClient || createTestQueryClient();
  return rtlRender(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>,
    renderOptions
  );
}

export * from "@testing-library/react";
