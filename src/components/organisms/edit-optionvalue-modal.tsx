import { ProductOptionValue } from "@medusajs/medusa"
import { Button } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import React, {useEffect, useState, useRef} from 'react'

import type { ProductDetailsWidgetProps } from "@medusajs/admin"

import { useOptionsContext } from "./options-provider"

import Dropdown from "./dropdown"

type Props = {
  onClose: () => void,
  optionvalue: ProductOptionValue,
} & ProductDetailsWidgetProps

const EditOptionvalueModal = ({
  onClose,
  optionvalue,
  product,
  notify,
}: Props) => {
  const { t } = useTranslation()
  const [metadata, setMetadata] = useState(null);
  const { refetch, options } = useOptionsContext();
  const [focusedInput, setFocusedInput] = useState(null);
  const keyInputRef = useRef(null);
  const valueInputRef = useRef(null);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null)

  const handleInputChange = (e, index, field) => {
    const newMetadata = [...metadata];

    if (field === 'key') {
        newMetadata[index].key = e.target.value;
    } else {
        newMetadata[index].value = e.target.value;
    }
    setMetadata(newMetadata);
  };

  const handleInitialInputChange = (e) => {
    if (focusedInput === 'keyInput') {
        setMetadata([{ key: e.target.value, value: '' }]);
    } else if (focusedInput === 'valueInput') {
        setMetadata([{ key: '', value: e.target.value }]);
    }
  };

  const submitChange = async (e) => {
    e.preventDefault();
    let hasEmptyKeyOrValue = false;
    let optionvaluesId = []

    if (metadata !== null) {
        const isEmpty = str => typeof str === 'string' && str.trim() === "";
        hasEmptyKeyOrValue = metadata.some(
            ({ key, value }) => isEmpty(key) || isEmpty(value)
        );
    }
    if (hasEmptyKeyOrValue) {
        return notify.warn("Warning", "A key or value is empty. Please delete the empty entry or populate it.");
    }

    options.map((option) => {
        return (
            option.values?.map((val, index) => {
                if(val.value === optionvalue.value){
                    optionvaluesId.push(val.id)
                }
            })
        );
    })

    for (let i = 0; i < optionvaluesId.length; i++) {
        try {
            const response = await fetch(`http://localhost:9000/product-option-values/${optionvaluesId[i]}/metadata`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    metadata: metadata !== null ? 
                        metadata.reduce((acc, { key, value }) => { acc[key] = value; return acc }, {}) 
                        : null
                }),
            });
    
            if (!response.ok) {
                throw new Error("Received an error response from the server.");
            }
    
            const data = await response.json();
            notify.success("success", `Metadata has been updated!`)
            refetch()
        } catch (error) {
            notify.error("Error", "Something went wrong\b" + error)
            console.log(error);
        }
    }
  };

  useEffect(() => {
    if (optionvalue.metadata !== null) {
        setMetadata(Object.entries(optionvalue.metadata).map(([key, value]) => ({ key, value })));
    } else {
        setMetadata(null)
    }
  }, [optionvalue])

  useEffect(() => {
    if (metadata !== null) {
        if (focusedInput === 'keyInput' && keyInputRef.current) {
            keyInputRef.current.focus();
            setFocusedInput(null)
        } else if (focusedInput === 'valueInput' && valueInputRef.current) {
            valueInputRef.current.focus();
            setFocusedInput(null)
        }
    }
}, [metadata, focusedInput]);

  return (
    <div className="pt-5">
        <form onSubmit={submitChange}>
            <div className="rounded-rounded border-grey-20 divide-grey-20 inter-base-regular divide-y border relative z-10">
                <div className="inter-small-semibold bg-grey-5 rounded-t-rounded divide-grey-20 grid grid-cols-[165px_1fr] divide-x divide-solid [&amp;>div]:px-base [&amp;>div]:py-xsmall">
                    <div>
                        <p>Key</p>
                    </div>
                    <div>
                        <p>Value</p>
                    </div>
                </div>
                {metadata !== null ? metadata.map(({ key, value }, index) => (
                    <div key={index} className="divide-grey-20 grid grid-cols-[165px_1fr_auto] [&amp;>div]:px-base [&amp;>div]:py-xsmall divide-x divide-solid last-of-type:rounded-b-rounded group">
                        <div>
                            <input ref={keyInputRef} name={`metadata.${index}.key`} placeholder="Key" value={metadata[index].key} onChange={(e) => handleInputChange(e, index, 'key')} className="placeholder:text-grey-40 placeholder:inter-base-regular w-full appearance-none outline-none" />
                        </div>
                        <div>
                            <input ref={valueInputRef} name={`metadata.${index}.value`} placeholder="Value" value={metadata[index].value} onChange={(e) => handleInputChange(e, index, 'value')} className="placeholder:text-grey-40 placeholder:inter-base-regular w-full appearance-none outline-none" />
                        </div>
                        <div className={`flex justify-end items-center group-hover:visible ${openDropdownIndex === index ? 'visible' : 'invisible'}`}>
                            <Dropdown metadata={metadata} setMetadata={setMetadata} index={index} notify={notify} setOpenDropdownIndex={setOpenDropdownIndex} />
                        </div>
                    </div>
                )) : (
                    <div className="divide-grey-20 grid grid-cols-[165px_1fr_auto] [&amp;>div]:px-base [&amp;>div]:py-xsmall divide-x divide-solid last-of-type:rounded-b-rounded group">
                        <div>
                            <input name="metadata.0.key" placeholder="Key" onChange={(e) => handleInitialInputChange(e)} onFocus={() => setFocusedInput('keyInput')} className="placeholder:text-grey-40 placeholder:inter-base-regular w-full appearance-none outline-none" />
                        </div>
                        <div>
                            <input name="metadata.0.value" placeholder="Value" onChange={(e) => handleInitialInputChange(e)} onFocus={() => setFocusedInput('valueInput')} className="placeholder:text-grey-40 placeholder:inter-base-regular w-full appearance-none outline-none" />
                        </div>
                        <div className={`flex justify-end items-center group-hover:visible ${openDropdownIndex === 0 ? 'visible' : 'invisible'}`}>
                            <Dropdown metadata={metadata} setMetadata={setMetadata} index={0} notify={notify} setOpenDropdownIndex={setOpenDropdownIndex} />
                        </div>
                    </div>
                )}
            </div>
            <div className="flex justify-end gap-x-3 mt-base">
                <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                <Button type="submit">Save changes</Button>
            </div>
        </form>
    </div>
  )
}

export default EditOptionvalueModal