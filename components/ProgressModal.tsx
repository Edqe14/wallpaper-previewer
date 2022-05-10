import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import { useEffect } from 'react';
import { Dispatcher } from '@/lib/types';

Modal.setAppElement('#__next');

interface Props {
  isOpen: boolean;
  setOpen: Dispatcher<boolean>;
  progress: number;
  size: number;
  retry: () => void;
}

const ProgressModal = ({ isOpen, setOpen, progress, size, retry }: Props) => {
  const progressPercent = Math.floor(progress / size * 100);

  useEffect(() => {
    if (progressPercent === 100) setOpen(false);
  }, [progressPercent]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
      contentLabel="Download Progress"
      className="absolute overflow-hidden bg-gray-100 dark:bg-gray-900 w-5/6 md:w-2/4 lg:w-2/5 h-2/6 rounded-md drop-shadow-lg outline-none"
      overlayClassName="p-8 z-10 fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-gray-200 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75"
    >
      <section className="relative w-full h-full">
        <section className="p-8">
          <section className="flex justify-between items-center mb-8">
            <h2 className="font-semibold text-xl">Processing...</h2>

            <IoClose className="cursor-pointer text-2xl" onClick={() => setOpen(false)} />
          </section>

          <p className="text-justify text-gray-100">Download is starting, please wait until it finished processing. <span onClick={retry} className="text-yellow-300 cursor-pointer border-b transition-all duration-300 ease-in-out border-transparent hover:border-yellow-300">Click here</span> to try again.</p>
        </section>

        <span className="absolute bottom-0 left-0 block h-[4px] bg-blue-500" style={{ width: `${progressPercent}%` }}></span>
      </section>
    </Modal>
  );
};

export default ProgressModal;