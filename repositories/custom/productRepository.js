import repository from '@/repositories/repository';

const resourceUrl = "https://fakestoreapi.com/products";

const productRepository = {
  findAll(options = {}) {
    return repository('GET', `${resourceUrl}`, options, 'custom');
  }
}

export default productRepository;