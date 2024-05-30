const express = require('express');
const app = express.Router();
const path = require('path');

app.use(express.static(path.join(__dirname, '..', 'apidocs', 'build')));


// Define API routes
app.get('/img/logo.svg', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'apidocs', 'build', 'assets', 'img', 'logo.svg'));
});

app.get('/assets/css/styles.69f2a557.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'apidocs', 'build', 'assets', 'css', 'styles.69f2a557.css'));
});

app.get('/assets/js/runtime~main.a44607b0.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'apidocs', 'build', 'assets', 'js', 'runtime~main.a44607b0.js'));
});

app.get('/assets/js/main.442a6ec8.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'apidocs', 'build', 'assets', 'js', 'main.442a6ec8.js'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'apidocs', 'build', 'index.html'));
}); 

app.get('/docs/user', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'apidocs', 'build', 'docs', 'user', 'index.html'));
}); 

app.get('/docs/user/id', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'apidocs', 'build', 'docs', 'user', 'id', 'index.html'));
}); 

app.get('/docs/org', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'apidocs', 'build', 'docs', 'org', 'index.html'));
}); 

app.get('/docs/org/id', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'apidocs', 'build', 'docs', 'org', 'id', 'index.html'));
}); 

app.get('/docs/auth', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'apidocs', 'build', 'docs', 'auth', 'index.html'));
}); 

module.exports = app;