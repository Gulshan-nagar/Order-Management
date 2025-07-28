import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Layout from "../../components/Layout";


function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.USERS.GET_ALL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      alert("❌ Failed to load users");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.USERS.DELETE(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      alert("❌ Failed to delete user");
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setFormData({ name: user.name, email: user.email });
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(API_PATHS.USERS.UPDATE(editId), formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditId(null);
      setFormData({ name: '', email: '' });
      fetchUsers();
    } catch (err) {
      alert("❌ Failed to update user");
    }
  };

  return (
    <Layout>
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        👥 Admin User Management
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user._id} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition border">
            {editId === user._id ? (
              <>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Name"
                  className="border p-2 w-full mb-2 rounded text-sm"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                  className="border p-2 w-full mb-3 rounded text-sm"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdate}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-800 font-semibold mb-1">{user.name}</p>
                <p className="text-gray-600 text-sm mb-3">{user.email}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
}

export default AdminUsers;
