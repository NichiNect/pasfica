import repository from '@/repositories/repository';

const resourceUrl = "https://fakestoreapi.com/products";

const productRepository = {
  findAll(options = {}) {
    return repository('GET', `${resourceUrl}`, options, 'custom');
  },
  findOne(id, options = {}) {
    return repository('GET', `${resourceUrl}/${id}`, options, 'custom');
  },
  delete(id, options = {}) {
    return repository('DELETE', `${resourceUrl}/${id}`, options, 'custom');
  }
}

export default productRepository;