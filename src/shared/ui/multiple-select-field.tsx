import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {Col, Form, Row} from "react-bootstrap";
import Select from "react-select";
import {SelectOptionType} from "./select-option-type.ts";

type Props <TField extends FieldValues> = {
    name: Path<TField>,
    control: Control<TField>,
    items: SelectOptionType[],
    labelValue: string,
    required?: boolean,
}

export const MultipleSelectField = <
    TField extends FieldValues
> (
    {
        name,
        control,
        items,
        labelValue,
        required = true
    }: Props<TField>
) => {
    return(
        <Controller
            control={control}
            name={name}
            rules={{required: required && "Поле обязательное для заполнения"}}
            render={({field: { onChange,  value, ref }, fieldState: { error }}) => (
                <Form.Group as={Row} className="mb-3" controlId={name}>
                    <Form.Label>{labelValue}</Form.Label>
                    <Col>
                        <Select
                            isMulti
                            ref={ref}
                            name={name}
                            placeholder=""
                            closeMenuOnSelect={false}
                            options={items}
                            value={items.find((x) => x.value === value)}
                            onChange={(val) => onChange(val)}
                        />
                        <Form.Text className="text-danger">
                            {error?.message}
                        </Form.Text>
                    </Col>
                </Form.Group>
            )}
        />
    )
}