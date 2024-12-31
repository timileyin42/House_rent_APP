import app from './app';

const PORT = process.env.PORT || 8000;

// Debugging Statement: Confirm port number and app status
console.log(`Attempting to start the server on port ${PORT}...`);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

