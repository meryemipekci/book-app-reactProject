import { useState } from "react";
import { v4 as getPass } from "uuid";
import BookCard from "./components/BookCard";
import DeleteModal from "./components/DeleteModal";
import EditModal from "./components/EditModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [books, setBooks] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  //formun gonderilme olayi
  const handleSubmit = (e) => {
    e.preventDefault();

    //kitap ismine erisme
    const title = e.target[0].value;

    //kitap ismini dogrulama
    if (!title) {
      toast.warn("Please write a book title", { autoClose: 1000 });
      return;
    }
    //kitap objesi olusturma
    const newBook = {
      id: getPass(),
      title,
      date: new Date(),
      isRead: false,
    };
    //olusturulan objeyi kitaplar dizisine aktarma
    setBooks([newBook, ...books]);

    //inputu temizle
    e.target[0].value = "";

    //bildirim verme
    toast.success("Book title succesfully added", { autoClose: 1000 });
  };

  //silme modal i ici fonk.
  const handleModal = (id) => {
    //silinecek olan el. id sini state e aktarma
    setDeleteId(id);

    //modal i acar
    setShowDelete(true);
  };
  //silme isleminş yapar
  const handleDelete = () => {
    //id sini bildigimiz elemani diziden cikarma
    const filtred = books.filter((book) => book.id !== deleteId);

    //state i gunceller
    setBooks(filtred);

    //modal i kapat
    setShowDelete(false);

    //bildiriim verme
    toast.error("Book title succesfully delete", { autoClose: 1000 });
  };

  //okundu isleminde calisir
  const handleRead = (editItem) => {
    //!diziden bir elemani guncelleme
    //okundu degerini tersine cevirme

    const updated = { ...editItem, isRead: !editItem.isRead };

    //state in kopyasını alma

    const clone = [...books];

    //duzenlenecek elemanın sirasini bulma
    const index = books.findIndex((book) => book.id === updated.id);

    //clone diziyi guncelleme
    clone[index] = updated;

    //! 2.yontem
    const newBooks = books.map((item) =>
      item.id !== updated.id ? item : updated
    );

    //state i gunceller
    setBooks(newBooks);
  };

  const handleEditModal = (item) => {
    //modali acar
    setShowEdit(true);
    //duzenlenecek elemani state e aktarma
    setEditingItem(item);
  };

  //el. duzenleme

  const updateItem = () => {
    //kitaplar dizisini don el.:
    //duzenlenecel el degilse onu oldugu gibi yeni diziye aktar
    //duzenlenecek olansa guncel halini diziye aktar

    const newBooks = books.map((book) =>
      book.id !== editingItem.id ? book : editingItem
    );

    // statei guncelleme
    setBooks(newBooks);

    // modalı kapatir
    setShowEdit(false);

    //bildirim verme
    toast.info("Book name is arranged", { autoClose: 1000 });
  };
  return (
    <div className="App">
      <header className="bg-dark text-light py-2 fs-5 text-center">
        <h1>Book Shelf</h1>
      </header>
      {/*form*/}
      <main className="container">
        <form onSubmit={handleSubmit} className="d-flex gap-3 mt-4 p-4">
          <input
            type="text"
            className="form-control shadow"
            placeholder="Write a book name..."
          />
          <button className="btn btn-warning shadow">Add</button>
        </form>

        {/** Kitaplar listesi bossa */}
        {books.lenght === 0 && (
          <h4 className="mt-5 text-center">
            Book Title has not yet been <written styleName=""></written>
          </h4>
        )}

        {/*kitaplar Listesi doluysa*/}

        {books.map((book) => (
          <BookCard
            key={book.id}
            data={book}
            handleModal={handleModal}
            handleRead={handleRead}
            handleEditModal={handleEditModal}
          />
        ))}
      </main>

      {/*MOdallar */}
      {showDelete && (
        <DeleteModal
          setShowDelete={setShowDelete}
          handleDelete={handleDelete}
        />
      )}

      {showEdit && (
        <EditModal
          editingItem={editingItem}
          setShowEdit={setShowEdit}
          setEditingItem={setEditingItem}
          updateItem={updateItem}
        />
      )}
      {/* bildirimler icin */}
      <ToastContainer />
    </div>
  );
}

export default App;
