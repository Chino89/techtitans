import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';

export const modalTarget = (id: string): ModalInterface => {
  const $modalElement: HTMLElement = document.querySelector(`#${id}`)!;

  const modalOptions: ModalOptions = {
    placement: 'center',
    backdrop: 'static',
    backdropClasses:
      'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: false,
    onHide: () => {
      const backdropElement = document.querySelector('div[modal-backdrop]');
      if (backdropElement) {
        backdropElement.remove();
      }
    },
    onShow: () => {
    },
    onToggle: () => {
    },
  };

  const modal: ModalInterface = new Modal($modalElement, modalOptions);

  return modal;
};
