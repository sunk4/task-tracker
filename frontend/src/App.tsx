import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './pages/auth/Auth';
import Project from './pages/project/Project';
import MyTasks from './pages/task/MyTasks';
import SharedLayout from './pages/SharedLayout';
import NotFound from './pages/error/NotFound';
import ProjectDetail from './pages/project/ProjectDetail';
import TaskDetail from './pages/task/TaskDetail';
import Admin from './pages/admin/Admin';
import ProtectedRoute from './pages/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import ActiveAccount from './pages/auth/ActiveAccount';
import DemoUser from './pages/auth/DemoUser';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/activate_account" element={<ActiveAccount />} />
          <Route path="/demo_login" element={<DemoUser />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<SharedLayout />}>
              <Route path="projects" element={<Project />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="myTasks" element={<MyTasks />} />
              <Route path="tasks/:id" element={<TaskDetail />} />
              <Route path="admin" element={<Admin />} />
            </Route>
          </Route>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};
export default App;
