// Tes ini hanya untuk simulasi. Di dunia nyata, gunakan framework seperti Jest.
console.log('Starting dummy test...');
const expected = 'Hello';
const actual = 'Hello';

if (actual !== expected) {
  console.error('Test failed!');
  process.exit(1); // Keluar dengan error code, akan menggagalkan pipeline Jenkins
}

console.log('✔ Dummy test passed!');
process.exit(0); // Sukses