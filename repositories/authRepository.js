import repository from './repository';

const resourceUrl = "auth";

export default {
  login(options = {}) {
    return repository('POST', `${resourceUrl}/login`, options);
  },
  logout(options = {}) {
    return repository('POST', `${resourceUrl}/logout`, options);
  },
}