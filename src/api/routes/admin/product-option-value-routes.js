// File: ./routes/admin/product-option-value-routes.js
import { MedusaError } from "@medusajs/utils"

export default {
  register(router) {
    router.put("/product-option-values/:id/metadata", async (req, res) => {
      console.log('Endpoint hit', req.body);
      const { id } = req.params;
      const { metadata } = req.body;

      const productOptionValueService = req.scope.resolve("productOptionValueService");
      try {
        const updatedProductOptionValue = await productOptionValueService.changeMetadata(id, metadata);
        return res.status(200).json(updatedProductOptionValue);
      } catch (error) {
        throw new MedusaError(MedusaError.Types.INTERNAL_ERROR, error.message)
      }
    });
  }
};