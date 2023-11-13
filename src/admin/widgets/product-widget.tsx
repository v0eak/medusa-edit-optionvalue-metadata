import type { 
    WidgetConfig, 
    ProductDetailsWidgetProps,
  } from "@medusajs/admin"
  import { Container, Heading, Button } from "@medusajs/ui"

  import OptionsProvider, { useOptionsContext } from "../components/organisms/options-provider"
  import { ProductOptionValue } from "@medusajs/medusa"
  import { useState } from "react"
  import EditOptionvalueModal from "../components/organisms/edit-optionvalue-modal"
  
  const ProductWidget = ({
    product,
    notify,
  }: ProductDetailsWidgetProps) => {
    const [optionvalueToEdit, setOptionvalueToEdit] = useState<ProductOptionValue | undefined>(undefined)

    const handleEditOptionvalue = (optionvalue: ProductOptionValue) => {
      setOptionvalueToEdit(optionvalue)
    }

    return (
      <OptionsProvider product={product}>
        <Container>
            <Heading level="h1" className="font-semibold pb-2">
                <span>Option Values</span>
            </Heading>
            <ProductOptions handleEditOptionvalue={handleEditOptionvalue} />
            {optionvalueToEdit && (
              <EditOptionvalueModal
                onClose={() => setOptionvalueToEdit(undefined)}
                optionvalue={optionvalueToEdit}
                product={product}
                notify={notify}
              />
            )}
        </Container>
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
                          <Button variant="transparent" onClick={() => handleEditOptionvalue(uniqueVal)} className="border-grey-20 border px-2.5 py-1">
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