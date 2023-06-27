// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
const fs = require('fs');
const path = require('path');

const sourceDirectoryPath = path.resolve(__dirname, '../public/audio');
const symlinkPath = path.resolve(__dirname, 'node_modules/audio');

fs.symlink(sourceDirectoryPath, symlinkPath, 'dir', (err) => {
  if (err) {
    console.error('Error creating symlink:', err);
  } else {
    console.log('Symlink created successfully.');
  }
});
