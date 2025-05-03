import api from './api'; // Import the axios instance

const AdminService = {
  // Fetch all users
  fetchUsers: async () => {
    try {
      const response = await api.get('/account/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

    // Fetch all roles
  getRoles: async () => {
    try {
      const response = await api.get("/roles");
      return response.data;
    } catch (err) {
      console.error("Failed to fetch roles:", err.message);
      throw err;
    }
  },

  // Assign a role to a user
  assignRoleToUser: async (userId, roleName) => {
    try {
      const payload = {
        UserId: userId,
        RoleName: roleName,
      };
      const response = await api.post('/roles/assign-role-to-user', payload);
      return response.data;
    } catch (error) {
      console.error('Error assigning role:', error);
      throw error;
    }
  },

  // Delete a user by ID
  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/account/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
};

export default AdminService;
