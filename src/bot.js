var Bot;

Bot = (function() {
  function Bot(_client, data) {
    var k;
    this._client = _client;
    if (data == null) {
      data = {};
    }
    for (k in data || {}) {
      this[k] = data[k];
    }
  }

  return Bot;

})();

module.exports = Bot;
