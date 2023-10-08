// File: ./services/ProductOptionValueService.ts
import { ProductOptionValue, TransactionBaseService } from '@medusajs/medusa';

class ProductOptionValueService extends TransactionBaseService {
  constructor(container) {
    super(container);
    this.manager = container.manager;
  }

  async changeMetadata(id, newMetadata) {
    const productOptionValueRepository = this.manager.getRepository(ProductOptionValue);
    try {
        const productOptionValue = await productOptionValueRepository.findOne({ where: { id: id } });

        if (!productOptionValue) {
          throw new Error("ProductOptionValue not found");
        }
    
        productOptionValue.metadata = newMetadata;
        await productOptionValueRepository.save(productOptionValue);
        return productOptionValue;
    } catch (error) {
        console.error(error);
    }
  }
}

export default ProductOptionValueService;