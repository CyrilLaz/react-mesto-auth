import React from 'react';
import PopupWithForm from './PopupWithForm';

export function ConfirmDeletionPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();

    props.onConfirmDeletion({
      ...props,
    });
    e.target.reset();
  }

  return (
    <PopupWithForm
      name="confirmDelete"
      title="Вы уверены?"
      isOpen={props.isOpen}
      {...props}
      onSubmit={handleSubmit}
    />
  );
}
