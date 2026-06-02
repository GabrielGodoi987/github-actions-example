// Simple UUID v4 shim for tests (CommonJS)
function hex(s) {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

module.exports = {
  v4: function () {
    return (
      hex() + hex() + '-' + hex() + '-' + hex() + '-' + hex() + '-' + hex() + hex() + hex()
    );
  },
};
