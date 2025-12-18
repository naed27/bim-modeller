import { useLayoutEffect, useState } from "react";
import { Row } from "@/components/field-layouts/row";
import FormButtonSet from "@/components/form-button-set";
import useBimViewerLogic from "../../hooks/use-bim-viewer-logic";
import { TextField } from "@/components/input-fields/text-field";
import ModalFormLayout from "@/components/page-layouts/modal-form-layout";

export default function Details({
    value,
    onSubmit,
    onCancel,
    canvasController,
}:{
    value?: string,
    onSubmit?: (...args: any) => any
    onCancel?: (...args: any) => any
} & ReturnType<typeof useBimViewerLogic>) {

    const [payload, setPayload] = useState('')

    useLayoutEffect(()=>{setPayload(value ?? '')},[value])

    useLayoutEffect(()=>{
       canvasController?.disable?.()
       return ()=>{
        canvasController?.enable?.()
       } 
    },[])

    const handleConfirm = () => onSubmit?.(payload)

    return (
        <ModalFormLayout
        formButtonSet={
            <FormButtonSet
            onCancel={onCancel}
            onConfirm={handleConfirm}/>
        }>
            <Row>
                <TextField 
                value={payload}
                placeholder="Enter Description"
                onChange={(e)=>setPayload(e?.target?.value)}
                />
            </Row>
        </ModalFormLayout>
    )
}