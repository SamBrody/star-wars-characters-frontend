import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {Col, Form, Row} from "react-bootstrap";

type Props <TField extends FieldValues> = {
    name: Path<TField>,
    control: Control<TField>,
    labelValue: string,
    rows?: number
    required?: boolean,
}

export const TextAreaField = <
    TField extends FieldValues
> (
    {
        name,
        control,
        labelValue,
        rows = 5,
        required = true,
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
                        <Form.Control onChange={onChange} value={value} ref={ref} as="textarea" rows={rows}/>
                        <Form.Text className="text-danger">
                            {error?.message}
                        </Form.Text>
                    </Col>
                </Form.Group>
            )}
        />
    )
}