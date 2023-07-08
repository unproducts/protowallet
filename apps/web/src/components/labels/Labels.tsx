import React, { useEffect, useState } from 'react';
import LabelCard from './LabelCard';
import { Label } from '@protowallet/types';
import { CreateLabelOptions, LabelRepository, UpdateLabelOptions } from '@protowallet/core/dist/repositories';
import { EntitiesEnum } from '@protowallet/core';
import SinglePageHeader from '../shared/SinglePageHeader';
import { NewLabelButton } from './NewUpdateLabelAction';
import { useProto } from '../../hooks/use-proto';

const Labels = () => {
  const proto = useProto();
  const labelRepository = proto.getRepository(EntitiesEnum.Label) as LabelRepository;

  const [labels, setLabels] = useState<Label[]>([]);

  useEffect(() => {
    labelRepository.getAll().then(setLabels);
  }, []);

  const createLabel = (options: CreateLabelOptions) => {
    labelRepository.create(options).then((l) => setLabels([...labels, l]));
  };
  const deleteLabel = (label: Label) => {
    labelRepository.delete(label.id).then(() => setLabels(labels.filter((l) => l.id !== label.id)));
  };
  const updateLabel = (options: UpdateLabelOptions) => {
    labelRepository.update(options).then((upL) => setLabels(labels.map((l) => (l.id === upL.id ? upL : l))));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
      {/* Left: Title */}
      <SinglePageHeader
        title="Labels"
        cta={<NewLabelButton createLabelFn={createLabel} />}
      />
      {/* Label cards */}
      <div className="grid grid-cols-12 gap-2">
        {labels.map((label) => (
          <div className="col-span-3 p-1" key={label.id}>
            <LabelCard label={label} updateLabelFn={updateLabel} deleteLabelFn={deleteLabel} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Labels;
