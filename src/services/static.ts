import { Const } from '../config/const';
import { Attribute } from '../types/attribute';
import { Entity } from '../types/entity';

export const getSchemas = async () => {
  const res = await fetch(Const.schemaPath);
  const xmlString = await res.text();
  let parsedXml;

  try {
    parsedXml = new DOMParser().parseFromString(
      xmlString,
      'application/xml'
    ) as XMLDocument;
  } catch (err) {
    throw err;
  }

  const entities: Entity[] = [];
  for (const entityName of Const.visibleEntities) {
    const node = parsedXml.querySelector(`java-type[name="${entityName}"]`);
    if (!node) {
      continue;
    }

    const name = node.getAttribute('name');
    if (!name) {
      continue;
    }

    const attributes: Attribute[] = [];
    node
      .querySelectorAll('java-attributes xml-element[type="java.lang.String"]')
      .forEach((attributeNode) => {
        attributes.push({
          name: attributeNode.getAttribute('name') || '',
          required: Boolean(attributeNode.getAttribute('required')),
          description:
            attributeNode
              .querySelector('xml-properties xml-property[name="description"]')
              ?.getAttribute('value') || undefined,
        });
      });

    entities.push({
      name: name,
      description:
        node
          .querySelector('xml-properties xml-property[name="description"]')
          ?.getAttribute('value') ?? null,
      templateUri:
        node
          .querySelector('xml-properties xml-property[name="uriTemplate"]')
          ?.getAttribute('value') ?? null,
      attributes,
    });
  }
  return entities;
};
