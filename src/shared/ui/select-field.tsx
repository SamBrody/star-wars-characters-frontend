import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {Col, Form, Row} from "react-bootstrap";
import Select from "react-select";
import {SelectOptionType} from "./select-option-type.ts";

type Props <TField extends FieldValues> = {
    name: Path<TField>,
    control: Control<TField>,
    items: SelectOptionType[],
    labelMaxWidth?: string | number,
    labelValue: string,
    required?: boolean,
}

export const SelectField = <
    TField extends FieldValues
> (
    {
        name,
        control,
        items,
        labelValue,
        labelMaxWidth = '100%',
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
                    <Form.Label column style={{maxWidth: labelMaxWidth}}>{labelValue}</Form.Label>
                    <Col>
                        <Select
                            ref={ref}
                            name={name}
                            isClearable
                            placeholder=""
                            closeMenuOnSelect
                            value={value as SelectOptionType}
                            onChange={(val) => onChange(val)}
                            options={items}
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