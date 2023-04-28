import { FC, useState } from 'react';
import { Entity } from '../../types/entity';
import { Form, Modal } from 'antd';
import EntityForm from '../EntityForm/EntityForm';
import { FormFields } from '../../types/formFields';

interface Props {
  entity: Entity;
  onConfirm: (formFields: FormFields) => void;
  onCancel: () => void;
}

const EntityModal: FC<Props> = ({ entity, onConfirm, onCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    setConfirmLoading(true);

    try {
      await form.validateFields();
      onConfirm(form.getFieldsValue());
    } catch (e) {
      throw new Error(`Form is not invalid`, { cause: e });
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title={`Create new ${entity.name}`}
      open={Boolean(entity)}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
    >
      <EntityForm entity={entity} form={form}></EntityForm>
    </Modal>
  );
};

export default EntityModal;
