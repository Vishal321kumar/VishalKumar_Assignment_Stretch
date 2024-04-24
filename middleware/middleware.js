// authMiddleware.js

const jwt = require('jsonwebtoken');
require('dotenv').config();




exports.authenticateUser = async (req, res, next) => {
    // Get token from request headers, cookies, or query parameters
    const authHeader = req.headers.authorization;
    console.log(authHeader);
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    // Extract token by removing "Bearer " prefix
    const token = authHeader.split(' ')[1];
  
    try {
      // Verify token
      const decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
          if (err) reject(err);
          resolve(decoded);
        });
      });

      req.user = decoded; // Set user information in request object
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
  


// authorizationMiddleware.js
exports.authorizeEdit = (req, res, next) => {
    const userId = req.user.id; // Assuming user ID is stored in the JWT payload
    const studentId = req.params.id; // ID of the student being edited
  
    if (userId !== studentId) {
      return res.status(403).json({ message: 'Forbidden' });
    }
  
    next();
  };
  