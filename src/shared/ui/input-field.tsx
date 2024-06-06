import {Col, Form, Row} from "react-bootstrap";
import {Control, Controller, FieldValues, Path} from "react-hook-form";

type Props <TField extends FieldValues> = {
    name: Path<TField>,
    control: Control<TField>,
    labelValue: string,
    labelMaxWidth?: string | number,
    controlWidth? : string | number,
    required?: boolean,
    type?: string,
}

export const InputField = <
    TField extends FieldValues
> (
    {
        name,
        control,
        labelValue,
        labelMaxWidth = '100%',
        controlWidth = '100%',
        required = true,
        type = "input"
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
                        <Form.Control onChange={onChange} value={value} ref={ref} type={type} min={0} style={{width: controlWidth}}/>
                        <Form.Text className="text-danger">
                            {error?.message}
                        </Form.Text>
                    </Col>
                </Form.Group>
            )}
        />
    )
}