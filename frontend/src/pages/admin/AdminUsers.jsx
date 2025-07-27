import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

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
      alert("Failed to load users");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.USERS.DELETE(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers(); // Refresh user list
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setFormData({
      name: user.name,
      email: user.email,
    });
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(API_PATHS.USERS.UPDATE(editId), formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditId(null);
      setFormData({ name: '', email: '' });
      fetchUsers(); // Refresh user list
    } catch (err) {
      alert("Failed to update user");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin User Management</h2>

      <ul>
        {users.map((user) => (
          <li key={user._id} className="mb-2">
            {editId === user._id ? (
              <>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Name"
                  className="border px-2 py-1"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                  className="border px-2 py-1 ml-2"
                />
                <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 ml-2">Save</button>
              </>
            ) : (
              <>
                {user.name} - {user.email}
                <button onClick={() => handleEdit(user)} className="bg-blue-500 text-white px-2 py-1 ml-2">Edit</button>
                <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-2 py-1 ml-2">Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminUsers;
