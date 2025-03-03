
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Inputs from "./pages/Inputs";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <Layout>
                <Dashboard />
              </Layout>
            } 
          />
          <Route 
            path="/portfolio" 
            element={
              <Layout>
                <Portfolio />
              </Layout>
            } 
          />
          <Route 
            path="/inputs" 
            element={
              <Layout>
                <Inputs />
              </Layout>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <Layout>
                <Profile />
              </Layout>
            } 
          />
          {/* Placeholder routes for navbar tabs - these would be implemented with actual content */}
          <Route 
            path="/saved" 
            element={
              <Layout>
                <div className="text-center py-12">
                  <h1 className="text-2xl font-bold mb-4">Saved Items</h1>
                  <p className="text-text-secondary">This page is under development.</p>
                </div>
              </Layout>
            } 
          />
          <Route 
            path="/shared" 
            element={
              <Layout>
                <div className="text-center py-12">
                  <h1 className="text-2xl font-bold mb-4">Shared Items</h1>
                  <p className="text-text-secondary">This page is under development.</p>
                </div>
              </Layout>
            } 
          />
          <Route 
            path="/achievement" 
            element={
              <Layout>
                <div className="text-center py-12">
                  <h1 className="text-2xl font-bold mb-4">Achievements</h1>
                  <p className="text-text-secondary">This page is under development.</p>
                </div>
              </Layout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
