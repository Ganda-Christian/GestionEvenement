export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };
  
  export const getRole = () => {
    return localStorage.getItem('role');
  };
  
  export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };
  