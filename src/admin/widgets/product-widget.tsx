import type { 
    WidgetConfig, 
    ProductDetailsWidgetProps,
  } from "@medusajs/admin"
  import { Button } from "@medusajs/ui"

  import OptionsProvider, { useOptionsContext } from "./../../components/organisms/options-provider"
  import { ProductOptionValue } from "@medusajs/medusa"
  import { useState } from "react"
  import EditOptionvalueModal from "../../components/organisms/edit-optionvalue-modal"
  
  const ProductWidget = ({
    product,
    notify,
  }: ProductDetailsWidgetProps) => {
    const [optionvalueToEdit, setOptionvalueToEdit] = useState<ProductOptionValue | undefined>(undefined)

    const handleEditOptionvalue = (optionvalue: ProductOptionValue) => {
      setOptionvalueToEdit(optionvalue)
      console.log(optionvalue);
    }

    return (
      <OptionsProvider product={product}>
        <div className="bg-white p-8 border border-gray-200 rounded-lg">
          <h1 className="text-grey-90 inter-xlarge-semibold">Option Values</h1>
          <ProductOptions handleEditOptionvalue={handleEditOptionvalue} />
          {optionvalueToEdit && (
            <EditOptionvalueModal
              onClose={() => setOptionvalueToEdit(undefined)}
              optionvalue={optionvalueToEdit}
              product={product}
              notify={notify}
            />
          )}
        </div>
      </OptionsProvider>
    )
  }

  const ProductOptions = ({handleEditOptionvalue}) => {
    const { options, status } = useOptionsContext()
  
    if (status === "error") {
      return null
    }
  
    if (status === "loading" || !options) {
      return (
        <div className="mt-base grid grid-cols-3 gap-x-8">
          {Array.from(Array(2)).map((_, i) => {
            return (
              <div key={i}>
                <div className="mb-xsmall bg-grey-30 h-6 w-9 animate-pulse"></div>
                <ul className="flex flex-wrap items-center gap-1">
                  {Array.from(Array(3)).map((_, j) => (
                    <li key={j}>
                      <div className="rounded-rounded bg-grey-10 text-grey-50 h-8 w-12 animate-pulse">
                        {j}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      )
    }
  
    return (
      <div className="mt-base flex flex-wrap items-center gap-8">
        {options.map((option) => {
          return (
            <div key={option.id}>
              <h3 className="inter-base-semibold mb-xsmall">{option.title}</h3>
              <ul className="flex flex-wrap items-center gap-1">
              {option.values
                  ?.filter((v, index, self) => 
                      self.findIndex(val => val.value === v.value) === index
                  )
                  .map((uniqueVal) => (
                      <li key={uniqueVal.id}>
                          <Button variant="transparent" onClick={() => handleEditOptionvalue(uniqueVal)} className="border-grey-20 border">
                              {uniqueVal.value}
                          </Button>
                      </li>
                  ))
              }
              </ul>
            </div>
          )
        })}
      </div>
    )
  }
  
  export const config: WidgetConfig = {
    zone: "product.details.after",
  }
  
  export default ProductWidget