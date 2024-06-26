import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

type ModalProps = {
  id: string;
  title: string;
  children?: ReactNode;
};
export const Modal = (props: ModalProps) => {
  const { id, children, title } = props;
  return (
    <dialog
      id={id}
      className="modal modal-bottom shadow-lg sm:modal-middle z-[99]"
    >
      <div className="modal-box sm:max-w-[580px] lg:max-w-[620px]">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-4">{title}</h3>
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </dialog>
  );
};
