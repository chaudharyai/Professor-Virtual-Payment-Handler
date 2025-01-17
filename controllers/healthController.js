const checkHealth = (req, res) => {
    res.json({ status: 'Healthy', timestamp: new Date() });
  };
  
  module.exports = { checkHealth };
  