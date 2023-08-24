//propun obje olarak geldigini ve içinde data
//oldugunu bildigimizden propu dagitip direkt dataya erisiyoruz

const BookCard = ({ data, handleModal, handleRead, handleEditModal }) => {
  return (
    <div className="fw-bolder d-flex justify-content-between align-items-center border shadow p-3">
      <div>
        <h5 //isRead degeri true ise uzerini ciz
          className={data.isRead ? "text-decoration-line-through" : ""}
        >
          {data.title}
        </h5>
        <p>{new Date(data.date).toLocaleString()}</p>
      </div>

      <div className="btn-group">
        <button onClick={() => handleModal(data.id)} className="btn btn-danger">
          Delete
        </button>
        <button
          onClick={() => handleEditModal(data)}
          className="btn btn-primary"
        >
          Edit
        </button>
        <button onClick={() => handleRead(data)} className="btn btn-success">
          {data.isRead ? "Read" : "Unread"}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
