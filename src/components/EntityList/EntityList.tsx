import { FC, useEffect, useState } from 'react';
import { Entity } from '../../types/entity';
import { Button, List } from 'antd';
import EntityModal from '../EntityModal/EntityModal';
import { FormFields } from '../../types/formFields';
import api from '../../services/api';
import { getSchemas } from '../../services/static';

const EntityList: FC = () => {
  const [activeEntity, setActiveEntity] = useState<Entity | null>(null);
  const [entities, setEntities] = useState<Entity[]>([]);

  useEffect(() => {
    const getSchemasRequest = async () => {
      setEntities(await getSchemas());
    };
    getSchemasRequest();
  }, []);

  const generateTemplateUri = (formFields: FormFields): string => {
    let uri = activeEntity?.templateUri || '';
    for (const key in formFields) {
      uri = uri.replaceAll(`{${key}}`, formFields[key]);
    }
    return uri;
  };

  const onModalConfirm = async (formFields: FormFields) => {
    const newEntityRequest = async () => {
      try {
        await api.put(generateTemplateUri(formFields), formFields);
      } catch (err) {
        console.error(err);
      } finally {
        setActiveEntity(null);
      }
    };

    newEntityRequest();
  };

  const onModalCancel = () => {
    setActiveEntity(null);
  };

  return (
    <>
      {activeEntity && (
        <EntityModal
          entity={activeEntity}
          onConfirm={onModalConfirm}
          onCancel={onModalCancel}
        />
      )}
      <List
        itemLayout="horizontal"
        dataSource={entities}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="primary" onClick={() => setActiveEntity(item)}>
                Add
              </Button>,
            ]}
          >
            <List.Item.Meta title={item.name} description={item.description} />
          </List.Item>
        )}
      />
    </>
  );
};

export default EntityList;
