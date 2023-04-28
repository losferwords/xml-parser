import { FC } from 'react';
import { Entity } from '../../types/entity';
import { Form, FormInstance } from 'antd';
import Input from 'antd/es/input/Input';
import './EntityForm.css';

interface Props {
  form: FormInstance;
  entity: Entity;
}

const EntityForm: FC<Props> = ({ entity, form }) => {
  return (
    <Form
      className="entity-form"
      layout="vertical"
      form={form}
      size="small"
    >
      {entity.attributes.map((attr) => {
        return (
          <Form.Item
            name={attr.name}
            label={attr.name}
            key={attr.name}
            rules={[
              {
                required: attr.required,
                whitespace: true,
                message: `${attr.name} is required`,
              },
            ]}
          >
            <Input placeholder={attr.description} allowClear />
          </Form.Item>
        );
      })}
    </Form>
  );
};

export default EntityForm;
