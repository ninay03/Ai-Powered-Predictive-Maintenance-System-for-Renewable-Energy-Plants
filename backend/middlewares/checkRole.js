// Middleware to check user role
export const checkRole = (requiredRole) => (req, res, next) => {
    const { role } = req.user; // Assuming req.user is set after authentication
  
    if (role !== requiredRole) {
      return res.status(403).json({ message: 'Access denied' });
    }
  
    next();
  };