import React, { useEffect, useState } from 'react';
import { FaUsers, FaFileAlt, FaDownload, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { toast } from 'react-toastify';
import * as api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes, templatesRes] = await Promise.all([
        api.getAdminStats(),
        api.getAllUsers(),
        api.getAdminTemplates(),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setTemplates(templatesRes.data);
    } catch (error) {
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete user "${name}" and all their resumes?`)) {
      try {
        await api.deleteUser(id);
        setUsers(users.filter((u) => u._id !== id));
        toast.success('User deleted successfully');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const handleToggleTemplate = async (id) => {
    try {
      const { data } = await api.toggleTemplate(id);
      setTemplates(templates.map((t) => (t._id === id ? data : t)));
      toast.success(`Template ${data.isActive ? 'activated' : 'deactivated'}`);
    } catch (error) {
      toast.error('Failed to update template');
    }
  };

  if (loading) return <LoadingSpinner text="Loading admin dashboard..." />;

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">🛡️ Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body text-center p-4">
              <FaUsers size={36} className="text-primary mb-2" />
              <h2 className="fw-bold mb-0">{stats?.totalUsers || 0}</h2>
              <p className="text-muted mb-0">Total Users</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body text-center p-4">
              <FaFileAlt size={36} className="text-success mb-2" />
              <h2 className="fw-bold mb-0">{stats?.totalResumes || 0}</h2>
              <p className="text-muted mb-0">Total Resumes</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body text-center p-4">
              <FaDownload size={36} className="text-info mb-2" />
              <h2 className="fw-bold mb-0">{stats?.totalDownloads || 0}</h2>
              <p className="text-muted mb-0">Total Downloads</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users ({users.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'templates' ? 'active' : ''}`}
            onClick={() => setActiveTab('templates')}
          >
            Templates ({templates.length})
          </button>
        </li>
      </ul>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          <h5 className="fw-bold mb-3">Recent Users</h5>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentUsers?.map((u) => (
                  <tr key={u._id}>
                    <td className="fw-medium">{u.name}</td>
                    <td className="text-muted">{u.email}</td>
                    <td>
                      <span className={`badge ${u.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="text-muted">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td className="fw-medium">{u.name}</td>
                  <td className="text-muted">{u.email}</td>
                  <td>
                    <span className={`badge ${u.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="text-muted">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteUser(u._id, u.name)}
                      disabled={u.role === 'admin'}
                    >
                      <FaTrash size={12} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Template</th>
                <th>Slug</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((t) => (
                <tr key={t._id}>
                  <td className="fw-medium">{t.name}</td>
                  <td className="text-muted">{t.slug}</td>
                  <td className="text-muted small">{t.description?.substring(0, 60)}...</td>
                  <td>
                    <span className={`badge ${t.isActive ? 'bg-success' : 'bg-secondary'}`}>
                      {t.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm ${t.isActive ? 'btn-outline-warning' : 'btn-outline-success'}`}
                      onClick={() => handleToggleTemplate(t._id)}
                    >
                      {t.isActive ? <FaToggleOff className="me-1" /> : <FaToggleOn className="me-1" />}
                      {t.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
