import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import * as api from '../services/api';
import TemplateCard from '../components/TemplateCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { user } = useAuth();

  const fetchResumes = async (searchTerm = '') => {
    try {
      setLoading(true);
      const { data } = await api.getResumes(searchTerm);
      setResumes(data);
    } catch (error) {
      toast.error('Failed to fetch resumes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    // Debounce search
    const timer = setTimeout(() => {
      fetchResumes(value);
    }, 500);
    return () => clearTimeout(timer);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await api.deleteResume(id);
        setResumes(resumes.filter((r) => r._id !== id));
        toast.success('Resume deleted successfully');
      } catch (error) {
        toast.error('Failed to delete resume');
      }
    }
  };

  const handleDuplicate = async (id) => {
    try {
      const { data } = await api.duplicateResume(id);
      setResumes([data, ...resumes]);
      toast.success('Resume duplicated successfully');
    } catch (error) {
      toast.error('Failed to duplicate resume');
    }
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            Welcome back, <span className="text-primary">{user?.name}</span>! 👋
          </h2>
          <p className="text-muted mb-0">
            You have {resumes.length} resume{resumes.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link to="/create" className="btn btn-primary d-flex align-items-center gap-2 mt-2 mt-md-0">
          <FaPlus /> New Resume
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="input-group input-group-lg">
          <span className="input-group-text bg-transparent">
            <FaSearch className="text-muted" />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search your resumes..."
            value={search}
            onChange={handleSearch}
            id="searchResumes"
          />
        </div>
      </div>

      {/* Resume Cards */}
      {loading ? (
        <LoadingSpinner text="Loading your resumes..." />
      ) : resumes.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-4" style={{ fontSize: '4rem' }}>📄</div>
          <h4 className="fw-bold">No Resumes Yet</h4>
          <p className="text-muted mb-4">
            {search
              ? 'No resumes match your search. Try a different keyword.'
              : "You haven't created any resumes yet. Let's build one!"}
          </p>
          {!search && (
            <Link to="/create" className="btn btn-primary btn-lg px-4">
              <FaPlus className="me-2" /> Create Your First Resume
            </Link>
          )}
        </div>
      ) : (
        <div className="row">
          {resumes.map((resume) => (
            <TemplateCard
              key={resume._id}
              resume={resume}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
