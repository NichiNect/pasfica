import repository from './repository';

const resourceUrl = "categories";

export default {
  findAll(options = {}) {
    return repository('GET', `${resourceUrl}`, options);
  },
  findOne(id, options = {}) {
    return repository('GET', `${resourceUrl}/${id}`, options);
  },
}