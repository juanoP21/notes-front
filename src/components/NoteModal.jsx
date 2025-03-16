
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

function NoteModal({ initialValues, titleText, onSubmit, onCancel }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-yellow-50 p-6 rounded shadow-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4 text-black">{titleText}</h3>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-4">
            <label className="block text-black">Título</label>
            <input
              type="text"
              {...register('title', { required: true })}
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="Título de la nota"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Contenido</label>
            <textarea
              {...register('content', { required: true })}
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="Contenido de la nota"
              rows="3"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteModal;
