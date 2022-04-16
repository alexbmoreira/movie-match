import _ from 'lodash';

class Url {
  endpoint = '';
  params = {};

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  toString() {
    let url = this.endpoint;
  
    if (!_.isEmpty(this.params)) {
      let numParams = 0;
      _.forEach(this.params, (value, key) => {
        url += `${numParams > 0 ? '&' : '?'}${key}=${value}`;
        numParams++;
      });
    }
  
    return url;
  }
}

export default Url;
