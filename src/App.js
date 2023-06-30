import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NewBoardForm from './components/NewBoardForm';
import BoardList from './components/BoardList';
import CardList from './components/CardList';

function App() {

  const API = "https://inspiration-board-pal-backend.onrender.com/boards"

  const [boards, setBoards] = useState([])
  const [selectedBoard, setSelectedBoard] = useState({
    board:{
      title:'',
      owner:'',
      id: null
    }
  });

  // const [selectedCards, setSelectedCards] = useState([])

  const selectBoard = (id) => {
    axios.get(`${API}/${id}`)
    .then((result)=>{
      console.log(result.data)
      setSelectedBoard(result.data);

    })
    .catch((error)=>{
      console.log(error)
    });
  };

  // const selectCards = (id) => {
  //   axios.get(`${API}/${id}/cards`)
  //   .then((result)=>{
  //     console.log(result.data)
  //     setSelectedCards(result.data.cards);

  //   })
  //   .catch((error)=>{
  //     console.log(error)
  //   });
  // };


  const getAllBoards = () => {
    axios
    .get(API)
    .then((result) => {
      setBoards(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    getAllBoards();
  }, []);

  const postBoard = (newBoardData) => {
    axios
    .post(API, newBoardData)
    .then((result) => {
      console.log(result.data);
      getAllBoards();
    })
    .catch((error) => {
      console.log(error);
    });
  };



  return (
    <div className="App">
      <h1>Inspiration Board</h1>
      <section>
        <BoardList data={boards} selectBoard={selectBoard} />
      </section>

      <section>
        <h2>Selected Boards</h2>
        <p>{selectedBoard.board.id ? `${selectedBoard.board.title} - ${selectedBoard.board.owner}` : 'Select a Board from the Board List!'}</p>
        {/* <p>{selectedBoard.board.title}-{selectedBoard.board.owner}</p> */}
      </section>
      <section>
        <h2>Create A New Board</h2>
        <NewBoardForm addBoard={postBoard} />
      </section>{selectedBoard.board.id ? <CardList board={selectedBoard.board}></CardList> : '' }
      {/* <p>{selectedBoard.board.id ? `${selectedCards}` : 'No cards in this board'}</p> */}

      {/* {selectedBoard.board_id ? <CardList board={selectedBoard} /> : '' }  */}
    </div>
  );
}

export default App;
