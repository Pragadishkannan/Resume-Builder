import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaCamera } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const { user, updateUser, updateProfilePhoto } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const updateData = { name, email };
      if (password) updateData.password = password;
      await updateUser(updateData);
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      // Handled in context
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large. Maximum size is 5MB.');
      return;
    }

    setPhotoLoading(true);
    try {
      const formData = new FormData();
      formData.append('photo', file);
      await updateProfilePhoto(formData);
    } catch (error) {
      // Handled in context
    } finally {
      setPhotoLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              <h2 className="fw-bold mb-4">My Profile</h2>

              {/* Profile Photo */}
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block">
                  {user?.profilePhoto ? (
                    <img
                      src={`http://localhost:5000${user.profilePhoto}`}
                      alt={user.name}
                      className="rounded-circle border border-3 border-primary"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center"
                      style={{ width: '120px', height: '120px' }}
                    >
                      <FaUser size={40} className="text-primary" />
                    </div>
                  )}
                  <label
                    className="position-absolute bottom-0 end-0 btn btn-sm btn-primary rounded-circle p-2"
                    style={{ cursor: 'pointer' }}
                  >
                    {photoLoading ? (
                      <span className="spinner-border spinner-border-sm" />
                    ) : (
                      <FaCamera size={14} />
                    )}
                    <input
                      type="file"
                      className="d-none"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                    />
                  </label>
                </div>
                <p className="text-muted small mt-2">Click the camera icon to upload a photo</p>
              </div>

              {/* Profile Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-medium">
                    <FaUser className="me-1" /> Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium">
                    <FaEnvelope className="me-1" /> Email
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <hr className="my-4" />
                <h5 className="fw-bold mb-3">Change Password</h5>

                <div className="mb-3">
                  <label className="form-label fw-medium">
                    <FaLock className="me-1" /> New Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Leave blank to keep current"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium">
                    <FaLock className="me-1" /> Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" />
                  ) : (
                    'Update Profile'
                  )}
                </button>
              </form>

              {/* Account Info */}
              <div className="mt-4 pt-3 border-top">
                <small className="text-muted">
                  <strong>Role:</strong>{' '}
                  <span className="badge bg-primary">{user?.role}</span>
                </small>
                <br />
                <small className="text-muted">
                  <strong>Member since:</strong>{' '}
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : 'N/A'}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
