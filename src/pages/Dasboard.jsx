import { useState, useEffect } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from '../services/api';
import { useNavigate } from 'react-router-dom';
import NoteModal from '../components/NoteModal';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [modalData, setModalData] = useState(null); 
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const rotationClasses = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', 'rotate-0'];
  const getRotationClass = (index) => rotationClasses[index % rotationClasses.length];

  const fetchNotes = async () => {
    try {
      const data = await getNotes(token);
      setNotes(data);
    } catch (err) {
      setError('Error al obtener las notas', err);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchNotes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModalSubmit = async (formData) => {
    if (modalData.mode === 'create') {
      try {
        const newNote = await createNote(token, formData);
        setNotes([...notes, newNote]);
      } catch (err) {
        setError('Error al agregar la nota', err);
      }
    } else if (modalData.mode === 'edit') {
      try {
        const updated = await updateNote(token, modalData.note.notes_id, formData);
        setNotes(
          notes.map((note) =>
            note.notes_id === modalData.note.notes_id ? updated : note
          )
        );
      } catch (err) {
        setError('Error al editar la nota', err);
      }
    }
    setModalData(null);
  };

  const handleDeleteNote = async (notes_id) => {
    if (!window.confirm('¿Estás seguro de borrar esta nota?')) return;
    try {
      await deleteNote(token, notes_id);
      setNotes(notes.filter((note) => note.notes_id !== notes_id));
    } catch (err) {
      setError('Error al eliminar la nota', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 relative">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-black">Mis Notas</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {notes.length === 0 ? (
            <p className="col-span-full text-center text-black">No hay notas disponibles.</p>
          ) : (
            notes.map((note, index) => (
              <div
                key={note.notes_id}
                className={`bg-yellow-200 p-4 rounded shadow-lg ${getRotationClass(index)}`}
              >
                <h3 className="font-bold mb-2 text-black">{note.title}</h3>
                <p className="whitespace-pre-wrap text-black">{note.content}</p>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() =>
                      setModalData({ mode: 'edit', note })
                    }
                    className="bg-blue-500 text-white text-xs p-1 rounded hover:bg-blue-600"
                    title="Editar"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note.notes_id)}
                    className="bg-red-500 text-white text-xs p-1 rounded hover:bg-red-600"
                    title="Borrar"
                  >
                    Borrar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <button
        onClick={() =>
          setModalData({ mode: 'create', note: { title: '', content: '' } })
        }
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
        title="Agregar Nota"
      >
        +
      </button>

      {modalData && (
        <NoteModal
          initialValues={modalData.note}
          titleText={modalData.mode === 'create' ? 'Crear Nueva Nota' : 'Editar Nota'}
          onSubmit={handleModalSubmit}
          onCancel={() => setModalData(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;
